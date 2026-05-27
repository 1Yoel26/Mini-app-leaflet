package com.entrainement.miniAppLeaflet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entrainement.miniAppLeaflet.model.User;
import com.entrainement.miniAppLeaflet.repository.RepositoryUserJPA;

@Service
public class ServiceUser {
	
	@Autowired
	private RepositoryUserJPA repositoryUserJPA;
	
	
	// Fonction qui ajoute un nouveau compte User en Bdd:
	public boolean addNewCompte(User infoCompte) {
		
		// Mise en forme des données identique et lisible pour chaque infos du compte (Majuscule etc...): 
		infoCompte.setNom(infoCompte.getNom().toUpperCase());
		infoCompte.setPrenom(infoCompte.getPrenom().substring(0, 1).toUpperCase() + infoCompte.getPrenom().substring(1).toLowerCase());
		infoCompte.setEmail(infoCompte.getEmail().toLowerCase());
		
		
		// Avant de créer le nouveau compte, 
		// vérification si l'email n'est pas déjà pris en Bdd:
		
		boolean emailLibre;
		
		Optional<User> userAvecEmailTrouver = repositoryUserJPA.findByEmail(infoCompte.getEmail());
		
		// si le mail du nouveau compte est libre en Bdd,
		// ajout de ce compte en Bdd:
		
		if(userAvecEmailTrouver.isEmpty()) {
			
			emailLibre = true;
			
			// Puis ajout du compte en Bdd:
			repositoryUserJPA.save(infoCompte);
			
		}else {
			
			emailLibre = false;
		}
		
		
		return emailLibre;
		
	}
	
	
	// Fonction qui retourne une liste avec tous les Users:
	List<User> listeDesUsers(){
		
		return repositoryUserJPA.findAll();
	}
	
	
	// Fonction qui retourne un User ou null pour l'email donné en paramètre de la fonction :
	Optional<User> findUserByEmail(String email){
		
		return repositoryUserJPA.findByEmail(email);
	}

}
