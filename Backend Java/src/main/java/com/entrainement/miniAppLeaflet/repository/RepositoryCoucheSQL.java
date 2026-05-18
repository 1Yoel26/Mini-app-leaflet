package com.entrainement.miniAppLeaflet.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.entrainement.miniAppLeaflet.model.UnPoint;

@Repository
public class RepositoryCoucheSQL {
	
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	public List<String> sqlGetTable() {
		
		String sql = """
				SELECT table_name
				FROM information_schema.tables
				WHERE table_schema = 'schema_mini_app_leaflet'
			""";
		
		return jdbcTemplate.queryForList(sql, String.class);
	}
	
	
	public List<Map<String, Object>> sqlGetUneCouche(String nomDeLaCouche) {
		
		String sql = """
				SELECT *, ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geomGeoJson
				FROM schema_mini_app_leaflet.
			""" + nomDeLaCouche;
		
		return jdbcTemplate.queryForList(sql);
	}
	
	
	
	
	public List<Map<String, Object>> findByDescriptionContainingIgnoreCase(String motAChercher){
		
		String sql = """
				SELECT *, ST_AsGeoJSON(geom) AS geomGeoJson
				FROM public.
			""" + "\"pointAndDescriptionUser\""
				+ " WHERE LOWER(description) LIKE LOWER(?)";
		
		return jdbcTemplate.queryForList(sql, "%" + motAChercher + "%");
		
	}
	
	
	
	public List<Map<String, Object>> sqlGetLaCoucheDesPoints() {
		
		String sql = """
				SELECT *, ST_AsGeoJSON(geom) AS geomGeoJson
				FROM public.
			""" + "\"pointAndDescriptionUser\"";
		
		return jdbcTemplate.queryForList(sql);
		
	}

}
