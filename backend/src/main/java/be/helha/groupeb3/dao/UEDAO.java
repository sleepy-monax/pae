package be.helha.groupeb3.dao;

import be.helha.groupeb3.entities.UE;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class UEDAO {

    @PersistenceContext(unitName = "groupeB3JTA")
    private EntityManager manager;

    public List<UE> findAll() {
        return manager.createQuery("select ue from UE ue").getResultList();
    }

    public UE findById(int id) {
        return manager.find(UE.class, id);
    }

    public UE add(UE ue) {
        if (ue == null) { return null; }
        //REFAIRE

        return ue;
    }

    public boolean update(UE oldU, UE newU) {
        if (oldU == null || oldU.getId() == null || newU == null) { return false; }
        manager.clear();
        UE ue = findById(oldU.getId());
        if (ue == null) { return false; }

        ue = newU;
        ue.setId(oldU.getId());
        manager.merge(ue);
        return true;
    }

    public boolean remove(UE ue) {
        UE isIn = findById(ue.getId());
        if (isIn == null) { return false; }
        manager.remove(isIn);
        return true;
    }
}
