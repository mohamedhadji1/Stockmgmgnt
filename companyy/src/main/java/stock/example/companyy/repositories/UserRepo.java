package stock.example.companyy.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import stock.example.companyy.entities.User;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User, Integer> {

    @Query("{ 'email': ?0 }") // Custom query to find user by email
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);

}
