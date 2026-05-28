package com.entrainement.miniAppLeaflet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.CorsBeanDefinitionParser;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity  // pour dire a Spring Security d'utiliser cette config sécurité en plus:
public class ConfigSecuriteRouteHttpAutoriser {
	
	// Une chaine de filtre de sécurité dans Spring Security 
	// sert notamment à indiquer lorsque le Backend Java recoit
	// une requete HTTP (de Angular par exemple) : 
	// quelle routes peut ou ne peut pas faire des appels Http vers
	// le backend Java, et est ce que la route doit contenir un JWT Token ou
	// pas pour l'accès, et est ce que les appel Http envoyé depuis Angular (localhost:4200)
	// sont autorisé ou pas, etc...
	
	// Cette fonction retourne un Objet SecurityFilterChain, et va être automatiquement utiliser 
	// par Spring Security au lancement de l'app Java Spring Boot, pour personnaliser son 
	// filtre de sécurité avec les règles définis ci dessous 
	// (en plus des siennes par défaut qui ne seront pas modifié ici explicitement).
	
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity reglesDeSecuritePourRequetesHttp) {
		
		
		reglesDeSecuritePourRequetesHttp
			.csrf(csrf->csrf.disable())
			.authorizeHttpRequests(
				configRouteHttp -> {
					
					// les routes autorisés sans être connecté à son
					// compte  (avec le jwt token dedans)
					configRouteHttp.requestMatchers("/auth/**").permitAll();
					
					
					// toutes les autres routes sont bloqué sans être connecté à son
					// compte (sans le jwt token dedans)
					configRouteHttp.anyRequest().authenticated();
					
					
				}
				);
		
		
		return reglesDeSecuritePourRequetesHttp.build();
		
	}
	

}
