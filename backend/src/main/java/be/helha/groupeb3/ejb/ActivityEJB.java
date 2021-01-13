package be.helha.groupeb3.ejb;

import be.helha.groupeb3.dao.ActivityDAO;
import be.helha.groupeb3.entities.Activity;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class ActivityEJB {

    @EJB
    private ActivityDAO dao;

    public List<Activity> findAll() {
        return dao.findAll();
    }

    public Activity findById(int id) {
        return dao.findById(id);
    }

    public Activity add(Activity activity) {
        return dao.add(activity);
    }

    public boolean update(Activity oldA, Activity newA) {
        return dao.update(oldA, newA);
    }

    public boolean remove(Activity activity) {
        return dao.remove(activity);
    }
}
