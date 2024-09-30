package stock.example.companyy.controller;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import stock.example.companyy.entities.Claim;
import stock.example.companyy.services.ClaimServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/claim")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class ClaimController {


    private final ClaimServiceImpl serv;


    @GetMapping("/show/{id}")
    public Claim Retrieve(@PathVariable int id) {
        return serv.Retrieve(id);
    }

    @GetMapping("/show")
    public List<Claim> getAll() {
        return serv.RetrieveAll();
    }

    @PostMapping("/create")
    public Claim Create(@RequestBody Claim claim) {
        return serv.Create(claim);
    }

    @PutMapping("/update")
    public Claim Update(@RequestBody Claim claim) {
        return serv.Update(claim);
    }

    @DeleteMapping("/{id}")
    public void Delete(@PathVariable int id) {
        serv.Delete(id);
    }
}
