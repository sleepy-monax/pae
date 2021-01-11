package be.helha.groupeb3.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import be.helha.groupeb3.entities.Etudiant;

@Stateless
public class EtudiantDAO {
	
	@PersistenceContext(unitName = "groupeB3JTA")
	private EntityManager em;
	
	private void commit() {
    	em.getTransaction().begin();
    	em.getTransaction().commit();
    }
	
	public List<Etudiant> findAll() {
		return em.createQuery("SELECT etudiant FROM Etudiant etudiant").getResultList();
	}
	
	public Etudiant findByMatricule(String matricule) {
		if (matricule == null) return null;
		String requete = "SELECT etudiant FROM Etudiant etudiant "
				+ "WHERE etudiant.matricule = ?1";
				
		TypedQuery<Etudiant> query = em.createQuery(requete, Etudiant.class);
        query.setParameter(1, matricule);
        List<Etudiant> result = query.getResultList();
        return result.isEmpty() ? null : result.get(0);
	}
	
	public Etudiant add(Etudiant etudiant) {
		if (etudiant == null) return null;
		if (findByMatricule(etudiant.getMatricule()) == null) return null;
		
		em.persist(etudiant);
		commit();
		
		return null;
	}	
	
	public void update(Etudiant eOld, Etudiant eNew) {
		if (eOld == null || eNew == null || eOld.getId()==null) {
        	return;
        }
        em.clear();
        Etudiant e = findByMatricule(eOld.getMatricule());
        if (e == null) {   
        	return;
        }
        
        e = eNew;
        e.setId(eOld.getId());  
        
        em.merge(e);
        
        commit();
	}
	
	public void remove(Etudiant etudiant) {
		if (findByMatricule(etudiant.getMatricule()) == null) return;
		String requete = "DELETE etudiant FROM Etudiant etudiant "
				+ "WHERE etudiant.matricule = ?1";
				
		TypedQuery<Etudiant> query = em.createQuery(requete, Etudiant.class);
        query.setParameter(1, etudiant.getMatricule());
        
        commit();
        return;
	}

}
