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
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.entrainement.miniAppLeaflet.model.PointAndDescription;
import com.entrainement.miniAppLeaflet.repository.RepositoryPointAndDescription;

@Service
public class CoucheService {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@Autowired
	private RepositoryPointAndDescription repositoryPointAndDescription;
	
	
	// cette fonction retourne la liste des tables/couches dans la Bdd
	public List<String> getTables() {
		
		List<String> listeDesTables;
		
		String sql = """
				SELECT table_name
				FROM information_schema.tables
				WHERE table_schema = 'schema_mini_app_leaflet'
			""";
		
		listeDesTables = jdbcTemplate.queryForList(sql, String.class);
		
		return listeDesTables;
		
	}
	
	
	// cette fonction retourne chaque ligne d'une table/couche du schéma schema_mini_app_leaflet uniquement:
	public List<Map<String, Object>> getCouche(String nomTable){
		
		List<Map<String, Object>> listeDesObjetsDuneCouche;
		
		String sql = """
				SELECT *, ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geomGeoJson
				FROM schema_mini_app_leaflet.
			""" + nomTable;
		
		listeDesObjetsDuneCouche = jdbcTemplate.queryForList(sql);
		
		return listeDesObjetsDuneCouche;
		
	}
	
	
	// cette fonction retourne chaque ligne d'une table/couche du schéma public uniquement:
	public List<Map<String, Object>> getCouchePoints(){
		
		List<Map<String, Object>> listeDesObjetsDuneCouche;
		
		String sql = """
				SELECT *, ST_AsGeoJSON(geom) AS geomGeoJson
				FROM public.
			""" + "\"pointAndDescriptionUser\"";
		
		listeDesObjetsDuneCouche = jdbcTemplate.queryForList(sql);
		
		return listeDesObjetsDuneCouche;
		
	}
	
	

	
	public List<List<Map<String, Object>>> getAllcouches(){
		
		List<String> listeDesNomsDesCouches = getTables();
		
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
		
		PointAndDescription pointAndDescription = new PointAndDescription();
		
		pointAndDescription.setGeom(pointCreer);
		pointAndDescription.setDescription(description);
		
		
		
		//enregistrement en Bdd via JPA :
		repositoryPointAndDescription.save(pointAndDescription);
		
		
	}

	
}
