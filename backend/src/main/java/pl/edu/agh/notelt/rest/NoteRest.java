package pl.edu.agh.notelt.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.model.User;
import pl.edu.agh.notelt.service.NoteService;
import pl.edu.agh.notelt.service.UserService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("${path.note}")
public class NoteRest {
    private static final String INTEGER_REGEX = "\\d{1,9}";

    private final UserService userService;
    private final NoteService noteService;

    @Autowired
    public NoteRest(UserService userService, NoteService noteService) {
        this.userService = userService;
        this.noteService = noteService;
    }

    @CrossOrigin
    @RequestMapping(path = "/{noteId}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateNote(@PathVariable("noteId") String noteId,
                                     @RequestBody Map<String, String> newNote,
                                     @RequestHeader(value = "Authorization") String token) {
        if (!noteId.matches(INTEGER_REGEX)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final int id = Integer.parseInt(noteId);
        final Optional<Note> noteOptional = noteService.getNote(id);
        if (!noteOptional.isPresent()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final String title = newNote.getOrDefault("title", null);
        final String content = newNote.getOrDefault("content", null);
        final String userStrId = newNote.getOrDefault("userId", null);
        if (title == null || content == null || userStrId == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        if (!userStrId.matches(INTEGER_REGEX)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final int userId = Integer.parseInt(userStrId);
        final Optional<User> userOptional = userService.getUserById(userId);
        if (!userOptional.isPresent()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final User user = userOptional.get();
        if (!user.getToken().equals(token)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        final Note note = noteOptional.get();
        if (user.getNotes().contains(note)) {
            note.setTitle(title);
            note.setContent(content);
            noteService.saveNote(note);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @CrossOrigin
    @RequestMapping(path = "/{noteId}", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteNote(@PathVariable("noteId") String noteId,
                                     @RequestBody Map<String, String> userData,
                                     @RequestHeader(value = "Authorization") String token) {
        if (!noteId.matches(INTEGER_REGEX)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final int id = Integer.parseInt(noteId);
        final Optional<Note> noteOptional = noteService.getNote(id);
        if (!noteOptional.isPresent()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final String userStrId = userData.getOrDefault("userId", null);
        if (userStrId == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        if (!userStrId.matches(INTEGER_REGEX)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final int userId = Integer.parseInt(userStrId);
        final Optional<User> userOptional = userService.getUserById(userId);
        if (!userOptional.isPresent()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final User user = userOptional.get();
        if (!user.getToken().equals(token)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        final Note note = noteOptional.get();
        if (user.getNotes().contains(note)) {
            user.getNotes().remove(note);
            userService.saveUser(user);
            noteService.removeNote(note);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
