package pl.edu.agh.notelt.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.agh.notelt.model.Note;

import java.util.List;

@Transactional
public interface NoteRepository extends CrudRepository<Note, Integer> {
    Note findById(Integer noteId);

    void removeNoteById(Integer noteId);

    List<Note> findAll();
}
