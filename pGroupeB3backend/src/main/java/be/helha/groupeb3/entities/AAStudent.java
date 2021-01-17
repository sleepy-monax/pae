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
    private boolean inPAE;

    public AAStudent() {
    }

    public AAStudent(String ref, String examen, double result, boolean inPAE) {
        this.ref = ref;
        this.examen = examen;
        this.result = result;
        this.inPAE = inPAE;
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

    public boolean isInPAE() {
        return inPAE;
    }

    public void setInPAE(boolean inPAE) {
        this.inPAE = inPAE;
    }

    @Override
    public String toString() {
        return "AAStudent{" +
                "id=" + id +
                ", ref='" + ref + '\'' +
                ", examen='" + examen + '\'' +
                ", result=" + result +
                ", inPAE=" + inPAE +
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
