package com.entrainement.miniAppLeaflet.model;



import org.locationtech.jts.geom.Point;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "\"pointAndDescriptionUser\"", schema = "public") 
@Data
public class PointAndDescription {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(columnDefinition = "geometry(Point, 4326)")
	private Point geom;
	
	private String description;
	

}
