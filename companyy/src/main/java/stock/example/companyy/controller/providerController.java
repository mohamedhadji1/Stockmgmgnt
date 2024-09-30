package stock.example.companyy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stock.example.companyy.entities.provider;
import stock.example.companyy.services.ProviderService;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class providerController {
    @Autowired

    private final ProviderService providerService;

    @GetMapping("/{id}")
    public ResponseEntity<provider> getproviderById(@PathVariable int id) {
        Optional<provider> provider = providerService.getproviderById(id);
        return provider.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<provider>> getAllproviders() {
        List<provider> providers = providerService.getAllproviders();
        return ResponseEntity.ok(providers);
    }

    @PostMapping
    public ResponseEntity<provider> createprovider(@RequestBody provider provider) {
        provider createdProvider = providerService.createprovider(provider);
        return ResponseEntity.ok(createdProvider);
    }

    @PutMapping("/{id}")
    public ResponseEntity<provider> updateprovider(@PathVariable int id, @RequestBody provider provider) {
        provider.setId(id); // Ensure the ID from the URL is set in the provider
        try {
            provider updatedProvider = providerService.updateprovider(provider);
            return ResponseEntity.ok(updatedProvider);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteprovider(@PathVariable int id) {
        try {
            providerService.deleteprovider(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
