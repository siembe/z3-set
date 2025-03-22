package com.siembe.signalserver;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final SignalingService signalingService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("✅ WebSocket Connected: {}", session.getId());
    }

    @Override
    public void handleTextMessage(@NonNull WebSocketSession session, TextMessage message) throws Exception {
        log.trace("📡 Received: {}", message.getPayload());

        Signal signal = objectMapper.readValue(message.getPayload(), Signal.class);

        switch (signal.getType()) {
            case create -> signalingService.handleCreate(signal, session);
            case join -> signalingService.handleJoin(signal, session);
            case offer, answer, icecandidate -> signalingService.forwardSignal(signal);
            default -> log.warn("⚠️ Unrecognized signal type: {}", signal.getType());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, @NonNull CloseStatus status) {
        log.info("❌ WebSocket Disconnected: {}", session.getId());
        signalingService.handleLeave(session);
    }
}
