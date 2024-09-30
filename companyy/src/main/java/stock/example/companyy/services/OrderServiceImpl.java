package stock.example.companyy.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import stock.example.companyy.config.AutoIncrementUtil;
import stock.example.companyy.entities.Order;
import stock.example.companyy.repositories.OrderRepo;

import java.util.List;


@AllArgsConstructor
@Service
public class OrderServiceImpl implements  IService<Order> {


    private final OrderRepo repo;

    private AutoIncrementUtil autoIncrementUtil;
    @Override
    public Order Retrieve(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Order Create(Order order) {
        order.setId(autoIncrementUtil.getNextSequence("order_sequence"));
        return repo.save(order);
    }

    @Override
    public Order Update(Order T) {

        return repo.save(T);
    }

    @Override
    public void Delete(int id) {
        repo.deleteById(id);
    }

    @Override
    public List<Order> RetrieveAll() {
        return repo.findAll();
    }
}
