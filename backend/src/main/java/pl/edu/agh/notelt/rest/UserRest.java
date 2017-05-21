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
    @RequestMapping(path = "/token", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public int addToken(@RequestBody Map<String, Object> newUser,
                        @RequestHeader(value = "Authorization") String token) {
        // System.out.println("------------------------------" + newUser.entrySet());
        System.out.println("-==================" + token);
        System.out.println(newUser.entrySet());
        String urlString = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token;
        try {
            URL url = new URL(urlString);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();

            // By default it is GET request
            con.setRequestMethod("GET");

            int responseCode = con.getResponseCode();
            if (responseCode == 200) {

                // Reading response from input Stream
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(con.getInputStream()));
                String output;
                StringBuffer response = new StringBuffer();

                while ((output = in.readLine()) != null) {
                    response.append(output);
                }
                in.close();


                HashMap<String, Object> result =
                        new ObjectMapper().readValue(response.toString(), HashMap.class);

                String email = result.get("email").toString();
                System.out.println(email);
                if (userService.getUserByName(email) == null) {
                    userService.saveUser(new User(email));
                }
                User user = userService.getUserByName(email);
                user.setToken(token);
                userService.saveUser(user);
                return user.getId();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return -1;
    }

    @CrossOrigin
    @RequestMapping(path = "/{userId}/notes/new", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addNoteToUser(@PathVariable("userId") String userId, @RequestBody Map<String, String> newNote) {
        int id = Integer.parseInt(userId);
        String title = newNote.get("title");
        String content = newNote.get("content");
        System.out.println(newNote.entrySet());
        Note note = new Note(title, content);
        noteService.saveNote(note);
        User user = userService.getUserById(id);
        user.addNote(note);
        userService.saveUser(user);
    }
}
