package be.helha.groupeb3.entities;

import be.helha.groupeb3.storage.IEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
public class Section implements Serializable, IEntity<String> {

    @Id
    private String id;
    private String name;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Block> blocs;


    public Section() {
    }

    public Section(String id, String name, List<Block> blocks) {
        this.id = id;
        this.name = name;
        this.blocs = blocks;
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

    public List<Block> getBlocs() {
        return blocs;
    }

    public void setBlocs(List<Block> blocs) {
        this.blocs = blocs;
    }

    @Override
    public String toString() {
        return "Section{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", blocks=" + blocs +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Section section = (Section) o;
        return Objects.equals(id, section.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
