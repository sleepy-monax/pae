package be.helha.groupeb3.ejb;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import be.helha.groupeb3.dao.EtudiantDAO;
import be.helha.groupeb3.entities.Etudiant;

@Stateless
public class EtudiantEJB {
	@EJB
	public EtudiantDAO daoEtudiant;
	
	public List<Etudiant> findAll() {
		return daoEtudiant.findAll();
	}

	public Etudiant findById(int id) {
		return daoEtudiant.findByMatricule(String.valueOf(id));
	}

	public Etudiant add(Etudiant e) {
		return daoEtudiant.add(e);
	}
	
	public void remove(Etudiant e) {
		daoEtudiant.remove(e);
	}
	
	public void update(Etudiant e1, Etudiant e2) {
		daoEtudiant.update(e1,e2);
	}

	
}
