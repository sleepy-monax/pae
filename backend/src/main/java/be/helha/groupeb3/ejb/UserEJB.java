package be.helha.groupeb3.ejb;

import be.helha.groupeb3.dao.UserDAO;
import be.helha.groupeb3.entities.User;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class UserEJB {

    @EJB
    private UserDAO dao;

    public List<User> findAll() {
        return dao.findAll();
    }

    public User findById(int id) {
        return dao.findById(id);
    }

    public User add(User user) {
        return dao.add(user);
    }

    public boolean remove(User user) {
        return dao.remove(user);
    }

    public boolean update(User oldU, User newU) {
        return dao.update(oldU, newU);
    }
}
