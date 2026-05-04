package com.entrainement.miniAppLeaflet.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entrainement.miniAppLeaflet.service.CoucheService;

@RestController
@RequestMapping("/api-leaflet")
@CrossOrigin(origins = "http://localhost:4200")
public class CoucheController {
	
	@Autowired
	private CoucheService coucheService;
	
	@GetMapping("/listeDesTables")
	public List<String> getListeDesTables(){
		
		return coucheService.getTables();
	}
	
	
	@GetMapping("")
	public List<List<Map<String, Object>>> getAllCouches(){
		
		return coucheService.getAllcouches();
		
	}
	
	
	@GetMapping("/{nomDeLaCouche}")
	public List<Map<String, Object>> getUneCouche(@PathVariable String nomDeLaCouche){
		
		return coucheService.getCouche(nomDeLaCouche);
		
	}
	
	
	
	@PostMapping("/saveNewPointAndDescription") 
	public void savePointAndDescription() {
		
		System.out.println("Appel save new point and description reussi");
	}

}
