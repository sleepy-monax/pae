package be.helha.groupeb3.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class UE implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
	private List<Activite> activites;
	private int identification;
	private int nombreCredits;
	private String intitule;
	private String anneeAcademique;
	private Section section;
	
	public UE() {
		
	}
	
	public UE(int identification, int nombreCredits, String intitule,
			String anneeAcademique, Section section) {
		activites = new ArrayList<Activite>();
		this.identification = identification;
		this.nombreCredits = nombreCredits;
		this.intitule = intitule;
		this.anneeAcademique = anneeAcademique;
		this.section = section;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public List<Activite> getActivites() {
		return activites;
	}

	public void setActivites(List<Activite> activites) {
		this.activites = activites;
	}

	public int getIdentification() {
		return identification;
	}

	public void setIdentification(int identification) {
		this.identification = identification;
	}

	public int getNombreCredits() {
		return nombreCredits;
	}

	public void setNombreCredits(int nombreCredits) {
		this.nombreCredits = nombreCredits;
	}

	public String getIntitule() {
		return intitule;
	}

	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}

	public String getAnneeAcademique() {
		return anneeAcademique;
	}

	public void setAnneeAcademique(String anneeAcademique) {
		this.anneeAcademique = anneeAcademique;
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
		result = prime * result + identification;
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
		UE other = (UE) obj;
		if (identification != other.identification)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "UE \nId : " + id + 
				"\nAactivites : " + activites + 
				"\nIdentification : " + identification + 
				"\nNombre de Credits : " + nombreCredits + 
				"\nIntitule : " + intitule + 
				"\nAnnee Academique : " + anneeAcademique + 
				"\nSection : " + section + "\n";
	}
	
	
}
