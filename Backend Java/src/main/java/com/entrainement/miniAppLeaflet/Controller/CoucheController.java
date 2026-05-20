package com.entrainement.miniAppLeaflet.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entrainement.miniAppLeaflet.dto.DtoPointAndDescription;
import com.entrainement.miniAppLeaflet.model.UnPoint;
import com.entrainement.miniAppLeaflet.service.CoucheService;

@RestController
@RequestMapping("/api-leaflet")
@CrossOrigin(origins = "http://localhost:4200")
public class CoucheController {
	
	@Autowired
	private CoucheService coucheService;
	
	@GetMapping("/listeDesTables")
	public List<String> getListeDesTables(){
		
		return coucheService.getListeDesTables();
	}
	
	
	@GetMapping("")
	public List<List<Map<String, Object>>> getAllCouches(){
		
		return coucheService.getAllcouches();
		
	}
	
	// A modifier en production pour sécuriser le paramètre du nomDeLaCouche
	@GetMapping("uneCouche/{nomDeLaCouche}")
	public List<Map<String, Object>> getUneCouche(@PathVariable String nomDeLaCouche){
		
		return coucheService.getCouche(nomDeLaCouche);
		
	}
	
	
	
	@PostMapping("/saveNewPointAndDescription") 
	public void savePointAndDescription(@RequestBody DtoPointAndDescription dtoPointAndDescription) {
		
		// appel de la fonction qui sauvegarde la description + le point en Bdd:
		
		double coordonneePointLongitude = dtoPointAndDescription.getCoordonneePointLongitude();
		
		double coordonneePointLatitude = dtoPointAndDescription.getCoordonneePointLatitude();
		
		String description = dtoPointAndDescription.getDescription();
		
		System.out.println(coordonneePointLongitude + " " + coordonneePointLatitude);
		
		coucheService.savePointAndDescription(coordonneePointLongitude, coordonneePointLatitude, description);
	}
	
	
	
	@GetMapping("/getCouchePoints")
	public List<Map<String, Object>> getCouchePointAndDescriptionUser(){
		
		return coucheService.getCouchePoints();
		
	}
	
	
	@GetMapping("/filtreByDescription/{extraitDescription}")
	public List<Map<String, Object>> getCoucheDesPointsFiltrer(@PathVariable("extraitDescription") String motAChercher){
		
		return coucheService.filtreDescription(motAChercher);
	}

	
}
