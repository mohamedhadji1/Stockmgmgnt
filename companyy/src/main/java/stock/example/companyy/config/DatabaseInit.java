package stock.example.companyy.config;


import stock.example.companyy.entities.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import stock.example.companyy.repositories.*;


@Component
public class DatabaseInit implements CommandLineRunner {
    private final InvoiceRepository factureRepository;
    private final ProductRepository productRepository;
    private final providerRepository providerRepository;

    private final UserRepo userrepo;
    private final OrderRepo orderRepo;

    private final ClaimRepo claimRepo;
    private final CategoryRepo categoryRepo;

    public DatabaseInit(InvoiceRepository factureRepository, ProductRepository productRepository, stock.example.companyy.repositories.providerRepository providerRepository, UserRepo userrepo, OrderRepo orderRepo, ClaimRepo claimRepo, CategoryRepo categoryRepo) {
        this.factureRepository = factureRepository;
        this.productRepository = productRepository;
        this.providerRepository = providerRepository;
        this.userrepo = userrepo;
        this.orderRepo = orderRepo;
        this.claimRepo = claimRepo;
        this.categoryRepo = categoryRepo;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            product product = new product();
            productRepository.save(product);
        }

        if (providerRepository.count() == 0) {
            provider provider = new provider();
            providerRepository.save(provider);
        }

        if (factureRepository.count() == 0) {
            Invoice facture = new Invoice();
            factureRepository.save(facture);
        }

        if( userrepo.count() == 0){
            User user = new User();
            userrepo.save(user);
        }

        if( orderRepo.count() == 0){
            Order order = new Order();
            orderRepo.save(order);
        }

        if( claimRepo.count() == 0){
            Claim claim = new Claim();
            claimRepo.save(claim);
        }

        if( categoryRepo.count() == 0){
            Category cate = new Category();
            categoryRepo.save(cate);
        }


    }
}

