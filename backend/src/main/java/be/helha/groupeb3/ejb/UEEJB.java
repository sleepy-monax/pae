package be.helha.groupeb3.ejb;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import be.helha.groupeb3.dao.UEDAO;
import be.helha.groupeb3.entities.UE;

@Stateless
public class UEEJB implements IRemote<UE>{
	@EJB
	public UEDAO daoUE;

	@Override
	public List<UE> findAll() {
		return daoUE.findAll();
	}

	@Override
	public UE findById(int id) {
		return daoUE.findById(id);
	}

	@Override
	public UE add(UE ue) {
		return daoUE.add(ue);
	}

	@Override
	public void remove(UE ue) {
		daoUE.remove(ue);
		
	}
	
	@Override
	public void update(UE ue1, UE ue2) {
		daoUE.update(ue1,ue2);
	}

}
