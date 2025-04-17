package com.meuprojeto.backend.controller;

import com.meuprojeto.backend.entity.Reserva;
import com.meuprojeto.backend.service.ReservaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @GetMapping
    public List<Reserva> listarTodas() {
        return reservaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> buscarPorId(@PathVariable Integer id) {
        return reservaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Reserva> salvar(@Valid @RequestBody Reserva reserva) {
        return ResponseEntity.ok(reservaService.salvar(reserva));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        reservaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reserva> atualizar(@PathVariable Integer id, @Valid @RequestBody Reserva reservaAtualizada) {
        return reservaService.buscarPorId(id)
                .map(reservaExistente -> {
                    reservaAtualizada.setId(reservaExistente.getId());
                    reservaAtualizada.setDataCriacao(reservaExistente.getDataCriacao()); // preserva data
                    return ResponseEntity.ok(reservaService.salvar(reservaAtualizada));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
