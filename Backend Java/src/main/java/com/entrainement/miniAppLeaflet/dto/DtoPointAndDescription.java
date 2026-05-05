package com.entrainement.miniAppLeaflet.dto;

import org.locationtech.jts.geom.Point;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;


@Data
public class DtoPointAndDescription {
	
	@JsonProperty("coordonneeLongitude")
	private double coordonneePointLongitude;
	
	@JsonProperty("coordonneeLatitude")
	private double coordonneePointLatitude;
	
	private String description;

}
