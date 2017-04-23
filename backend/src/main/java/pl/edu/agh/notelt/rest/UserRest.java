package pl.edu.agh.notelt.rest;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.notelt.model.Note;
import pl.edu.agh.notelt.model.User;
import pl.edu.agh.notelt.service.UserService;

import java.util.List;

@RestController
@RequestMapping("${path.user}")
public class UserRest {
    private final UserService userService;

    @Autowired
    public UserRest(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    @CrossOrigin(value = "http://localhost:3000")
    public List<Note> getUsers() {

        return Lists.newArrayList(new Note("temat", "test1"), new Note("temat2", "test2"));
    }

    @CrossOrigin
    @RequestMapping("/{userId}")
    public User getUser(@PathVariable("userId") String userId) {
        int id = Integer.parseInt(userId);
        return userService.getUserById(id);
    }

    @CrossOrigin
    @RequestMapping("/new/{name}")
    public void addUser(@PathVariable("name") String name) {
        User user = new User(name);
        userService.addUser(user);
    }

}
