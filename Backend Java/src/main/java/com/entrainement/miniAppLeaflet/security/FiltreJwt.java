package com.entrainement.miniAppLeaflet.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.entrainement.miniAppLeaflet.service.ServiceJwtGenererEtValider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


// Cette classe sert à créer un filtre (pour valider le jwt reçu dans la requette HTTP)


// Ce filtre pourra ensuite être ajouter aux autres filtre de securité de filtreChain:
// 		- Si le tokenJwt à bien été envoyé, et qu'il n'est pas valide bloque l'accès aux filtres suivant de Spring Security avec le non appel de doFilterChain() avec le return;
// 		- Par contre, si le tokenJwt à été envoyé et est validé, ou bien si aucun tokenJwt n'a été envoyé, continue vers les filtres suivant de Spring Security.


@Component
public class FiltreJwt extends OncePerRequestFilter{

	@Autowired
	private ServiceJwtGenererEtValider serviceJwtGenererEtValider;
	
	@Override
	protected void doFilterInternal( HttpServletRequest requetteHttp, HttpServletResponse reponseHttpRenvoyer,  FilterChain chaineDeFiltre ) throws ServletException, IOException { 
		
		// récupération du Header de la requette http reçu 
		
		String headerAuthorization = requetteHttp.getHeader("Authorization");
		
			
		// s'il n y ya pas une Authorization dans la requette Http reçu, continue vers les filtres suivant de Spring Security (comme pour la requtte public qui permet de créer son compte): 
		if(headerAuthorization == null) {
			chaineDeFiltre.doFilter(requetteHttp, reponseHttpRenvoyer);
			return;
		}
		else if(!headerAuthorization.startsWith("Bearer ")) {
			
			reponseHttpRenvoyer.setStatus(401);
			return;
			
		}
		// S'il ya bien une Authorization, tentative de validation du tokenJwt
		else {
			
			// récupération du tokenJwt envoyé dans le header
			String tokenJwt = headerAuthorization.substring(7);
			System.out.println(tokenJwt);
			
			// validation booleane du tokenJwt :
			boolean jwtValideOuPas = serviceJwtGenererEtValider.validerJwt(tokenJwt);
			
			
			// si le token est valide, crée l'utilisateur connecté et continue vers les filtres suivant de Spring Security:
			if(jwtValideOuPas == true) {
				
				// récupération de l'email de l'utilisateur authentifié via son tokenJwt :
				
				
				// Création d'un utilisateur pour Spring Security
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken("emailDuToken", null);
				
				// Enregistrement de cette utilisateur connecté dans le Contexte de Spring Security pour cette requette Http uniquement (Stateless):
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				
				
				chaineDeFiltre.doFilter(requetteHttp, reponseHttpRenvoyer);
				return;
			}
			
			// sinon, si le tokenJwt n'est pas valide, bloquer l'accès aux filtres suivant de Spring Security, en n'appelant pas le fonction chaineDeFiltre.doFilter(requetteHttp, reponseHttpRenvoyer) :
			else {
				reponseHttpRenvoyer.setStatus(401);
				return;
			}
			
			}
		
		}
	
}


