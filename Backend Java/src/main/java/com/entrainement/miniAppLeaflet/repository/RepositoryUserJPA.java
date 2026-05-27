package com.entrainement.miniAppLeaflet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entrainement.miniAppLeaflet.model.User;

public interface RepositoryUserJPA extends JpaRepository<User, Long> {
	
	Optional<User> findByEmail(String email);

}
