package stock.example.companyy.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stock.example.companyy.entities.provider;
import stock.example.companyy.repositories.providerRepository;
import stock.example.companyy.config.AutoIncrementUtil;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {

    @Autowired
    private providerRepository providerRepository;

    @Autowired
    private AutoIncrementUtil autoIncrementUtil;

    public List<provider> getAllproviders() {
        return providerRepository.findAll();
    }

    public Optional<provider> getproviderById(int id) {
        return providerRepository.findById(id);
    }

    public provider createprovider(provider provider) {
        provider.setId(autoIncrementUtil.getNextSequence("provider_sequence"));
        return providerRepository.save(provider);
    }

    public provider updateprovider(provider provider) {
        return providerRepository.save(provider);
    }

    public void deleteprovider(int id) {
        providerRepository.deleteById(id);
    }
}
