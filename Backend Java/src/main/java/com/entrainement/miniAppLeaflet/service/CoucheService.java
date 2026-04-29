package com.entrainement.miniAppLeaflet.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class CoucheService {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	
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
	
	
	// cette fonction retourne chaque ligne d'une table/couche
	public List<Map<String, Object>> getCouche(String nomTable){
		
		List<Map<String, Object>> listeDesObjetsDuneCouche;
		
		String sql = """
				SELECT *, ST_AsGeoJSON(geom) AS geomGeoJson
				FROM schema_mini_app_leaflet.
			""" + nomTable;
		
		listeDesObjetsDuneCouche = jdbcTemplate.queryForList(sql);
		
		return listeDesObjetsDuneCouche;
		
	}

	
}
