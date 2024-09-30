package stock.example.companyy.controller;

import stock.example.companyy.entities.product; // Correct the import statement to match the entity name
import stock.example.companyy.services.ProductService; // Correct the import statement to match the service name
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class ProductController {
    @Autowired
    private final ProductService productService; // Correct the service name to match the class name

    @GetMapping("/{id}")
    public ResponseEntity<Optional<product>> getproductById(@PathVariable int id) { // Correct the entity name
        Optional<product> product = productService.getProductById(id); // Correct the entity name and method
        return ResponseEntity.ok(product);
    }

    @GetMapping
    public ResponseEntity<List<product>> getAllProducts() { // Correct the entity name
        List<product> products = productService.getAllproducts(); // Correct the entity name and method
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<product> createProduct(@RequestBody product product) { // Correct the entity name
        product createdProduct = productService.createproduct(product); // Correct the entity name and method
        return ResponseEntity.ok(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<product> updateProduct(@PathVariable int id, @RequestBody product product) {
        // Set the ID from the URL into the product object
        product.setId(id);

        // Call the service method to update the product
        product updatedProduct = productService.updateproduct(product);

        // Return the updated product
        return ResponseEntity.ok(updatedProduct);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) { // Correct the parameter type to match the service method
        productService.deleteproduct(id); // Correct the method and parameter type
        return ResponseEntity.noContent().build();
    }
}
