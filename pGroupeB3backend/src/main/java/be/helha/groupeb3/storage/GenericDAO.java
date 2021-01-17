package be.helha.groupeb3.storage;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Stateless
public class GenericDAO {

    @PersistenceContext(unitName = "groupeB3JTA")
    private EntityManager manager;
    
    /**
     * Find all entities
     * @param <TEntity> : type of the data
     * @param klass : name of the variable, which represent the class used
     * @return : a list of entities (of type TEntity)
     */
    public <TEntity> List<TEntity> findAll(Class<TEntity> klass) {
        var queryString = "select entity from " + klass.getName() + " entity";

        return manager.createQuery(queryString).getResultList();
    }

    /**
     * Return an entity by the id
     * @param <TEntity> : type of the data
     * @param klass : name of the variable, which represent the class used
     * @param id : id of the object
     * @return : an entity (of type TEntity)
     */
    public <TEntity> TEntity findById(Class<TEntity> klass, Object id) {
        return manager.find(klass, id);
    }

    /**
     * Return entities compared to the field passed in parameter
     * @param <TEntity> : type of the data
     * @param klass : name of the variable, which represent the class used
     * @param field : name of the field in the database
     * @param value : value of the field researched
     * @return : a list of entities (of type TEntity)
     */
    public <TEntity> List<TEntity> findAllByField(Class<TEntity> klass, String field, Object value) {
        String request = "select entity from " + klass.getName() + " entity where entity." + field + "=?1";

        TypedQuery<TEntity> query = manager.createQuery(request, klass);
        query.setParameter(1, value);

        return query.getResultList();
    }

    /**
     * Add an entity
     * @param <TEntity> : type of the data
     * @param klass : name of the variable, which represent the class used
     * @param entity : the entity that'll be added 
     * @return : the entity added (of type TEntity)
     */
    public <TEntity extends IEntity> TEntity add(Class<TEntity> klass, TEntity entity) {
        if (entity == null) {
            return null;
        }

        if (entity.getId() != null && findById(klass, entity.getId()) != null) {
            return null;
        }

        manager.persist(entity);
        return entity;
    }

    /**
     * Add an entity without checking the id
     * @param <TEntity> : type of the data
     * @param klass : name of the variable, which represent the class used
     * @param entity : the entity that'll be added 
     * @return : the entity added (of type TEntity)
     */
    public <TEntity extends IEntity> TEntity addFastAndUnsafe(Class<TEntity> klass, TEntity entity) {
        if (entity == null) {
            return null;
        }

        manager.persist(entity);

        return entity;
    }

    /**
     * Update an entity with the new entity passed in parameter
     * @param <TEntity> : type of the data
     * @param klass : name of the variable, which represent the class used
     * @param oldEntity : the entity that will be replaced by the new one
     * @param newEntity : the new entity that'll replace the old one
     * @return : a boolean (true or false)
     */
    public <TEntity extends IEntity> Boolean update(Class<TEntity> klass, TEntity oldEntity, TEntity newEntity) {
        if (oldEntity == null || newEntity == null) {
            return false;
        }

        TEntity entity = findById(klass, oldEntity.getId());
        manager.clear();

        if (entity == null) {
            return false;
        }

        entity = newEntity;
        entity.setId(oldEntity.getId());
        manager.merge(entity);


        return true;
    }

    /**
     * Update an entity
     * @param <TEntity> : type of the data
     * @param klass : name of the variable, which represent the class used
     * @param entity : the entity that'll be updated 
     * @return : a boolean (true or false)
     */
    public <TEntity extends IEntity> Boolean update(Class<TEntity> klass, TEntity entity) {

        TEntity ent= findById(klass, entity.getId());
        manager.clear();

        return update(klass, ent, entity);
    }

    /**
     * Remove an entity
     * @param <TEntity> : type of the data
     * @param klass : name of the variable, which represent the class used
     * @param entity : the entity that'll be updated 
     * @return : a boolean (true or false)
     */
    public <TEntity extends IEntity> boolean remove(Class<TEntity> klass, TEntity entity) {
        TEntity isIn = findById(klass, entity.getId());

        if (isIn == null) {
            return false;
        }

        manager.remove(isIn);
        return true;
    }
}
