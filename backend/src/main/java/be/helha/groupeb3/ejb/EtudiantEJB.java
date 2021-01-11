package be.helha.groupeb3.ejb;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import be.helha.groupeb3.dao.EtudiantDAO;
import be.helha.groupeb3.entities.Etudiant;

@Stateless
public class EtudiantEJB implements IRemote<Etudiant>{
	@EJB
	public EtudiantDAO daoEtudiant;
	
	
	@Override
	public List<Etudiant> findAll() {
		return daoEtudiant.findAll();
	}

	@Override
	public Etudiant findById(int id) {
		return daoEtudiant.findByMatricule(String.valueOf(id));
	}

	@Override
	public Etudiant add(Etudiant e) {
		return daoEtudiant.add(e);
	}
	
	@Override
	public void remove(Etudiant e) {
		daoEtudiant.remove(e);
	}
	
	@Override
	public void update(Etudiant e1, Etudiant e2) {
		daoEtudiant.update(e1,e2);
	}

	
}
