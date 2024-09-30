package stock.example.companyy.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import stock.example.companyy.entities.product;


import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<product, Integer> {
}
