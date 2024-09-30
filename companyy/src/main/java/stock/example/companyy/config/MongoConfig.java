package stock.example.companyy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "stock.example.companyy.repositories")
public class MongoConfig {
    // Additional MongoDB configuration if necessary
}
