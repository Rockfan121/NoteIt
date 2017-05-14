package pl.edu.agh.notelt.rest;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public List<Note> getTopics() {
        return Lists.newArrayList(new Note("tytul1", "content1"), new Note("tytul2", "content2"));
    }
}
