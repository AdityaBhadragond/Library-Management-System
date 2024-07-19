package org.example;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Library {

    private List<Book> books;

    public Library(){
        this.books = new ArrayList<>();
    }

    public void addBook(Book book){
        for (Book b: books){
            if (b.getISBN().equals(book.getISBN())){
                System.out.println("Book with ISBN" + book.getISBN() + "already exists.");
                return;
            }
        }
        books.add(book);
        System.out.println("Book added:" + book);
    }

    public void removeBook(String ISBN){
        books.removeIf(book -> book.getISBN().equals(ISBN));
        System.out.println("Book with ISBN" + ISBN + "removed.");
    }

    public List<Book> findBookByTitle(String title){
        return books.stream()
                .filter(book -> book.getTitle().equalsIgnoreCase(title))
                .collect(Collectors.toList());
    }

    public List<Book> findBookByAuthor(String author){
        return books.stream()
                .filter(book -> book.getAuthor().equalsIgnoreCase(author))
                .collect(Collectors.toList());
    }

    public List<Book> listAllBooks(){
        return new ArrayList<>(books);
    }

    public List<Book> listAvailableBooks(){
        return books.stream()
                .filter(Book::isAvailability)
                .collect(Collectors.toList());
    }
}
