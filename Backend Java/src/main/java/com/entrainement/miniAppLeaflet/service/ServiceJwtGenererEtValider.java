package com.entrainement.miniAppLeaflet.service;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class ServiceJwtGenererEtValider {
	
	String cleSecrete = "mp78*$fesza,m@hd.jp87436!#jkl#sqa_ez!p*ythdxwam!-wcajg*m85469@312:;!*ù$5478m;phgdz*96255662";

	private Key renvoisCleSecuriserPourSignerJwt() {
		return Keys.hmacShaKeyFor(cleSecrete.getBytes());
	}
	
	
	// géneration du JWT Token avec la clé securisé
	public String genererJwt(String emailUserConnecter) {
		
		String jwt = Jwts.builder()
				.setSubject(emailUserConnecter)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
				.signWith(renvoisCleSecuriserPourSignerJwt())
				.compact();
		
		return jwt;
	}
	
	
	
	// validation du JWT Token reçu avec la clé securisé
	public boolean validerJwt(String jwt) {
		
		// tentative de validation du jwt
		try {
			
			Jwts
			.parserBuilder()
			.setSigningKey(renvoisCleSecuriserPourSignerJwt()) // voici la clé sécurisé
			.build()
			.parseClaimsJws(jwt); // voici le Token JWT à valider
			
			return true; // si le jwt est valide, et reste dans le try sans passer par le catch
			
			
		}catch(Exception erreur){
			
			System.out.println("Erreur Token JWT invalide. Voici l'erreur : \n" + erreur.getMessage());
			
			return false; // si le token est invalide (signature, date de validation expiré ect...)
		}
	}
	
}
