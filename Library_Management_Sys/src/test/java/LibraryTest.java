import org.example.Book;
import org.example.Library;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class LibraryTest {

    @Test
    public void testAddBook(){
        Library library = new Library();
        Book book = new Book("Title1", "Author1", "ISBN1", "Genre1", 2020, "Dept1", true);
        library.addBook(book);
        assertEquals(1, library.listAllBooks().size());
        assertEquals("ISBN1", library.listAllBooks().get(0).getISBN());
    }

    @Test
    public void testRemoveBook(){
        Library library = new Library();
        Book book = new Book("Title1", "Author1", "ISBN1", "Genre1", 2020, "Dept1", true);
        library.addBook(book);
        library.removeBook("ISBN1");
        assertEquals(0, library.listAllBooks().size());
    }

    @Test
    public void testFindBookByTitle(){
        Library library = new Library();
        Book book1 = new Book("Title1", "Author1", "ISBN1", "Genre1", 2020, "Dept1", true);
        Book book2 = new Book("Title1", "Author2", "ISBN2", "Genre2", 2021, "Dept2", false);
        library.addBook(book1);
        library.addBook(book2);

        List<Book> foundBooks = library.findBookByTitle("Title1");
        assertEquals(2, foundBooks.size());
    }

    @Test
    public void testFindBookByAuthor(){
        Library library = new Library();
        Book book1 = new Book("Title1", "Author1", "ISBN1", "Genre1", 2020, "Dept1", true);
        Book book2 = new Book("Title2", "Author1", "ISBN2", "Genre2", 2021, "Dept2", false);
        library.addBook(book1);
        library.addBook(book2);

        List<Book> foundBooks = library.findBookByAuthor("Author1");
        assertEquals(2, foundBooks.size());
    }

    @Test
    public void testListAllBooks() {
        Library library = new Library();
        Book book = new Book("Title1", "Author1", "ISBN1", "Genre1", 2020, "Dept1", true);
        library.addBook(book);

        List<Book> books = library.listAllBooks();
        assertEquals(1, books.size());
    }

    @Test
    public void testListAvailableBooks() {
        Library library = new Library();
        Book book1 = new Book("Title1", "Author1", "ISBN1", "Genre1", 2020, "Dept1", true);
        Book book2 = new Book("Title2", "Author2", "ISBN2", "Genre2", 2021, "Dept2", false);
        library.addBook(book1);
        library.addBook(book2);

        List<Book> availableBooks = library.listAvailableBooks();
        assertEquals(1, availableBooks.size());
        assertTrue(availableBooks.get(0).isAvailability());
    }
}
