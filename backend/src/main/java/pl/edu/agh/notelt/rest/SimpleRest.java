package pl.edu.agh.notelt.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class SimpleRest {

    @GetMapping("/")
    public String test() {
        return "Hello world";
    }
}