package be.helha.groupeb3.storage;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

@Stateless
public class GenericEJB {

    @EJB
    private GenericDAO dao;

    //Find all entities
    public <TEntity> List<TEntity> findAll(Class<TEntity> klass) {
        return dao.findAll(klass);
    }

    //Return an entity by the id
    public <TEntity> TEntity findById(Class<TEntity> klass, Object id) {
        return dao.findById(klass, id);
    }

    //Return entities compared to the field passed in parameter
    public <TEntity> List<TEntity> findAllByField(Class<TEntity> klass, String field, Object value) {
        return dao.findAllByField(klass, field, value);
    }

    //Return the first entity found by calling the findAllByField function
    public <TEntity> TEntity findFirstByField(Class<TEntity> klass, String field, Object value) {
        var result = findAllByField(klass, field, value);

        if (result.size() > 0) {
            return result.get(0);
        } else {
            return null;
        }
    }

    //Add an entity
    public <TEntity extends IEntity> TEntity add(Class<TEntity> klass, TEntity entity) {
        return dao.add(klass, entity);
    }

    //Add an entity without checking the id
    public <TEntity extends IEntity> TEntity addFastAndUnsafe(Class<TEntity> klass, TEntity entity) {
        return dao.addFastAndUnsafe(klass, entity);
    }

    //Update an entity with the new entity passed in parameter
    public <TEntity extends IEntity> boolean update(Class<TEntity> klass, TEntity oldEntity, TEntity newEntity) {
        return dao.update(klass, oldEntity, newEntity);
    }

    //Update an entity
    public <TEntity extends IEntity> boolean update(Class<TEntity> klass, TEntity entity) {
        return dao.update(klass, entity);
    }

    //Remove an entity
    public <TEntity extends IEntity> boolean remove(Class<TEntity> klass, TEntity entity) {
        return dao.remove(klass, entity);
    }
}
