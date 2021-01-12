package be.helha.groupeb3.ejb;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import be.helha.groupeb3.dao.UtilisateurDAO;
import be.helha.groupeb3.entities.Utilisateur;

@Stateless
public class UtilisateurEJB {
	@EJB
	public UtilisateurDAO daoUtilisateur;

	public List<Utilisateur> findAll() {
		return daoUtilisateur.findAll();
	}

	public Utilisateur findById(int id) {
		return daoUtilisateur.findById(id);
	}

	public Utilisateur add(Utilisateur u) {
		return daoUtilisateur.add(u);
	}
	
	public void remove(Utilisateur t) {
		daoUtilisateur.remove(t);
	}
	
	public void update(Utilisateur u1, Utilisateur u2) {
		daoUtilisateur.update(u1,u2);
	}	
}
