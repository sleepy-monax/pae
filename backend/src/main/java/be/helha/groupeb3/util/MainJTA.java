package be.helha.groupeb3.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import be.helha.groupeb3.dao.EtudiantDAO;
import be.helha.groupeb3.dao.UtilisateurDAO;
import be.helha.groupeb3.ejb.UtilisateurEJB;
import be.helha.groupeb3.entities.Etudiant;
import be.helha.groupeb3.entities.Roles;
import be.helha.groupeb3.entities.Section;
import be.helha.groupeb3.entities.Utilisateur;

public class MainJTA {

	public static void main(String[] args) {

		EntityManagerFactory emf = Persistence.createEntityManagerFactory("groupeB3JTA");
		EntityManager em = emf.createEntityManager();
		
		//EtudiantDAO etudiantDAO = new EtudiantDAO();
		
		//Etudiant e = new Etudiant("Jean", "Jacques", Section.INFORMATIQUE_DE_GESTION, "la182159", "2021");
		//System.out.println(etudiantDAO.add(e));
		
		//UtilisateurDAO userDAO = new UtilisateurDAO();
		
		//Utilisateur u = new Utilisateur("admin", "helha", Roles.DIRECTEUR);
		
		//System.out.println(userDAO.add(u));
		//userDAO.findById(0);
		//userDAO.findAll();
		
		UtilisateurEJB userEJB = new UtilisateurEJB();
		
		Utilisateur u = new Utilisateur("admin", "helha", Roles.DIRECTEUR);
				
		//System.out.println(userEJB.add(u));
		//userEJB.findById(0);
		
		try {
			userEJB.findAll();
		}
		catch(NullPointerException e) {
			System.out.println("NullPointerException thrown!");
		}
		
		System.out.println(em);

		
	}

}
