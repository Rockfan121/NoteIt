package pl.edu.agh.notelt.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "note")
public class Note {
    @Column
    @Id
    @GeneratedValue
    private int id;

    @Column
    private String title;

    @Column(length = 5000)
    private String content;

    public Note() {
    }

    public Note(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
