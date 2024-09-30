package stock.example.companyy.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import stock.example.companyy.entities.provider;

import java.util.List;

public interface providerRepository extends MongoRepository<provider, Integer> {

}
