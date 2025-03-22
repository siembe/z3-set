package com.siembe.signalserver;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.yaml.snakeyaml.util.Tuple;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class SignalingService {

    // Map of roomCode to map of senderId to session
    private final Map<String, Map<String,WebSocketSession>> sessions = new ConcurrentHashMap<>();
    // Map of session to tuple of roomCode, senderId
    private final Map<WebSocketSession, Tuple<String, String>> reverseLookup = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper;

    public void handleCreate(Signal signal, WebSocketSession session) {
        Map<String, WebSocketSession> room = new ConcurrentHashMap<>();
        room.put(signal.getSender(), session);
        sessions.put(signal.getCode(), room);
        reverseLookup.put(session, new Tuple<>(signal.getCode(), signal.getSender()));
    }

    public void handleJoin(Signal signal, WebSocketSession session)  {
        Map<String, WebSocketSession> room = sessions.get(signal.getCode());
        if (room == null) {
            log.error("No room found for code {}", signal.getCode());
            return;
        }
        room.put(signal.getSender(), session);
        reverseLookup.put(session, new Tuple<>(signal.getCode(), signal.getSender()));
        try {
            Set<String> otherUsers = room.keySet().stream()
                    .filter(key -> !key.equals(signal.getSender()))
                    .collect(Collectors.toSet());

            signal.setPeers(otherUsers);
            signal.setSender("SERVER");
            signal.setType(SignalType.join);
            String response = objectMapper.writeValueAsString(signal);
            session.sendMessage(new TextMessage(response));
        } catch (IOException e) {
            log.error("Failed to send join response", e);
        }
    }

    public void handleLeave(WebSocketSession session) {
        Tuple<String,String> pair = reverseLookup.remove(session);
        if (pair == null)
            return;

        Map<String, WebSocketSession> room = sessions.get(pair._1());
        if (room != null) {
            room.remove(pair._2(), session);

            if (room.isEmpty()) {
                sessions.remove(pair._1());
                log.info("🗑 Room {} deleted (empty)", pair._1());
            }
        }
    }

    public void forwardSignal(Signal signal) throws IOException {
        Map<String, WebSocketSession> room = sessions.get(signal.getCode());
        if (room == null) {
            log.warn("⚠️ Room {} not found", signal.getCode());
            return;
        }

        if (Objects.equals(signal.getSender(), signal.getPeerId()))
            log.warn("⚠️ Sender and PeerId {} matched", signal.getPeerId());

        WebSocketSession session = room.get(signal.getPeerId());
        if (session != null && session.isOpen()) {
            synchronized (session) {
                log.info("🔄 Forwarding {} to {}", signal.getType(), signal.getPeerId());
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(signal)));
            }
        } else {
            log.warn("⚠️ Target peer {} not found", signal.getPeerId());
        }
    }
}
