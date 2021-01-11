package be.helha.groupeb3.ejb;

import java.util.List;

import javax.ejb.Remote;

@Remote
public interface IRemote<T> {
	public List<T> findAll();
	public T findById(int id);
	
	public T add(T t);
	
	public void remove(T t);
	
	public void update(T t1, T t2);
}
