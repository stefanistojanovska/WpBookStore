package com.wp.bookstore.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Lob
    @Column(length = 6000)
    private String description;
    private int year;
    private int pagesNum;
    private String poster;
    @Column(name="bestseller")
    private boolean bestseller;
    private Double price;

    @ManyToMany
    @JoinTable(name = "author_book",
            joinColumns = @JoinColumn(name = "bookId"),
            inverseJoinColumns = @JoinColumn(name = "authorId"))
    private List<Author> authors;
    @ManyToMany
    @JoinTable(name = "category_book",
            joinColumns = @JoinColumn(name = "bookId"),
            inverseJoinColumns = @JoinColumn(name = "categoryId"))
    private List<Category> categories;

    public List<User> getWishList() {
        return wishList;
    }

    public List<User> getBooksCart() {
        return booksCart;
    }

    public void setBooksCart(List<User> booksCart) {
        this.booksCart = booksCart;
    }

    @ManyToMany
    @JoinTable(name = "users_cart",
            joinColumns = @JoinColumn(name = "bookId"),
            inverseJoinColumns = @JoinColumn(name = "userId"))
    private List<User> booksCart;

    @ManyToMany
    @JoinTable(name = "wishlists",
            joinColumns = @JoinColumn(name = "bookId"),
            inverseJoinColumns = @JoinColumn(name = "userId"))
    private List<User> wishList;
    @ManyToMany
    @JoinTable(name = "purchases",
            joinColumns = @JoinColumn(name = "bookId"),
            inverseJoinColumns = @JoinColumn(name = "userId"))
    private List<User> purchasedBy;

    public Book(Long id,String title,String description,int year,int pagesNum,String poster,boolean bestseller,Double price) {
        this.id=id;
        this.title=title;
        this.description=description;
        this.year=year;
        this.pagesNum=pagesNum;
        this.poster=poster;
        this.bestseller=bestseller;
        this.price=price;
    }

    public List<User> getPurchasedBy() {
        return purchasedBy;
    }

    public void setPurchasedBy(List<User> purchasedBy) {
        this.purchasedBy = purchasedBy;
    }

    public void setWishList(List<User> wishList) {
        this.wishList = wishList;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
