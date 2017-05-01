package pl.edu.agh.notelt.rest;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.model.User;
import pl.edu.agh.notelt.service.NoteService;
import pl.edu.agh.notelt.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${path.user}")
public class UserRest {
    private final UserService userService;
    private final NoteService noteService;

    @Autowired
    public UserRest(UserService userService, NoteService noteService) {
        this.userService = userService;
        this.noteService = noteService;
    }

    @GetMapping
    @CrossOrigin(value = "http://localhost:3000")
    public List<Note> getUsers() {

        return Lists.newArrayList(new Note("temat", "test1"), new Note("temat2", "test2"));
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}", method = RequestMethod.GET)
    public User getUser(@PathVariable("userId") String userId) {
        int id = Integer.parseInt(userId);
        return userService.getUserById(id);
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}/notes", method = RequestMethod.GET)
    public List<Note> getUserNotes(@PathVariable("userId") String userId) {
        int id = Integer.parseInt(userId);
        return userService.getUserById(id).getNotes();
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}/notes/{noteId}", method = RequestMethod.GET)
    public Note getUserNote(@PathVariable("userId") String userId, @PathVariable("noteId") String noteId) {
        int id = Integer.parseInt(userId);
        int note = Integer.parseInt(noteId);
        return userService.getUserById(id).getNotes().get(note);
    }

    @CrossOrigin
    @RequestMapping(path = "/new", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addUser(@RequestBody Map<String, String> newUser) {
        if (newUser.containsKey("name")) {
            User user = new User(newUser.get("name"));
            userService.saveUser(user);
        }
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}/notes/new", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addNoteToUser(@PathVariable("userId") String userId, @RequestBody Map<String, String> newNote) {
        int id = Integer.parseInt(userId);
        String title = newNote.get("title");
        String content = newNote.get("content");
        Note note = new Note(title, content);
        noteService.saveNote(note);
        User user = userService.getUserById(id);
        user.addNote(note);
        userService.saveUser(user);
    }
}
