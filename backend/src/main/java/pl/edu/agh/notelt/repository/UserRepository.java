package pl.edu.agh.notelt.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.model.User;

@Transactional
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByName(String name);

    User findById(Integer userId);

    void removeUserByName(String name);

    User findUserByNotesContains(Note note);
}
