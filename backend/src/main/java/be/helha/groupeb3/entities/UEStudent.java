package be.helha.groupeb3.entities;

import be.helha.groupeb3.storage.IEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
public class UEStudent implements Serializable, IEntity<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String ref,examen;
    private double result;
    private boolean validated;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<AAStudent> aas;


    public UEStudent() {
    }

    public UEStudent(String ref, int result, String examen, boolean validated, List<AAStudent> activities) {
        this.ref = ref;
        this.result = result;
        this.examen = examen;
        this.validated = validated;
        this.aas = activities;
    }

    @Override
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public double getResult() {
        return result;
    }

    public void setResult(double result) {
        this.result = result;
    }

    public String getExamen() {
        return examen;
    }

    public void setExamen(String examen) {
        this.examen = examen;
    }

    public boolean isValidated() {
        return validated;
    }

    public void setValidated(boolean validated) {
        this.validated = validated;
    }

    public List<AAStudent> getAas() {
        return aas;
    }

    public void setAas(List<AAStudent> aas) {
        this.aas = aas;
    }

    @Override
    public String toString() {
        return "UEStudent{" +
                "id=" + id +
                ", ref='" + ref + '\'' +
                ", examen='" + examen + '\'' +
                ", result=" + result +
                ", validated=" + validated +
                ", aas=" + aas +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UEStudent ueStudent = (UEStudent) o;
        return Objects.equals(id, ueStudent.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
