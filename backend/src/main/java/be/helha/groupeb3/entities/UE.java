package be.helha.groupeb3.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class UE implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int identification, nbCredits;
    private String label;

    @Column(name = "academic_year")
    private String academicYear;

    @Enumerated(EnumType.STRING)
    private Section section;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Activity> activities;

    public UE() {
    }

    public UE(int identification, int nbCredits, String label, String academicYear, Section section) {
        this.identification = identification;
        this.nbCredits = nbCredits;
        this.label = label;
        this.academicYear = academicYear;
        this.section = section;
        this.activities = new ArrayList<>();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdentification() {
        return identification;
    }

    public void setIdentification(int identification) {
        this.identification = identification;
    }

    public int getNbCredits() {
        return nbCredits;
    }

    public void setNbCredits(int nbCredits) {
        this.nbCredits = nbCredits;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
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

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UE ue = (UE) o;
        return identification == ue.identification && section == ue.section;
    }

    @Override
    public int hashCode() {
        return Objects.hash(identification, section);
    }

    @Override
    public String toString() {
        return "UE{" +
                "id=" + id +
                ", identification=" + identification +
                ", nbCredits=" + nbCredits +
                ", label='" + label + '\'' +
                ", academicYear='" + academicYear + '\'' +
                ", section=" + section +
                ", activities=" + activities +
                '}';
    }
}
