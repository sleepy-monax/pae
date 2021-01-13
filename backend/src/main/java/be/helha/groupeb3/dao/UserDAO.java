package be.helha.groupeb3.dao;

import at.favre.lib.crypto.bcrypt.BCrypt;
import be.helha.groupeb3.entities.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Stateless
public class UserDAO {

    @PersistenceContext(unitName = "groupeB3JTA")
    private EntityManager manager;

    public List<User> findAll() {
        return manager.createQuery("select user from User user").getResultList();
    }

    public User findById(int id) {
        return manager.find(User.class, id);
    }

    public User add(User user) {
        if (user == null) { return null;}
        if (findByName(user.getLogin()) == null) { return null; }
        String hash = BCrypt.withDefaults().hashToString(BCrypt.MAX_COST, user.getPassword().toCharArray());
        user.setPassword(hash);
        manager.persist(user);
        return user;
    }

    public boolean update(User oldU, User newU) {
        if (oldU == null || newU == null || oldU.getId() == 0) { return false;}
        User user = findById(oldU.getId());
        manager.clear();
        if (user == null) { return false; }

        user = newU;
        user.setId(oldU.getId());
        manager.merge(newU);
        return true;
    }

    public boolean remove(User user) {
        User isIn = findById(user.getId());
        if (isIn == null) { return false; }
        manager.remove(isIn);
        return true;
    }

    public User findByName(String login) {
        if (login == null) { return null; }
        String request = "select user from User user where user.login=?1";

        TypedQuery<User> query = manager.createQuery(request, User.class);
        query.setParameter(1, login);

        List<User> users = query.getResultList();
        return users.isEmpty() ? null : users.get(0);
    }
}
