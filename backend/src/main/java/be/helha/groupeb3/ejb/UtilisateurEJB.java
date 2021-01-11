package be.helha.groupeb3.ejb;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import be.helha.groupeb3.dao.UtilisateurDAO;
import be.helha.groupeb3.entities.Utilisateur;

@Stateless
public class UtilisateurEJB implements IRemote<Utilisateur>{
	@EJB
	public UtilisateurDAO daoUtilisateur;

	@Override
	public List<Utilisateur> findAll() {
		return daoUtilisateur.findAll();
	}

	@Override
	public Utilisateur findById(int id) {
		return daoUtilisateur.findById(id);
	}

	@Override
	public Utilisateur add(Utilisateur u) {
		return daoUtilisateur.add(u);
	}
	
	@Override
	public void remove(Utilisateur t) {
		daoUtilisateur.remove(t);
		
	}
	
	@Override
	public void update(Utilisateur u1, Utilisateur u2) {
		daoUtilisateur.update(u1,u2);
	}	
}
