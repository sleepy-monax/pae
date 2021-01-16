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
    
    public <TEntity> List<TEntity> findAll(Class<TEntity> klass) {
        var queryString = "select entity from " + klass.getName() + " entity";

        return manager.createQuery(queryString).getResultList();
    }

    public <TEntity> TEntity findById(Class<TEntity> klass, Object id) {
        return manager.find(klass, id);
    }

    public <TEntity> List<TEntity> findAllByField(Class<TEntity> klass, String field, Object value) {
        String request = "select entity from " + klass.getName() + " entity where entity." + field + "=?1";

        TypedQuery<TEntity> query = manager.createQuery(request, klass);
        query.setParameter(1, value);

        return query.getResultList();
    }

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

    public <TEntity extends IEntity> TEntity addFastAndUnsafe(Class<TEntity> klass, TEntity entity) {
        if (entity == null) {
            return null;
        }

        manager.persist(entity);

        return entity;
    }

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

    public <TEntity extends IEntity> Boolean update(Class<TEntity> klass, TEntity entity) {

        TEntity ent= findById(klass, entity.getId());
        manager.clear();

        return update(klass, ent, entity);
    }

    public <TEntity extends IEntity> boolean remove(Class<TEntity> klass, TEntity entity) {
        TEntity isIn = findById(klass, entity.getId());

        if (isIn == null) {
            return false;
        }

        manager.remove(isIn);
        return true;
    }
}
