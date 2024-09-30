package stock.example.companyy.services;

import stock.example.companyy.entities.Invoice;

import java.util.List;
import java.util.Optional;

public interface IInvoiceService {
    Optional<Invoice> getInvoiceById(int    id);

    Invoice createInvoice(Invoice Invoice);

    Invoice updateInvoice(Invoice Invoice);

    void deleteInvoice(int id);

    List<Invoice> getAllInvoices();
}
