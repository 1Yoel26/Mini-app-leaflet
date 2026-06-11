package com.entrainement.miniAppLeaflet.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.support.Repositories;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.entrainement.miniAppLeaflet.model.UnPoint;
import com.entrainement.miniAppLeaflet.repository.RepositoryCoucheSQL;
import com.entrainement.miniAppLeaflet.repository.RepositoryCoucheJPA;

@Service
public class ServiceCouche {
	
	@Autowired
	private RepositoryCoucheJPA repositoryCoucheDesPoints;
	
	@Autowired
	private RepositoryCoucheSQL repositoryCoucheParcelle;
	
	
	// cette fonction retourne la liste des tables/couches dans la Bdd
	public List<String> getListeDesTables() {
		
		List<String> listeDesTables;
		
		listeDesTables = repositoryCoucheParcelle.sqlGetTable();
		
		return listeDesTables;
		
	}
	
	
	// cette fonction retourne chaque ligne d'une table/couche du schéma schema_mini_app_leaflet uniquement:
	public List<Map<String, Object>> getCouche(String nomTable){
		
		List<Map<String, Object>> listeDesObjetsDuneCouche = null;
		
		List<String> listeDesTablesAutoriser = repositoryCoucheParcelle.sqlGetTable();
		
		// vérifie que la table demandé existe bien dans le schéma pour éviter les injections sql
		if(listeDesTablesAutoriser.contains(nomTable)) {
			listeDesObjetsDuneCouche = repositoryCoucheParcelle.sqlGetUneCouche(nomTable);
		}
		
		// si la table demandé n'est pas autorisé :
		if(listeDesObjetsDuneCouche == null) {
			System.out.println("Erreur : Le nom de la table demandé n'est pas autorisé");
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erreur : Le nom de la table demandé n'est pas autorisé");
		}
		
		return listeDesObjetsDuneCouche;
		
	}
	
	
	// Cette fonction retourne la couche des Points cliqués, avec 
	// chaque ligne d'une table/couche du schéma public uniquement:
	
	public List<Map<String, Object>> getCouchePoints(){
		
		List<Map<String, Object>> listeDesObjetsDuneCouche;
		
		listeDesObjetsDuneCouche = repositoryCoucheParcelle.sqlGetLaCoucheDesPoints();
		
		return listeDesObjetsDuneCouche;
		
	}
	
	

	
	public List<List<Map<String, Object>>> getAllcouches(){
		
		List<String> listeDesNomsDesCouches = getListeDesTables();
		
		List<List<Map<String, Object>>> listeAvecToutesLesCouches = new ArrayList<List<Map<String,Object>>>();
		
		for(String nomDuneCouche: listeDesNomsDesCouches) {
			
			List<Map<String, Object>> uneCouche = getCouche(nomDuneCouche);
			
			listeAvecToutesLesCouches.add(uneCouche);
			
		}
		
		return listeAvecToutesLesCouches;
	}
	
	
	public void savePointAndDescription(double coordonneLongitude, double coordonneLatitude, String description) {
		
		// Création du Point Géométrique compréhensible par JPA avec les coordonnées du point récupérés:
		
		// Instantiation de la boite à outil Géométrique qui permet de créer un Point compréhensible par PostgreSQL:
		GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
		
		// création du Point :
		Point pointCreer = geometryFactory.createPoint(new Coordinate(coordonneLongitude, coordonneLatitude));
		
		// création de l'objet complet avec le Point + la description pour
		// ensuite l'enregistrer en Bdd via JPA:
		
		UnPoint pointAndDescription = new UnPoint();
		
		pointAndDescription.setGeom(pointCreer);
		pointAndDescription.setDescription(description);
		
		
		
		//enregistrement en Bdd via JPA :
		repositoryCoucheDesPoints.save(pointAndDescription);
		
		
	}
	
	
	
	public List<Map<String, Object>> filtreDescription(String motAChercher) {
		
		return repositoryCoucheParcelle.findByDescriptionContainingIgnoreCase(motAChercher);
		
	}

	
}
