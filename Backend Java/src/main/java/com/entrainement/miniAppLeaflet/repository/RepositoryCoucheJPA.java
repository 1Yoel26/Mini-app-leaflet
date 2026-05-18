package com.entrainement.miniAppLeaflet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entrainement.miniAppLeaflet.model.UnPoint;

public interface RepositoryCoucheJPA extends JpaRepository<UnPoint, Long>{
	
	public List<UnPoint> findByDescriptionContainingIgnoreCase(String motAChercher);

}
