package be.helha.groupeb3.entities;

import be.helha.groupeb3.storage.IEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class AAStudent implements Serializable, IEntity<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String ref,examen;
    private double result;

    public AAStudent() {
    }

    public AAStudent(String ref, String examen, int result) {
        this.ref = ref;
        this.examen = examen;
        this.result = result;
    }

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getExamen() {
        return examen;
    }

    public void setExamen(String examen) {
        this.examen = examen;
    }

    public double getResult() {
        return result;
    }

    public void setResult(double result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "AAStudent{" +
                "id=" + id +
                ", ref='" + ref + '\'' +
                ", examen='" + examen + '\'' +
                ", result=" + result +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AAStudent aaStudent = (AAStudent) o;
        return Objects.equals(id, aaStudent.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
