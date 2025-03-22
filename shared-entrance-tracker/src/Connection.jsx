import {useEffect, useState} from 'react';
import {useWebRTC} from './WebRTCContext.jsx';

function Connection() {

  const [sessionCode, setSessionCode] = useState('');
  const {host, join} = useWebRTC();

  useEffect(() => {
      try {
        if (document.hasFocus())
          navigator.clipboard.writeText(sessionCode);
      } catch (ignored) {
      }

    }
    , [sessionCode])

  async function hostSession() {
    try {
      const code = await host();
      if (!code) return;
      setSessionCode(code);
    } catch (error) {
      console.error("Error hosting session:", error);
    }
  }

  async function joinSession() {
    try {
      if (sessionCode.length !== 8) return;
      await join(sessionCode);
    } catch (error) {
      console.error("❌ Error joining session:", error);
    }
  }

  return (
    <div className="tools-container">
      <button className="ui" onClick={hostSession}>Host</button>
      <button className="ui" onClick={joinSession}>Join</button>
      <input className="ui"
        value={sessionCode}
        onChange={(e) => setSessionCode(e.target.value)}
      />
    </div>
  );
}

export default Connection;