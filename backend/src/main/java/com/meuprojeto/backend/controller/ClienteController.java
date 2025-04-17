package com.meuprojeto.backend.controller;

import com.meuprojeto.backend.entity.Cliente;
import com.meuprojeto.backend.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<Cliente> listarTodos() {
        return clienteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Integer id) {
        return clienteService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cliente> salvar(@Valid @RequestBody Cliente cliente) {
        return ResponseEntity.ok(clienteService.salvar(cliente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        clienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Integer id, @Valid @RequestBody Cliente clienteAtualizado) {
        return clienteService.buscarPorId(id)
                .map(clienteExistente -> {
                    clienteAtualizado.setId(clienteExistente.getId());
                    clienteAtualizado.setDataCriacao(clienteExistente.getDataCriacao()); // 🔥 Aqui o segredo
                    return ResponseEntity.ok(clienteService.salvar(clienteAtualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
