package pl.edu.agh.notelt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.repository.NoteRepository;

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
}
