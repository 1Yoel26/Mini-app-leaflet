package com.entrainement.miniAppLeaflet.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import com.entrainement.miniAppLeaflet.service.ServiceJwtGenererEtValider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Cette classe sert à créer un Filtre (pour valider le jwt reçu dans la requette HTTP)
// Ce filtre pourra ensuite être ajouter aux autres filtre de securité de filtreChain:
// Si le jwt est validé, passe au filtre suivant avec : filterChain.doFilter(request, response)
// sinon 
public class FiltreJwt extends OncePerRequestFilter{

	@Autowired
	private ServiceJwtGenererEtValider serviceJwtGenererEtValider;
	
	@Override
	public void doFilterInternal(
			
			HttpServletRequest requetteHttp,   // requetteHttp 
			HttpServletResponse reponseHttpRenvoyer,  // reponseHttp renvoyer au filtre 
			FilterChain chaineDeFiltre 
			
			) throws ServletException, IOException { 
		
		// récupération du header dans la requette HTTP reçu par le backend Java:
		String headerAutorisation = requetteHttp.getHeader("Authorization");
		
		// verification si ce nom existe dans le header, et s'il commence bien par Bearer (qui indique que c'est avec un token qu'on teste l'authentification):
		if(headerAutorisation != null && headerAutorisation.startsWith("Bearer ")) {
			
			// récupération du token dans la string : "Bearer tokenJwtAbcd1234"
			String tokenJwt = headerAutorisation.substring(7);
			
			// si le tokenJwt existe dans le headerAutorisation.substring(7):
			if(tokenJwt != null) {
				boolean jwtValide = serviceJwtGenererEtValider.validerJwt(tokenJwt);
				
				
				// si le tokenJwt est bien validé avec jwtValide = true, avec (signature du token validé + date non expiré)
				// alors continue vers les autres filtres de sécurité de Spring Security:
				if(jwtValide) { 
					chaineDeFiltre.doFilter(requetteHttp, reponseHttpRenvoyer);
				}
				
				// si le tokenJwt n'est pas valide : 
				// Bloquer l'accès au filtre de sécurité suivant en n'appelant pas la fonction doFiltreChain()
				else {
					// renvois une requette http avec erreur 401 (non authentifié)
					reponseHttpRenvoyer.setStatus(HttpServletResponse.SC_UNAUTHORIZED);;
					
					// stop le programme ici sans continuer vers les autres filtres de sécurité de Spring Security:
					return;
				}
				
			}
			
		}
		
		// si le header de la requette http reçu ne contient pas "authorization", 
		// mais ne contient pas non plus de token jwt à valider : comme pour les requettes de l'api publique, notamment pour créer son compte.
		// renvois vers les filtres suivant de Spring security, sans rien modifier dans la requete Http reçu:
		else {
			chaineDeFiltre.doFilter(requetteHttp, reponseHttpRenvoyer);
		}
		
		
				
		}
	}


