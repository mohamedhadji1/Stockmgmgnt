package stock.example.companyy.services;

import stock.example.companyy.entities.product;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    Optional<product> getProductById(int id);

    product createproduct(product product);

    product updateproduct(product product);

    void deleteproduct(int id);

    List<product> getAllproducts();
}
