package com.entrainement.miniAppLeaflet.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
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
		
			.cors(cors->{}) // active CORS pour autoriser dans Spring Security les requettes Http venant d'Angular ou autres vers le back
	
			.csrf(csrf->csrf.disable())  // desactive le csrf pour la protection des session via des cookies car là c'est la technologie JWT Token qui est utilisé à la place
			
			.authorizeHttpRequests(
				configRouteHttp -> {
					
					// les routes autorisés sans être connecté à son
					// compte  (sans avoir le JWT Token dedans)
					configRouteHttp.requestMatchers("/api-leaflet/user/**").permitAll();
					
					
					// Actuellement toutes les autres route de l'API Java sont autorisé sans être connecté,
					// pour permettre à l'app de fonctionner correctement, car la connection au compte n'est pas encore opérationelle à 100%
					
					// Cependant toutes ces autres routes devront OBLIGATOIREMENT être bloqué (par la suite) sans être connecté à son
					// compte (il faut le jwt token dans la requette Http, et qu'il soit
					// valide pour pouvoir lancer les autres requettes Http dans l'app Back Java)
					
					configRouteHttp.anyRequest().permitAll(); // temporaire uniquement
				
					// configRouteHttp.anyRequest().authenticated(); // à remplacer par cela obligatoirement.
				}
				
					);
		
		
		return reglesDeSecuritePourRequetesHttp.build();
		
	}
	
	
	
	
	


}
