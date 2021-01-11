package be.helha.groupeb3.ejb;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import be.helha.groupeb3.dao.ActiviteDAO;
import be.helha.groupeb3.entities.Activite;

@Stateless
public class ActiviteEJB implements IRemote<Activite>{
	@EJB
	public ActiviteDAO daoActivite;

	@Override
	public List<Activite> findAll() {
		return daoActivite.findAll();
	}

	@Override
	public Activite findById(int id) {
		return daoActivite.findById(id);
	}

	@Override
	public Activite add(Activite a) {
		return daoActivite.add(a);
	}

	@Override
	public void remove(Activite a) {
		daoActivite.remove(a);
		
	}
	
	@Override
	public void update(Activite a1, Activite a2) {
		daoActivite.update(a1,a2);
	}
}
