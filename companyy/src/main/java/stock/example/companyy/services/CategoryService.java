package stock.example.companyy.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import stock.example.companyy.config.AutoIncrementUtil;
import stock.example.companyy.entities.Category;
import stock.example.companyy.repositories.CategoryRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService implements IService<Category> {


    private final CategoryRepo repo;

    private AutoIncrementUtil autoIncrementUtil;
    @Override
    public Category Retrieve(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Category Create(Category category) {
        category.setId(autoIncrementUtil.getNextSequence("category_sequence"));
        return repo.save(category);
    }

    @Override
    public Category Update(Category T) {
        return repo.save(T);
    }

    @Override
    public void Delete(int id) {
        repo.deleteById(id);
    }

    @Override
    public List<Category> RetrieveAll() {
        return repo.findAll();
    }
}
