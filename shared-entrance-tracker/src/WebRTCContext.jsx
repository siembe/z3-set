import {createContext, useState, useContext, useEffect, useRef} from 'react';

const WebRTCContext = createContext(null);

export const WebRTCProvider = ({children}) => {
  const onDataReceived = useRef([]);
  const onDataChannelSetup = useRef([]);
  const hosting = useRef(false);
  const peerConnections = useRef({});
  const dataChannels = useRef([]);
  const webSocket = useRef(null);
  const id = useRef('');

  useEffect(() => {
    setupWebSocket();
  }, []);


  function setupWebSocket() {
    if (webSocket.current &&
        webSocket.current.readyState !== WebSocket.CLOSED &&
        webSocket.current.readyState !== WebSocket.CLOSING) {
      return;
    }

    const ws = new WebSocket("ws://localhost:8080/");
    webSocket.current = ws;
    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onmessage = (event) => onSignal(JSON.parse(event.data));
    ws.onerror = (error) => console.error("❌ WebSocket error:", error);
    ws.onclose = () => {
      console.log("❌ WebSocket closed. Attempting to reconnect");
      setTimeout(setupWebSocket, 3000);
    };
  }

  function sendSignal(signal) {
    console.log("📩 Sending signal: ", signal);
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.send(JSON.stringify(signal));
    } else {
      console.warn("⚠️ WebSocket not open. Signal not sent.");
    }
  }

  async function onSignal(signal) {
    console.log("📤 Received signal:", signal);
    switch (signal.type) {
      case "join":
        await handleJoin(signal);
        break;
      case "offer":
        await handleOffer(signal);
        break;
      case "answer":
        await handleAnswer(signal);
        break;
      case "icecandidate":
        await handleIceCandidate(signal);
        break;
    }
  }

  async function createOffer(peerId, code) {
    const peer = createPeerConnection(peerId, code);
    const dataChannel = peer.createDataChannel("sync");
    setupDataChannel(dataChannel);
    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      console.log("🚀 Creating Offer:", offer);
      peerConnections.current[peerId] = peer;
      sendSignal({code, sender: id.current, peerId, type: "offer", offer});
    } catch (error) {
      console.error("❌ Error creating WebRTC offer:", error);
    }
  }

  async function createAnswer({sender, code, offer}) {
    const remotePeer = createPeerConnection(sender, code);

    try {
      await remotePeer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await remotePeer.createAnswer();
      await remotePeer.setLocalDescription(answer);
      console.log("🚀 Received offer... Creating Answer:", answer);
      peerConnections.current[sender] = remotePeer;
      sendSignal({code, sender: id.current, peerId: sender, type: "answer", answer});
    } catch (error) {
      console.error("❌ Error creating WebRTC answer:", error);
    }
  }

  async function handleJoin({peers = [], code}) {
    if (!Array.isArray(peers) || peers.length === 0) {
      console.warn("⚠️ No peers available to connect.");
      return;
    }

    console.log("🚀 Received join... Sending offers to peers:", peers);

    for (const peer of peers) {
      await createOffer(peer, code);
    }
  }

  async function handleOffer(signal) {
    await createAnswer(signal);
  }

  async function handleAnswer({sender, answer}) {
    const remotePeer = peerConnections.current[sender];
    if (remotePeer.signalingState === "stable") {
      console.warn(`⚠️ Skipping setRemoteDescription for ${sender} as connection is already stable.`);
      return;
    }
    await remotePeer.setRemoteDescription(new RTCSessionDescription(answer));
    console.log("🚀 Received answer... Sending ICE Candidates");
  }

  async function handleIceCandidate({sender, candidate}) {
    try {
      await peerConnections.current[sender].addIceCandidate(candidate);
      console.log("🚀 ICE candidate added:", candidate);
    } catch (error) {
      console.error("❌ Error adding ICE candidate:", error);
    }
  }

  async function handleMessage({data}) {
    console.log("📩 Received message:", data);
    data = JSON.parse(data);
    onDataReceived.current.forEach((callback) => callback(data));
  }

  function createPeerConnection(peerId, code) {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {urls: "stun:stun.l.google.com:19302",},
      ]
    });
    peerConnection.ondatachannel = (event) => {
      console.log("✅ Received remote data channel");
      setupDataChannel(event.channel);
    }
    peerConnection.onicecandidateerror = e => console.log("❌ ICE Candidate error: ", e);
    peerConnection.onnegotiationneeded = e => console.log("⚠️ Negotiation Needed: ", e);
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("📡 Gathered ICE Candidate. Sending to peer: ", event.candidate);
        sendSignal({code, sender: id.current, peerId, type: "icecandidate", candidate: event.candidate});
      } else {
        console.log("✅ ICE Candidate gathering finished");
      }
    };
    peerConnection.onconnectionstatechange = () => {
      if (peerConnection.connectionState === 'closed') {
        removePeer(peerId);
      }
    }

    return peerConnection;
  }

  function setupDataChannel(dataChannel) {
    console.log("✅ Setting up data channel");
    dataChannel.onopen = () => {
      console.log(`✅ WebRTC Data Channel Opened: Hosting ${hosting}`);
      if (hosting.current) {
        onDataChannelSetup.current.forEach((data) => {
          dataChannel.send(JSON.stringify(data()))
        })
      }
    };
    dataChannel.onerror = (e) => console.error("❌ WebRTC Error:", e);
    dataChannel.onclose = () => {
      dataChannels.current = dataChannels.current.filter(channel => channel !== dataChannel);
      console.log("❌ WebRTC Data Channel Closed");
    };

    dataChannel.onmessage = (event) => handleMessage(event);
    dataChannels.current.push(dataChannel);
  }

  function generateCode(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
      .map((num) => chars[num % chars.length])
      .join("");
  }

  function removePeer(peerId) {
    if (!peerConnections.current[peerId])
      return;

    if (peerConnections.current[peerId].dataChannel)
      peerConnections.current[peerId].dataChannel.close();

    peerConnections.current[peerId].close();
    delete peerConnections.current[peerId];
    console.log(`🗑 Removed peer: ${peerId}`)
  }

  async function host() {
    hosting.current = true;
    id.current = generateCode();
    const code = generateCode();
    sendSignal({sender: id.current, code, type: "create"});
    return code;
  }

  async function join(code) {
    hosting.current = false;
    id.current = generateCode();
    sendSignal({sender: id.current, code, type: "join"});
  }

  function sendUpdate(update) {
    dataChannels.current.forEach((dataChannel) => {
      if (dataChannel && dataChannel.readyState === 'open') {
        console.log("📤 Sending update:", update);
        dataChannel.send(JSON.stringify(update));
      } else {
        console.warn("⚠️ Data channel not open. Update not sent.");
      }
    });

    onDataReceived.current.forEach(callback => callback(update));
  }

  return (
    <WebRTCContext.Provider value={{ onDataReceived: onDataReceived.current, onDataChannelSetup: onDataChannelSetup.current, host, join, sendUpdate }}>
      {children}
    </WebRTCContext.Provider>
  );
}

export const useWebRTC = () => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error("useWebRTC must be used within a WebRTCProvider");
  }
  return context;
};






