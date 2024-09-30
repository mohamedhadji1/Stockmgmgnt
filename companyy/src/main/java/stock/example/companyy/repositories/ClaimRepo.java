package stock.example.companyy.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import stock.example.companyy.entities.Claim;

@Repository
public interface ClaimRepo extends MongoRepository<Claim, Integer> {
}
