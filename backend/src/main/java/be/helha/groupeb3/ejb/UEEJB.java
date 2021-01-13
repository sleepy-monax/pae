package be.helha.groupeb3.ejb;

import be.helha.groupeb3.dao.UEDAO;
import be.helha.groupeb3.entities.UE;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class UEEJB {

    @EJB
    private UEDAO dao;

    public List<UE> findAll() {
        return dao.findAll();
    }

    public UE findById(int id) {
        return dao.findById(id);
    }

    public UE add(UE ue) {
        return dao.add(ue);
    }

    public boolean update(UE oldU, UE newU) {
        return dao.update(oldU, newU);
    }

    public boolean remove(UE ue) {
        return dao.remove(ue);
    }
}
