package pl.edu.agh.notelt.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("${path.user}")
public class UserRest {
    private static final String INTEGER_REGEX = "\\d{1,9}";

    private final Logger logger = Logger.getLogger(UserRest.class.toString());
    private final UserService userService;
    private final NoteService noteService;

    @Autowired
    public UserRest(UserService userService, NoteService noteService) {
        this.userService = userService;
        this.noteService = noteService;
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}/notes", method = RequestMethod.GET)
    public ResponseEntity<List<Note>> getUserNotes(@PathVariable("userId") String userId, @RequestHeader(value = "Authorization") String token) {
        if (!userId.matches(INTEGER_REGEX)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        final int id = Integer.parseInt(userId);
        final Optional<User> userOptional = userService.getUserById(id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        final User user = userOptional.get();
        if (!user.getToken().equals(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(user.getNotes(), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(path = "/token", method = RequestMethod.GET)
    public ResponseEntity<Integer> addToken(@RequestHeader(value = "Authorization") String token) {
        final String urlString = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token;
        try {
            final URL url = new URL(urlString);
            final HttpURLConnection con = (HttpURLConnection) url.openConnection();

            // By default it is GET request
            con.setRequestMethod("GET");

            final int responseCode = con.getResponseCode();
            if (responseCode == 200) {

                // Reading response from input Stream
                final BufferedReader in = new BufferedReader(
                        new InputStreamReader(con.getInputStream()));
                String output;
                final StringBuilder response = new StringBuilder();

                while ((output = in.readLine()) != null) {
                    response.append(output);
                }
                in.close();
                //CHECKSTYLE:OFF
                final HashMap<String, Object> result =
                        new ObjectMapper().readValue(response.toString(), HashMap.class);
                //CHECKSTYLE:ON
                final String email = result.get("email").toString();
                if (!userService.getUserByName(email).isPresent()) {
                    userService.saveUser(new User(email));
                }
                final User user = userService.getUserByName(email).get();
                user.setToken(token);
                userService.saveUser(user);
                return new ResponseEntity<>(user.getId(), HttpStatus.OK);
            }
        } catch (IOException e) {
            logger.log(Level.INFO, e.toString());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}/notes", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addNoteToUser(@PathVariable("userId") String userId, @RequestBody Map<String, String> newNote,
                                        @RequestHeader(value = "Authorization") String token) {
        if (!userId.matches(INTEGER_REGEX)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final int id = Integer.parseInt(userId);
        final Optional<User> userOptional = userService.getUserById(id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final User user = userOptional.get();
        if (!user.getToken().equals(token)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        final String title = newNote.getOrDefault("title", null);
        final String content = newNote.getOrDefault("content", null);
        if (title == null || content == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        final Note note = new Note(title, content);
        noteService.saveNote(note);
        user.addNote(note);
        userService.saveUser(user);
        return new ResponseEntity(HttpStatus.OK);
    }
}
