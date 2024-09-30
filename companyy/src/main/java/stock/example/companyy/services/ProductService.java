package stock.example.companyy.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stock.example.companyy.entities.product;
import stock.example.companyy.repositories.ProductRepository;
import stock.example.companyy.config.AutoIncrementUtil;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AutoIncrementUtil autoIncrementUtil;

    public List<product> getAllproducts() {
        return productRepository.findAll();
    }

    public Optional<product> getProductById(int id) {
        return productRepository.findById(id);
    }

    public product createproduct(product product) {
        product.setId(autoIncrementUtil.getNextSequence("product_sequence"));
        return productRepository.save(product);
    }

    public product updateproduct(product product) {
        return productRepository.save(product);
    }

    public void deleteproduct(int id) {
        productRepository.deleteById(id);
    }
}
