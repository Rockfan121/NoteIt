package pl.edu.agh.notelt.model;

import org.assertj.core.util.Lists;

import javax.persistence.*;
import java.util.List;

@Entity(name = "user")
public class User {
    @Column
    @Id
    @GeneratedValue
    private int id;

    @Column
    private String name;

    @OneToMany
    @JoinTable(name = "note", joinColumns = {@JoinColumn(name = "id")})
    private List<Note> notes;

    public User() {
        notes = Lists.emptyList();
    }

    public User(String name) {
        this.name = name;
        notes = Lists.emptyList();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public void addNote(Note note) {
        notes.add(note);
    }
}
