package pl.edu.agh.notelt.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.model.User;

@Transactional
public interface NoteRepository extends CrudRepository<Note, Integer> {
    User findById(Integer userId);

}
