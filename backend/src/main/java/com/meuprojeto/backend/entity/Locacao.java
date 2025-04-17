package com.meuprojeto.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "locacao")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Locacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String nome;

    @NotBlank
    private String tipo;

    @NotBlank
    private String descricao;

    @Column(name = "valor_hora", nullable = false)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal valorHora;

    @Column(name = "tempo_minimo", nullable = false)
    private Integer tempoMinimo;

    @Column(name = "tempo_maximo", nullable = false)
    private Integer tempoMaximo;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao;

    @PrePersist
    public void prePersist() {
        this.dataCriacao = LocalDateTime.now();
    }
}
