package com.meuprojeto.backend.repository;

import com.meuprojeto.backend.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    // Endpoint diferencial: retorna locações disponíveis
    List<Reserva> findByLocacaoIdAndDataInicioLessThanEqualAndDataFimGreaterThanEqual(
            Integer locacaoId,
            LocalDateTime fim,
            LocalDateTime inicio
    );
}
