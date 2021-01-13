package be.helha.groupeb3.dao;

import be.helha.groupeb3.entities.Activity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class ActivityDAO {

    @PersistenceContext(unitName = "groupeB3JTA")
    private EntityManager manager;

    public List<Activity> findAll() {
        return manager.createQuery("select activity from Activity activity").getResultList();
    }

    public Activity findById(int id) {
        return manager.find(Activity.class, id);
    }

    public Activity add(Activity activity) {
        if (activity == null) {return null; }
        //A REFAIRE
        return activity;
    }

    public boolean update(Activity oldA, Activity newA) {
        if (oldA == null || oldA.getId() == null || newA == null) { return false; }

        manager.clear();
        Activity activity = findById(oldA.getId());
        if (activity == null) {return false;}
        activity = newA;
        activity.setId(oldA.getId());

        manager.merge(activity);
        return true;
    }

    public boolean remove(Activity activity) {
        Activity isIn = findById(activity.getId());
        if (isIn == null) { return false; }
        manager.remove(isIn);
        return true;
    }
}