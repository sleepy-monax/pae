package be.helha.groupeb3.ejb;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import be.helha.groupeb3.dao.ActiviteDAO;
import be.helha.groupeb3.entities.Activite;

@Stateless
public class ActiviteEJB {
	@EJB
	public ActiviteDAO daoActivite;

	public List<Activite> findAll() {
		return daoActivite.findAll();
	}

	public Activite findById(int id) {
		return daoActivite.findById(id);
	}

	public Activite add(Activite a) {
		return daoActivite.add(a);
	}

	public void remove(Activite a) {
		daoActivite.remove(a);	
	}
	
	public void update(Activite a1, Activite a2) {
		daoActivite.update(a1,a2);
	}
}
