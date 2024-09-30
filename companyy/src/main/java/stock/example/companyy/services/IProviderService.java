package stock.example.companyy.services;

import stock.example.companyy.entities.product;
import stock.example.companyy.entities.provider;

import java.util.List;
import java.util.Optional;

public interface IProviderService {
    Optional<provider> getproviderById(int id);

    provider createprovider(provider provider);

    provider updateprovider(provider provider);

    void deleteprovider(int id);

    List<provider> getAllproviders();
}
