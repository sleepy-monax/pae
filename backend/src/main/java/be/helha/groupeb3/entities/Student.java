package be.helha.groupeb3.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Student implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String lastname, firstname, matricule;

    @Column(name = "academic_year")
    private String academicYear;

    @Enumerated(EnumType.STRING)
    private Section section;

    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<UE> ues;

    public Student() {
    }

    public Student(String lastname, String firstname, String matricule, String academicYear, Section section) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.matricule = matricule;
        this.academicYear = academicYear;
        this.section = section;
        this.ues = new ArrayList<>();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(matricule, student.matricule);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matricule);
    }

    public List<UE> getUes() {
        return ues;
    }

    public void setUes(List<UE> ues) {
        this.ues = ues;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", lastname='" + lastname + '\'' +
                ", firstname='" + firstname + '\'' +
                ", matricule='" + matricule + '\'' +
                ", academicYear='" + academicYear + '\'' +
                ", section=" + section +
                ", ues=" + ues +
                '}';
    }
}
