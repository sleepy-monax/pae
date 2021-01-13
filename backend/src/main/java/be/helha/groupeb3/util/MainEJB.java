package be.helha.groupeb3.util;

import be.helha.groupeb3.entities.Role;
import be.helha.groupeb3.entities.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class MainEJB {

    public static void main(String[] args) {

        EntityManagerFactory factory = Persistence.createEntityManagerFactory("groupeB3");
        EntityManager manager = factory.createEntityManager();

        System.out.println(manager.createQuery("select user from User user").getResultList());

        User user = new User("sahsa", "helha", Role.SECRETAIRE);

        EntityTransaction transaction = manager.getTransaction();

        transaction.begin();
        manager.persist(user);
        transaction.commit();

        manager.close();
        factory.close();

    }
}
