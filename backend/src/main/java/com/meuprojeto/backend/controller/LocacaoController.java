package com.meuprojeto.backend.controller;

import com.meuprojeto.backend.entity.Locacao;
import com.meuprojeto.backend.service.LocacaoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locacoes")
@CrossOrigin(origins = "*")
public class LocacaoController {

    private final LocacaoService locacaoService;

    public LocacaoController(LocacaoService locacaoService) {
        this.locacaoService = locacaoService;
    }

    @GetMapping
    public List<Locacao> listarTodos() {
        return locacaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Locacao> buscarPorId(@PathVariable Integer id) {
        return locacaoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Locacao> salvar(@Valid @RequestBody Locacao locacao) {
        return ResponseEntity.ok(locacaoService.salvar(locacao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        locacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Locacao> atualizar(@PathVariable Integer id, @Valid @RequestBody Locacao locacaoAtualizada) {
        return locacaoService.buscarPorId(id)
                .map(locacaoExistente -> {
                    locacaoAtualizada.setId(locacaoExistente.getId());
                    locacaoAtualizada.setDataCriacao(locacaoExistente.getDataCriacao()); // preserva data
                    return ResponseEntity.ok(locacaoService.salvar(locacaoAtualizada));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
