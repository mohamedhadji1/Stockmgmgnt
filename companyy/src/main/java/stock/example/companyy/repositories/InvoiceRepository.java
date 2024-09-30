package stock.example.companyy.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import stock.example.companyy.entities.Invoice;

public interface InvoiceRepository extends MongoRepository<Invoice, Integer> {
}


/*package stock.example.companyy.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import stock.example.companyy.entities.facture;

public interface factureRepository extends MongoRepository<facture, Integer> {
}*/
