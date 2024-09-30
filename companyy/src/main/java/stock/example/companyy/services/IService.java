package stock.example.companyy.services;

import stock.example.companyy.entities.provider;

import java.util.List;
import java.util.Optional;

public interface IService<T> {

    T Retrieve(int id);

    T Create(T t);

    T Update(T T);

    void Delete(int id);

    List<T> RetrieveAll();
}
