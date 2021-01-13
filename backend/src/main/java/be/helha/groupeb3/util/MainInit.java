package be.helha.groupeb3.util;

import be.helha.groupeb3.entities.Role;
import be.helha.groupeb3.entities.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class MainInit {

    public static void main(String[] args) {

        EntityManagerFactory factory = Persistence.createEntityManagerFactory("groupeB3");
        EntityManager manager = factory.createEntityManager();

        EntityTransaction transaction = manager.getTransaction();

        User u = new User("admin", "$2y$10$JCc/vfFPLtVVDnF6e88Vse/byC1VQ2SsDTVa7pgaHYenB0Ray1jny", Role.DIRECTEUR);
        User u1 = new User("secretaire", "$2y$10$JCc/vfFPLtVVDnF6e88Vse/byC1VQ2SsDTVa7pgaHYenB0Ray1jny", Role.SECRETAIRE);

        transaction.begin();
        manager.persist(u);
        manager.persist(u1);
        transaction.commit();

        manager.close();
        factory.close();
    }
}
