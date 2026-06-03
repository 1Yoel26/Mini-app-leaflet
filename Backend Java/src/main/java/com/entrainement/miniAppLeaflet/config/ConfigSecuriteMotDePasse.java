package com.entrainement.miniAppLeaflet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ConfigSecuriteMotDePasse {
	
	// Fonction Bean qui permet de retourner un 
	// objet BCryptPasswordEncoder (qui implémente l'interface PasswordEncoder
	// avec une fonction dans l'interface pour notamment : chiffrer ou comparer un mdp 
	// si besoin pour la fonctionalité Connection à un compte)
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	

}
