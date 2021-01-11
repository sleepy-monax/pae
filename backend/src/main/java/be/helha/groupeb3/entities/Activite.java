package be.helha.groupeb3.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Activite implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String intitule;
	private int nombreCredits;
	private Section section;
	
	public Activite() {
		
	}
	
	public Activite(String intitule, int nombreCredits, Section section) {
		this.intitule = intitule;
		this.nombreCredits = nombreCredits;
		this.section = section;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getIntitule() {
		return intitule;
	}

	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}

	public int getNombreCredits() {
		return nombreCredits;
	}

	public void setNombreCredits(int nombreCredits) {
		this.nombreCredits = nombreCredits;
	}

	public Section getSection() {
		return section;
	}

	public void setSection(Section section) {
		this.section = section;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((intitule == null) ? 0 : intitule.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Activite other = (Activite) obj;
		if (intitule == null) {
			if (other.intitule != null)
				return false;
		} else if (!intitule.equals(other.intitule))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Activite \nId : " + id + 
				"\nIntitule : " + intitule + 
				"\nNombre de Credits : " + nombreCredits + 
				"\nSection : " + section + "\n";
	}
	
	
}
