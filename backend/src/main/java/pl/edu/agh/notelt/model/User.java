package pl.edu.agh.notelt.model;

import org.assertj.core.util.Lists;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import java.util.List;

@Entity(name = "user")
public class User {
    @Column
    @Id
    @GeneratedValue
    private int id;

    @Column
    private String name;

    @Column(length = 3333)
    private String token;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_note", joinColumns = {@JoinColumn(name = "user_id")})
    private List<Note> notes;

    public User() {
        notes = Lists.newArrayList();
    }

    public User(String name) {
        this.name = name;
        notes = Lists.newArrayList();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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
