package be.helha.groupeb3.ejb;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import be.helha.groupeb3.dao.UEDAO;
import be.helha.groupeb3.entities.UE;

@Stateless
public class UEEJB{
	@EJB
	public UEDAO daoUE;

	public List<UE> findAll() {
		return daoUE.findAll();
	}

	public UE findById(int id) {
		return daoUE.findById(id);
	}

	public UE add(UE ue) {
		return daoUE.add(ue);
	}

	public void remove(UE ue) {
		daoUE.remove(ue);
	}
	
	public void update(UE ue1, UE ue2) {
		daoUE.update(ue1,ue2);
	}

}
