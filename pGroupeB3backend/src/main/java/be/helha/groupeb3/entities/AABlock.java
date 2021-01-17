package be.helha.groupeb3.entities;

import be.helha.groupeb3.storage.IEntity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class AABlock implements Serializable, IEntity<String> {

    @Id
    private String id;
    private String name;
    private int credits;

    public AABlock() {
    }

    public AABlock(String id, String name, int credits) {
        this.id = id;
        this.name = name;
        this.credits = credits;
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

    @Override
    public String toString() {
        return "AABlock{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", credits=" + credits +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AABlock aaBlock = (AABlock) o;
        return Objects.equals(id, aaBlock.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
