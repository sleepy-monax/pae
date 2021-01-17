package be.helha.groupeb3.storage;

public interface IEntity<T> {
    T getId();

    void setId(T id);
}
