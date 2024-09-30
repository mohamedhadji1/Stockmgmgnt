package stock.example.companyy.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stock.example.companyy.entities.Category;
import stock.example.companyy.entities.Invoice;
import stock.example.companyy.services.CategoryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService serv;

    @GetMapping("/show/{id}")
    public Category Retrieve(@PathVariable int id) {
        return serv.Retrieve(id);
    }

    @GetMapping("/show")
    public List<Category> getAll() {
        return serv.RetrieveAll();
    }

    @PostMapping("/create")
    public Category Create(@RequestBody Category category) {
        return serv.Create(category);
    }

    @PutMapping("/update")
    public Category Update(@RequestBody Category category) {
        return serv.Update(category);
    }

    @DeleteMapping("/{id}")
    public String Delete(@PathVariable int id) {

        serv.Delete(id);
        return "Deleted";
    }
}
