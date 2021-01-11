package be.helha.groupeb3.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import be.helha.groupeb3.entities.Etudiant;

@Stateless
public class EtudiantDAO {
	
	@PersistenceContext(unitName = "groupeB3JTA")
	private EntityManager em;
	
	public List<Etudiant> findAll() {
		return em.createQuery("SELECT etudiant FROM Etudiant etudiant").getResultList();
	}
	
	public Etudiant add(Etudiant etudiant) {
		em.persist(etudiant);
		
		return null;
	}

}
