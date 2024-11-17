package stock.example.companyy.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import stock.example.companyy.config.AutoIncrementUtil;
import stock.example.companyy.entities.Role;
import stock.example.companyy.entities.User;
import stock.example.companyy.repositories.UserRepo;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AutoIncrementUtil autoIncrementUtil;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepo.findById(id);
    }

    public User createUser(User user) {
        user.setRole(Role.valueOf("Client"));
        user.setId(autoIncrementUtil.getNextSequence("user_sequence"));
        return userRepo.save(user);
    }

    public User updateUser(int id, User user) {
        return userRepo.findById(id).map(existingUser -> {
            if (user.getUsername() != null) existingUser.setUsername(user.getUsername());
            if (user.getEmail() != null) existingUser.setEmail(user.getEmail());
            if (user.getRole() != null) existingUser.setRole(user.getRole());
            if (user.getPassword() != null) existingUser.setPassword(user.getPassword());
            if (user.getNumtel() != 0) existingUser.setNumtel(user.getNumtel());
            return userRepo.save(existingUser);
        }).orElseGet(() -> {
            user.setId(id);
            return userRepo.save(user);
        });
    }

    public void deleteUser(int id) {
        userRepo.deleteById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

}