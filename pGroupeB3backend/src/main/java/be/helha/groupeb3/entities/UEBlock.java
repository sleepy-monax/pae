package be.helha.groupeb3.entities;

import be.helha.groupeb3.storage.IEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
public class UEBlock implements Serializable, IEntity<String> {

    @Id
    private String id;
    private String name;
    private int credits;
    private boolean optional;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<AABlock> aas;


    public UEBlock() {
    }

    public UEBlock(String id, String name, int credits, boolean optional, List<AABlock> aas) {
        this.id = id;
        this.name = name;
        this.credits = credits;
        this.optional = optional;
        this.aas = aas;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public boolean isOptional() {
        return optional;
    }

    public void setOptional(boolean optional) {
        this.optional = optional;
    }

    public List<AABlock> getAas() {
        return aas;
    }

    public void setAas(List<AABlock> aas) {
        this.aas = aas;
    }


    @Override
    public String toString() {
        return "UEBlock{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", credits=" + credits +
                ", optional=" + optional +
                ", aas=" + aas +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UEBlock ueBlock = (UEBlock) o;
        return Objects.equals(id, ueBlock.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
