package com.entrainement.miniAppLeaflet.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


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
	SecurityFilterChain securityFilterChain(HttpSecurity reglesDeSecuritePourRequetesHttp, FiltreJwt monFiltreJwt) {
		
		
		reglesDeSecuritePourRequetesHttp
		
			.cors(cors->{}) // active CORS pour autoriser dans Spring Security les requettes Http venant d'Angular ou autres vers le back
	
			.csrf(csrf->csrf.disable())  // desactive le csrf pour la protection des session via des cookies car là c'est la technologie JWT Token qui est utilisé à la place
			
			.formLogin(form->form.disable()) // desactivation du form login par défaut de Spring Security
			
			.httpBasic(httpBasic->httpBasic.disable())
			
			.authorizeHttpRequests(
				configRouteHttp -> {
					
					// les routes autorisés sans être connecté à son
					// compte  (sans avoir le JWT Token dedans)
					configRouteHttp.requestMatchers("/api-leaflet/user/**").permitAll();
					
					configRouteHttp.anyRequest().authenticated(); 
					
				}
				
					)
			
			// ajout du filtre monFiltreJwt, avant le filtre de Spring Security qui s'occupe de vérifier qui est connecté qui s'appel : UsernamePasswordAuthenticationFilter.class
			.addFilterBefore(monFiltreJwt, UsernamePasswordAuthenticationFilter.class);
		
		
		return reglesDeSecuritePourRequetesHttp.build();
		
	}
	
	
	
	
	


}
