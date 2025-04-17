package com.meuprojeto.backend.service;

import com.meuprojeto.backend.entity.Locacao;
import com.meuprojeto.backend.repository.LocacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocacaoService {

    private final LocacaoRepository locacaoRepository;

    public LocacaoService(LocacaoRepository locacaoRepository) {
        this.locacaoRepository = locacaoRepository;
    }

    public List<Locacao> listarTodos() {
        return locacaoRepository.findAll();
    }

    public Optional<Locacao> buscarPorId(Integer id) {
        return locacaoRepository.findById(id);
    }

    public Locacao salvar(Locacao locacao) {
        return locacaoRepository.save(locacao);
    }

    public void deletar(Integer id) {
        locacaoRepository.deleteById(id);
    }
}
