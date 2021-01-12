package be.helha.groupeb3.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import be.helha.groupeb3.entities.Etudiant;
import be.helha.groupeb3.entities.Utilisateur;

@Stateless
public class UtilisateurDAO {
	
	@PersistenceContext(unitName = "groupeB3JTA")
	private EntityManager em;
	
	private void commit() {
    	em.getTransaction().begin();
    	em.getTransaction().commit();
    }
	
	public List<Utilisateur> findAll() {
		return em.createQuery("SELECT utilisateur FROM Utilisateur utilisateur").getResultList();
	}
	
	public Utilisateur findById(int id) {
		Utilisateur u = em.find(Utilisateur.class, id);
		return u == null ? null : u;
		/*String requete = "SELECT utilisateur FROM Utilisateur utilisateur "
				+ "WHERE utilisateur.id = ?1";
				
		TypedQuery<Utilisateur> query = em.createQuery(requete, Utilisateur.class);
        query.setParameter(1, id);
        List<Utilisateur> result = query.getResultList();
        return result.isEmpty() ? null : result.get(0);*/
	}
	
	public Utilisateur add(Utilisateur utilisateur) {
		if (utilisateur == null) return null;
		System.out.println(utilisateur);
		if (findById(utilisateur.getId()) != null) {
			return null;
		};
		System.out.println(utilisateur);
		em.persist(utilisateur);
		commit();
		System.out.println(utilisateur);
        return null;
	}
	
	public void update(Utilisateur uOld, Utilisateur uNew) {
		if (uOld == null || uNew == null || uOld.getId()==null) {
        	return;
        }
        em.clear();
        Utilisateur u = findById(uOld.getId());
        if (u == null) {   
        	return;
        }
        
        u = uNew;
        u.setId(uOld.getId());  
        
        em.merge(u);
        
        commit();
	}
	
	public void remove(Utilisateur utilisateur) {
		if (findById(utilisateur.getId()) == null) return;
		String requete = "DELETE utilisateur FROM Utilisateur utilisateur "
				+ "WHERE utilisateur.id = ?1";
				
		TypedQuery<Utilisateur> query = em.createQuery(requete, Utilisateur.class);
        query.setParameter(1, utilisateur.getId());
        
        commit();
        return;
	}

}