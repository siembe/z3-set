package com.siembe.signalserver;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Set;

@Data
public class Signal {
    @JsonProperty
    private String code;
    @JsonProperty
    private String sender;
    @JsonProperty
    private String peerId;
    @JsonProperty
    private SignalType type;
    @JsonProperty
    private Object offer;
    @JsonProperty
    private Object answer;
    @JsonProperty
    private Object candidate;
    @JsonProperty
    private Set<String> peers;
}
