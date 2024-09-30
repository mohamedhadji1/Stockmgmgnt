package stock.example.companyy.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stock.example.companyy.config.AutoIncrementUtil;
import stock.example.companyy.entities.Invoice;
import stock.example.companyy.services.InvoiceService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/factures")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class InvoiceController {
    @Autowired

    private final InvoiceService factureService;
    private AutoIncrementUtil autoIncrementUtil;

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getfactureById(@PathVariable int id) {
        Optional<Invoice> facture = factureService.getfactureById(id);
        return facture.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllfactures() {
        List<Invoice> factures = factureService.getAllfactures();
        return ResponseEntity.ok(factures);
    }

    @PostMapping
    public ResponseEntity<Invoice> createfacture(@RequestBody Invoice facture) {
        Invoice createdFacture = factureService.createfacture(facture);
        int id = autoIncrementUtil.getNextSequence("facture_sequence");
        return ResponseEntity.ok(createdFacture);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updatefacture(@PathVariable int id, @RequestBody Invoice facture) {
        facture.setId(id); // Ensure the ID from the URL is set in the facture
        try {
            Invoice updatedFacture = factureService.updatefacture(facture);
            return ResponseEntity.ok(updatedFacture);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletefacture(@PathVariable int id) {
        try {
            factureService.deletefacture(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
