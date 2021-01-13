package be.helha.groupeb3.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Activity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String label;

    @Column(name = "nb_credits")
    private int nbCredits;

    @Enumerated(EnumType.STRING)
    private Section section;

    public Activity() {
    }

    public Activity(String intitule, int nbCredits, Section section) {
        this.label = intitule;
        this.nbCredits = nbCredits;
        this.section = section;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String intitule) {
        this.label = intitule;
    }

    public int getNbCredits() {
        return nbCredits;
    }

    public void setNbCredits(int nbCredits) {
        this.nbCredits = nbCredits;
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
        Activity activity = (Activity) o;
        return Objects.equals(label, activity.label) && section == activity.section;
    }

    @Override
    public int hashCode() {
        return Objects.hash(label, section);
    }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", intitule='" + label + '\'' +
                ", nbCredits=" + nbCredits +
                ", section=" + section +
                '}';
    }
}
