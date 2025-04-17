package com.meuprojeto.backend.service;

import com.meuprojeto.backend.entity.Reserva;
import com.meuprojeto.backend.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> buscarPorId(Integer id) {
        return reservaRepository.findById(id);
    }

    public Reserva salvar(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public void deletar(Integer id) {
        reservaRepository.deleteById(id);
    }
}
