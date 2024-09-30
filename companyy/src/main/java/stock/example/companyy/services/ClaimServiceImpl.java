package stock.example.companyy.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import stock.example.companyy.entities.Claim;
import stock.example.companyy.repositories.ClaimRepo;

import java.util.List;

@AllArgsConstructor
@Service
public class ClaimServiceImpl implements IService<Claim> {

    private final ClaimRepo repo;

    @Override
    public Claim Retrieve(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Claim Create(Claim claim) {
        return repo.save(claim);
    }

    @Override
    public Claim Update(Claim T) {
        return repo.save(T);
    }

    @Override
    public void Delete(int id) {
        repo.deleteById(id);
    }

    @Override
    public List<Claim> RetrieveAll() {
        return repo.findAll();
    }
}
