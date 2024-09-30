package stock.example.companyy.controller;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import stock.example.companyy.entities.Category;
import stock.example.companyy.entities.Order;
import stock.example.companyy.services.OrderServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class OrderController {

    private final OrderServiceImpl serv;

    @GetMapping("/show/{id}")
    public Order Retrieve(@PathVariable int id) {
        return serv.Retrieve(id);
    }

    @GetMapping("/show")
    public List<Order> getAll() {
        return serv.RetrieveAll();
    }

    @PostMapping("/create")
    public Order Create(@RequestBody Order order) {
        return serv.Create(order);
    }

    @PutMapping("/update")
    public Order Update(@RequestBody Order order) {
        return serv.Update(order);
    }

    @DeleteMapping("/{id}")
    public void Delete(@PathVariable int id) {
        serv.Delete(id);
    }
}
