package pl.edu.agh.notelt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.model.User;
import pl.edu.agh.notelt.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserById(Integer id) {
        return Optional.ofNullable(userRepository.findById(id));
    }

    public Optional<User> getUserByName(String name) {
        return Optional.ofNullable(userRepository.findByName(name));
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void removeUser(String name) {
        userRepository.removeUserByName(name);
    }

    public User getOwner(Note note) {
        return userRepository.findUserByNotesContains(note);
    }
}
