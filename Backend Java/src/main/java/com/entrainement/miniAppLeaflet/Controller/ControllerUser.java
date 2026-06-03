package com.entrainement.miniAppLeaflet.Controller;

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
	boolean authentification(@RequestBody DtoUserAuthentification dtoUserAuthentification) {
		
		String emailConnection = dtoUserAuthentification.getEmail();
		String motDePasseConnection = dtoUserAuthentification.getMotDePasse();
		
		boolean authentificationValide = serviceUser.connectionCompte(emailConnection, motDePasseConnection);
	
		// return True si l'authentification est valide, est False si l'email ou le mot de passe incorrect:
		return authentificationValide;
	
	}

	
}
