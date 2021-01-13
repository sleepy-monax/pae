package be.helha.groupeb3.dao;


import be.helha.groupeb3.entities.Student;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class StudentDAO {

    @PersistenceContext(unitName = "groupeB3JTA")
    private EntityManager manager;

    public List<Student> findAll() {
        return manager.createQuery("select student from Student student").getResultList();
    }

    public Student findById(int id) {
        return manager.find(Student.class, id);
    }

    public Student findByMatricule(String matricule) {
        if (matricule == null) {return null;}
        String request = "select student from Student student where student.matricule=?1";

        TypedQuery<Student> query = manager.createQuery(request, Student.class);
        query.setParameter(1, matricule);

        List<Student> result = query.getResultList();
        return result.isEmpty() ? null : result.get(0);
    }

    public Student add(Student student) {
        if (student == null) { return null; }
        // Bizarre on retourne l'utilisateur meme si pas ajouter
        if (findByMatricule(student.getMatricule()) == null) {
            manager.persist(student);
        }
        return student;
    }

    public boolean update(Student oldS, Student newS) {
        if (oldS == null || oldS.getId() == null || newS == null) { return false; }
        manager.clear();
        Student student = findById(oldS.getId());
        if (student == null) { return false; }

        student = newS;
        student.setId(oldS.getId());
        manager.merge(student);
        return true;
    }

    public boolean remove(Student student) {
        Student isIn = findById(student.getId());
        if (isIn == null) { return false; }
        manager.remove(isIn);
        return true;
    }
}
