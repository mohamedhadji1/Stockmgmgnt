package stock.example.companyy.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stock.example.companyy.entities.Invoice;

import stock.example.companyy.repositories.InvoiceRepository;

import stock.example.companyy.config.AutoIncrementUtil;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository factureRepository;

    @Autowired
    private AutoIncrementUtil autoIncrementUtil;

    public List<Invoice> getAllfactures() {
        return factureRepository.findAll();
    }

    public Optional<Invoice> getfactureById(int id) {
        return factureRepository.findById(id);
    }

    public Invoice createfacture(Invoice facture) {
        facture.setId(autoIncrementUtil.getNextSequence("facture_sequence"));
        return factureRepository.save(facture);
    }

    public Invoice updatefacture(Invoice facture) {
        return factureRepository.save(facture);
    }

    public void deletefacture(int id) {
        factureRepository.deleteById(id);
    }
}
