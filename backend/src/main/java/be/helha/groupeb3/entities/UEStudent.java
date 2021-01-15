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
    private String ref,examen, bloc;
    private double result;
    private boolean validated, inPAE;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<AAStudent> aas;


    public UEStudent() {
    }

    public UEStudent(String ref, String examen, String bloc, double result, boolean validated, boolean inPAE, List<AAStudent> aas) {
        this.ref = ref;
        this.examen = examen;
        this.bloc = bloc;
        this.result = result;
        this.validated = validated;
        this.inPAE = inPAE;
        this.aas = aas;
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

    public String getBloc() {
        return bloc;
    }

    public void setBloc(String bloc) {
        this.bloc = bloc;
    }

    public boolean isInPAE() {
        return inPAE;
    }

    public void setInPAE(boolean inPAE) {
        this.inPAE = inPAE;
    }

    @Override
    public String toString() {
        return "UEStudent{" +
                "id=" + id +
                ", ref='" + ref + '\'' +
                ", examen='" + examen + '\'' +
                ", bloc='" + bloc + '\'' +
                ", result=" + result +
                ", validated=" + validated +
                ", inPAE=" + inPAE +
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
