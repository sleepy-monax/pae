package be.helha.groupeb3.ejb;

import be.helha.groupeb3.dao.StudentDAO;
import be.helha.groupeb3.entities.Student;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class StudentEJB {

    @EJB
    private StudentDAO dao;

    public List<Student> findAll() {
        return dao.findAll();
    }

    public Student findById(int id) {
        return dao.findById(id);
    }

    public Student findByMatricule(String matricule) {
        return dao.findByMatricule(matricule);
    }

    public Student add(Student student) {
        return dao.add(student);
    }

    public boolean update(Student oldS, Student newS) {
        return dao.update(oldS, newS);
    }

    public boolean removve(Student student) {
        return dao.remove(student);
    }
}
