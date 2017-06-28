package pl.edu.agh.notelt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.repository.NoteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    private NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public void saveNote(Note note) {
        noteRepository.save(note);
    }

    public List<Note> getNotes() {
        return noteRepository.findAll();
    }

    public Optional<Note> getNote(int id) {
        return Optional.ofNullable(noteRepository.findById(id));
    }

    public void removeNote(Note note) {
        noteRepository.removeNoteById(note.getId());
    }
}
