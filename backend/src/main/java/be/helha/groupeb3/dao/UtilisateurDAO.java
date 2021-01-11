package be.helha.groupeb3.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import be.helha.groupeb3.entities.Utilisateur;

@Stateless
public class UtilisateurDAO {
	
	@PersistenceContext(unitName = "groupeB3JTA")
	private EntityManager em;
	
	public List<Utilisateur> findAll() {
		return em.createQuery("SELECT utilisateur FROM Utilisateur utilisateur").getResultList();
	}
	
	public Utilisateur add(Utilisateur utilisateur) {
		em.persist(utilisateur);
		
		return null;
	}

}
