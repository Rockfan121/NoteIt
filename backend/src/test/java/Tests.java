import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import pl.edu.agh.notelt.Application;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.model.User;
import pl.edu.agh.notelt.service.NoteService;
import pl.edu.agh.notelt.service.UserService;

import java.util.Optional;

import static junit.framework.TestCase.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {Application.class})
public class Tests {

    @Autowired
    private NoteService noteService;

    @Autowired
    private UserService userService;

    private final User user = new User("name");
    private final String username = "name";

    @Before
    public void setData() {
        assertNotNull(noteService);
        assertNotNull(userService);
        assertEquals(0, user.getNotes().size());
        assertEquals(false, userService.getUserByName("name").isPresent());
        userService.saveUser(user);
        assertEquals(true, userService.getUserByName("name").isPresent());
    }

    @Test
    public void saveUserTest() {
        userService.saveUser(user);
        assertEquals(true, userService.getUserByName("name").isPresent());
    }

    @Test
    public void addNote() {
        Optional<User> userOptional = userService.getUserByName(username);
        assertTrue(userOptional.isPresent());
        User user = userOptional.get();
        assertEquals(0, user.getNotes().size());
        Note note = defaultNote();
        user.addNote(note);
        userService.saveUser(user);
        userOptional = userService.getUserByName(username);
        assertTrue(userOptional.isPresent());
        user = userOptional.get();
        assertEquals(1, user.getNotes().size());
    }

    @Test
    public void addManyNotesAndRemove() {
        Optional<User> userOptional = userService.getUserByName(username);
        assertTrue(userOptional.isPresent());
        User user = userOptional.get();
        assertEquals(0, user.getNotes().size());
        Note note = defaultNote();
        user.addNote(note);
        note = defaultNote();
        user.addNote(note);
        userService.saveUser(user);

        userOptional = userService.getUserByName(username);
        assertTrue(userOptional.isPresent());
        user = userOptional.get();
        assertEquals(2, user.getNotes().size());
        note = user.getNotes().get(0);
        user.getNotes().remove(note);
        userService.saveUser(user);

        userOptional = userService.getUserByName(username);
        assertTrue(userOptional.isPresent());
        user = userOptional.get();
        assertEquals(1, user.getNotes().size());
    }

    @Test
    public void changeNoteContent() {
        Optional<User> userOptional = userService.getUserByName(username);
        assertTrue(userOptional.isPresent());
        User user = userOptional.get();
        assertEquals(0, user.getNotes().size());
        Note note = defaultNote();
        user.addNote(note);
        userService.saveUser(user);

        userOptional = userService.getUserByName(username);
        assertTrue(userOptional.isPresent());
        user = userOptional.get();
        assertEquals(1, user.getNotes().size());

        note = user.getNotes().get(0);
        assertEquals("c", note.getContent());
        note.setContent("new");
        noteService.saveNote(note);

        userOptional = userService.getUserByName(username);
        assertTrue(userOptional.isPresent());
        user = userOptional.get();
        assertEquals(1, user.getNotes().size());

        note = user.getNotes().get(0);
        assertEquals("new", note.getContent());
    }

    @After
    public void cleanup() {
        user.getNotes().forEach(n -> {
            noteService.removeNote(n);
        });
        userService.removeUser(user.getName());
    }

    private Note defaultNote() {
        return new Note("t", "c");
    }
}
