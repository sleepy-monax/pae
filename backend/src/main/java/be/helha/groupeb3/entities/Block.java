package be.helha.groupeb3.entities;

import be.helha.groupeb3.storage.IEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
public class Block implements Serializable, IEntity<String> {

    @Id
    private String id;

    private String name;

    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<UEBlock> ues;

    public Block() {
    }

    public Block(String id, String name, List<UEBlock> ues) {
        this.id = id;
        this.name = name;
        this.ues = ues;
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

    public List<UEBlock> getUes() {
        return ues;
    }

    public void setUes(List<UEBlock> ues) {
        this.ues = ues;
    }

    @Override
    public String toString() {
        return "Block{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", ues=" + ues +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Block block = (Block) o;
        return Objects.equals(id, block.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
