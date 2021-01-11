package be.helha.groupeb3.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import be.helha.groupeb3.entities.Activite;

@Stateless
public class ActiviteDAO {
	
	@PersistenceContext(unitName = "groupeB3JTA")
	private EntityManager em;
	
	private void commit() {
    	em.getTransaction().begin();
    	em.getTransaction().commit();
    }
	
	public List<Activite> findAll() {
		return em.createQuery("Select activite FROM Activite activite").getResultList();
	}
	
	public Activite findById(int id) {
		return em.find(Activite.class, id);
	}
	
	public Activite add(Activite activite) {
		if (activite == null) return null;
		if (findById(activite.getId()) == null) return null;
		
		em.persist(activite);
		commit();
		
		return null;
	}
	
	public void update(Activite aOld, Activite aNew) {
		if (aOld == null || aNew == null || aOld.getId()==null) {
        	return;
        }
        em.clear();
        Activite a = findById(aOld.getId());
        if (a == null) {   
        	return;
        }
        
        a = aNew;
        a.setId(aOld.getId());  
        
        em.merge(a);
        
        commit();
	}
	
	public void remove(Activite activite) {
		if (findById(activite.getId()) == null) return;
		String requete = "DELETE activite FROM Activite activite "
				+ "WHERE activite.id = ?1";
				
		TypedQuery<Activite> query = em.createQuery(requete, Activite.class);
        query.setParameter(1, activite.getId());
        
        commit();
        return;
	}

}
