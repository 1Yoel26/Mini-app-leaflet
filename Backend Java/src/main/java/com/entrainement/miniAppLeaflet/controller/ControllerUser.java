package com.entrainement.miniAppLeaflet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entrainement.miniAppLeaflet.dto.DtoUserAuthentification;
import com.entrainement.miniAppLeaflet.model.User;
import com.entrainement.miniAppLeaflet.service.ServiceUser;


@RestController
@RequestMapping("/api-leaflet/user")
@CrossOrigin(origins = "http://localhost:4200")
public class ControllerUser {
	
	@Autowired
	private ServiceUser serviceUser;
	
	@PostMapping("/addUser")
	boolean addUser(@RequestBody User infoCompte){
		
		boolean compteCreer = serviceUser.addNewCompte(infoCompte);
		
		return compteCreer;
		
	}
	
	
	
	@PostMapping("/authentification")
	String authentification(@RequestBody DtoUserAuthentification dtoUserAuthentification) {
		
		String emailConnection = dtoUserAuthentification.getEmail();
		String motDePasseConnection = dtoUserAuthentification.getMotDePasse();
		
		String authentificationValide = serviceUser.connectionCompte(emailConnection, motDePasseConnection);
	
		// return null si l'email ou le mot de passe incorrect, et retourne le TokenJWT si l'authentification est valide:
		return authentificationValide;
	
	}

	
}
