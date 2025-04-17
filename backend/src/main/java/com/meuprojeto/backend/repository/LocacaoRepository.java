package com.meuprojeto.backend.repository;

import com.meuprojeto.backend.entity.Locacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocacaoRepository extends JpaRepository<Locacao, Integer> {
}
