package com.entrainement.miniAppLeaflet.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entrainement.miniAppLeaflet.service.CoucheService;

@RestController
@RequestMapping("/api-leaflet")
public class CoucheController {
	
	@Autowired
	private CoucheService coucheService;
	
	@GetMapping("/listeDesTables")
	public List<String> getListeDesTables(){
		
		return coucheService.getTables();
	}
	
	
	@GetMapping("")
	public List<Map<String, Object>> getUneCouche(){
		
		return coucheService.getCouche("couche2_chutes_niagara");
		
	}

}
