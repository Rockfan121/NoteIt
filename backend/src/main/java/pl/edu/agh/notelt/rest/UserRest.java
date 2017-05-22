package pl.edu.agh.notelt.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
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
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("${path.user}")
public class UserRest {
    private static final String NAME = "name";

    private final Logger logger = Logger.getLogger(UserRest.class.toString());
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
        final int id = Integer.parseInt(userId);
        return userService.getUserById(id);
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}/notes", method = RequestMethod.GET)
    public List<Note> getUserNotes(@PathVariable("userId") String userId, @RequestHeader(value = "Authorization") String token) {
        final int id = Integer.parseInt(userId);
        return userService.getUserById(id).getNotes();
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}/notes/{noteId}", method = RequestMethod.GET)
    public Note getUserNote(@PathVariable("userId") String userId, @PathVariable("noteId") String noteId) {
        final int id = Integer.parseInt(userId);
        final int note = Integer.parseInt(noteId);
        return userService.getUserById(id).getNotes().get(note);
    }

    @CrossOrigin
    @RequestMapping(path = "/new", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addUser(@RequestBody Map<String, String> newUser) {
        if (newUser.containsKey(NAME)) {
            final User user = new User(newUser.get(NAME));
            userService.saveUser(user);
        }
    }

    @CrossOrigin
    @RequestMapping(path = "/token", method = RequestMethod.GET)
    public int addToken(@RequestHeader(value = "Authorization") String token) {
        // System.out.println("------------------------------" + newUser.entrySet());
        //System.out.println("-==================" + token);
        // System.out.println(newUser.entrySet());
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
                // System.out.println(email);
                if (userService.getUserByName(email) == null) {
                    userService.saveUser(new User(email));
                }
                final User user = userService.getUserByName(email);
                user.setToken(token);
                userService.saveUser(user);
                return user.getId();
            }
        } catch (IOException e) {
            logger.log(Level.INFO, e.toString());
        }
        return -1;
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}/notes/new", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addNoteToUser(@PathVariable("userId") String userId, @RequestBody Map<String, String> newNote) {
        final int id = Integer.parseInt(userId);
        final String title = newNote.get("title");
        final String content = newNote.get("content");
        // System.out.println(newNote.entrySet());
        final Note note = new Note(title, content);
        noteService.saveNote(note);
        final User user = userService.getUserById(id);
        user.addNote(note);
        userService.saveUser(user);
    }
}
