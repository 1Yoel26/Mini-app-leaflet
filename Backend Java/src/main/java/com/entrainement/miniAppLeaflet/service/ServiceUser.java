package com.entrainement.miniAppLeaflet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.entrainement.miniAppLeaflet.config.ConfigSecuriteMotDePasse;
import com.entrainement.miniAppLeaflet.model.User;
import com.entrainement.miniAppLeaflet.repository.RepositoryUserJPA;

@Service
public class ServiceUser {
	
	@Autowired
	private RepositoryUserJPA repositoryUserJPA;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	// Fonction qui ajoute un nouveau compte User en Bdd:
	public boolean addNewCompte(User infoCompte) {
		
		// Mise en forme des données identique et lisible pour chaque infos du compte (Majuscule, minuscule etc...): 
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
			
			// Le mot de passe est hashé avant d'ajouter ce nouveau compte en Bdd, 
			// via le configSecuriteMotDePasse.passwordEncoder().encode():
			infoCompte.setMotDePasse(passwordEncoder.encode(infoCompte.getMotDePasse()) );
			
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
	
	
	
	
	//Fonction pour la connection à un compte utilisateur :
	public boolean connectionCompte(String email, String motDePasse) {
		
		// test si l'email saisit pour se connecter, existe en Bdd (avant de tester le motDePasse saisit):
		Optional<User> userTrouver =  repositoryUserJPA.findByEmail(email);
		
		// Si aucun compte utilisateur n'est trouvé en Bdd pour cet email retourne False:
		if(userTrouver.isEmpty()) {
			
			return false;
		}
		
		// Sinon, si l'email est bien trouvé en Bdd, test du mot de passe saisit,
		// avec le mot de passe Hashé en Bdd pour ce compte en plusieurs étapes :
		
		
		// 1) conversion du Optional<User> userTrouver en : User userBienTrouver:
		User userBienTrouver = userTrouver.get();
		
		// 2) récupération du mot de passe hashé en Bdd pour ce compte:
		String motDePasseHasheEnBdd =  userBienTrouver.getMotDePasse();
		
		// 3) comparaison entre les 2 mot de passes :
		boolean motDePasseCorrect = passwordEncoder.matches(motDePasse, motDePasseHasheEnBdd);
	
		// 4) Si le mot de passe saisit est correct, return True, sinon retourne False :
		return motDePasseCorrect;
		
	}

}
