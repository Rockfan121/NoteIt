package pl.edu.agh.notelt.service;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.repository.NoteRepository;

import java.util.List;

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
        List<Note> res = Lists.newArrayList();
        noteRepository.findAll().forEach(res::add);
        return res;
    }
}
