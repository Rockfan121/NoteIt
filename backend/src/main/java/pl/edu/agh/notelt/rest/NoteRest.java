package pl.edu.agh.notelt.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.service.NoteService;

import java.util.List;

@RestController
@RequestMapping("${path.note}")
public class NoteRest {
    private final NoteService noteService;

    @Autowired
    public NoteRest(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    @CrossOrigin(value = "http://localhost:3000")
    public List<Note> getTopics(@RequestHeader(value = "Authorization") String token) {
        return noteService.getNotes();
    }
}
