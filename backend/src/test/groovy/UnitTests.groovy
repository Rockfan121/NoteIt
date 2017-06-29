import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import pl.edu.agh.notelt.repository.NoteRepository
import pl.edu.agh.notelt.repository.UserRepository
import pl.edu.agh.notelt.rest.NoteRest
import pl.edu.agh.notelt.service.NoteService
import pl.edu.agh.notelt.service.UserService
import spock.lang.Specification
import spock.lang.Unroll

class UnitTests extends Specification {
    private NoteRest noteRest = new NoteRest(new UserService(Mock(UserRepository)), new NoteService(Mock(NoteRepository)))

    @Unroll
    "updateNote #caseName"() {
        expect:
        noteRest.updateNote(noteId as String, newNote, token) == expect

        where:
        caseName | noteId | newNote                    | token | expect
        "1"      | 1      | getNoteJSON("t", "c", "1") | ""    | new ResponseEntity(HttpStatus.BAD_REQUEST)
        "2"      | "sdf"  | getNoteJSON("t", "c", "1") | ""    | new ResponseEntity(HttpStatus.BAD_REQUEST)
        "3"      | "01"   | getNoteJSON("t", "c", "1") | ""    | new ResponseEntity(HttpStatus.BAD_REQUEST)

    }

    @Unroll
    "deleteNote #caseName"() {
        expect:
        noteRest.deleteNote(noteId as String, userStrId, token) == expect

        where:
        caseName | noteId | userStrId                    | token | expect
        "1"      | 1      | "" | ""    | new ResponseEntity(HttpStatus.BAD_REQUEST)
        "2"      | "sdf"  | "" | ""    | new ResponseEntity(HttpStatus.BAD_REQUEST)
        "3"      | "01"   | "" | ""    | new ResponseEntity(HttpStatus.BAD_REQUEST)

    }

    private static Map<String, String> getNoteJSON(String title, String content, String userId) {
        Map<String, String> resp = new HashMap<>()
        resp.put("title", title)
        resp.put("content", content)
        resp.put("userId", userId)
        return resp
    }
}