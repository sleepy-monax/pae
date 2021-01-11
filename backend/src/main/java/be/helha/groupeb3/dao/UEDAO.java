package be.helha.groupeb3.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import be.helha.groupeb3.entities.UE;

@Stateless
public class UEDAO {
	@PersistenceContext(unitName = "groupeB3JTA")
	private EntityManager em;
	
	public List<UE> findAll() {
		return em.createQuery("SELECT ue FROM UE ue").getResultList();
	}
	
	public UE findById(int id) {
		return em.find(UE.class, id);
	}
	
	public UE add(UE ue) {
		if (ue == null) return null;
        if (findById(ue.getId()) == null) return null;
		em.persist(ue);
		commit();
		return null;
		
	}
	
	public void remove(UE ue) {
		if(findById(ue.getId()) == null) return;
		String requete = "DELETE ue FROM UE ue WHERE ue.id = ?1";
		TypedQuery<UE> query = em.createQuery(requete, UE.class);
		query.setParameter(1,  ue.getId());
		return;
	}
	
	public void update(UE oldUE, UE newUE) {
		if (oldUE == null || newUE == null || oldUE.getId()==null) {
            return;
        }
        em.clear();
        UE ue = findById(oldUE.getId());
        if (ue == null) {   
            return;
        }        
        ue = newUE;
        ue.setId(oldUE.getId());  
        em.merge(ue);
        commit();
	}

	private void commit() {
		em.getTransaction().begin();
		em.getTransaction().commit();
	}
}
