package com.wp.bookstore.web;

import com.wp.bookstore.Models.*;
import com.wp.bookstore.Repository.AuthorRepository;
import com.wp.bookstore.Service.*;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = { "http://localhost:3000"})
/*@RequestMapping(path = "/", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)*/
public class BooksStoreController {

    private BookService bookService;
    private CategoryService categoryService;
    private AuthorService authorService;
    private UserService userService;
    private UserRoleService userRoleService;

    public BooksStoreController(BookService bookService, CategoryService categoryService, AuthorService authorService,UserService userService,UserRoleService userRoleService) {
        this.categoryService=categoryService;
        this.bookService = bookService;
        this.authorService=authorService;
        this.userService=userService;
        this.userRoleService=userRoleService;

    }

    @GetMapping("/books")
    public List<Book> getAllBooks()
    {
        return bookService.getAll();
    }

    @GetMapping("/book/{id}")
    public Book getBookById(@PathVariable("id") Long id)
    {
        return bookService.getById(id);
    }
    @GetMapping("/books/bestsellers")
    public List<Book> getBestellers()
    {
        return bookService.getBestsellers();
    }
    @GetMapping("/categories")
    public List<Category> getCategories()
    {
        List<Category> cats=categoryService.getAll();
        Collections.sort(cats);
        return cats;
    }
    @GetMapping("/books/category/{category}")
    public List<Book> getAllByCat(@PathVariable("category") String category)
    {
        if(category.equals("Bestsellers"))
            return bookService.getBestsellers();
       Category tmp=categoryService.findByName(category);
       return bookService.getAllByCategory(tmp);
    }
    @PostMapping("/books/create")
    public Book createBook(@RequestBody Book book)
    {
        System.out.println("REACHED!");
        return bookService.save(book);
    }
    @PatchMapping("/books/update")
    public Book updateBook(@RequestBody Book book)
    {
        return bookService.save(book);
    }
    @GetMapping("/authors")
    public List<Author> getAllAuthors()
    {
        List<Author> authors=authorService.getAll();
        Collections.sort(authors);
        return authors;
    }
    @GetMapping("/author/{id}")
    public Author getAuthor(@PathVariable("id")Long id)
    {
        return authorService.getById(id);
    }
    @GetMapping("/category/{id}")
    public Category getCategory(@PathVariable("id") Long id)
    {
        return categoryService.getById(id);
    }
    @GetMapping("/users/{name}")
    public User getUser(@PathVariable("name")String username)
    {
        return userService.findByUsername(username);
    }
    @PostMapping("/users/create")
    public User newUser(@RequestBody User user)
    {
        return  userService.save(user);
    }
    @GetMapping("/roles/{name}")
    public UserRole getRole(@PathVariable("name")String name)
    {
        return userRoleService.findByName(name);
    }
    @GetMapping("/wishlist/{username}")
    public List<Book> findWishlist(@PathVariable("username") String username)
    {
        User u=userService.findByUsername(username);
        return bookService.findByWish(u);
    }
    @GetMapping("/cart/{username}")
    public List<Book> getCart(@PathVariable("username") String username)
    {
        User u=userService.findByUsername(username);
        return bookService.findByCart(u);
    }
    @PatchMapping("update/{bookId}/{userId}")
    public Book updateTry(@PathVariable("bookId")Long bookId,@PathVariable("userId") Long userId)
    {
        Book book=bookService.getById(bookId);
        User user=userService.getById(userId);
        List<User> wl=book.getWishList();
        wl.add(user);
        book.setWishList(wl);
        return bookService.save(book);
    }
    @PatchMapping("cart/add/{bookId}/{userId}")
    public Book updateTryCart(@PathVariable("bookId")Long bookId,@PathVariable("userId") Long userId)
    {
        Book book=bookService.getById(bookId);
        User user=userService.getById(userId);
        List<User> cart=book.getBooksCart();
        cart.add(user);
        book.setBooksCart(cart);
        return bookService.save(book);
    }
    @PatchMapping("cart/remove/{bookId}/{userId}")
    public Book removeTryCart(@PathVariable("bookId")Long bookId,@PathVariable("userId") Long userId)
    {
        Book book=bookService.getById(bookId);
        User user=userService.getById(userId);
        List<User> cart=book.getBooksCart();
        cart.remove(user);
        book.setBooksCart(cart);
        return bookService.save(book);
    }

    @PatchMapping("remove/{bookId}/{userId}")
    public Book removeTry(@PathVariable("bookId")Long bookId,@PathVariable("userId") Long userId)
    {
        Book book=bookService.getById(bookId);
        User user=userService.getById(userId);
        List<User> wl=book.getWishList();
        wl.remove(user);
        book.setWishList(wl);
        return bookService.save(book);
    }
    @PatchMapping("buy/{bookId}/{userId}")
    public Book buyBook(@PathVariable("bookId")Long bookId,@PathVariable("userId") Long userId)
    {
        Book book=bookService.getById(bookId);
        User user=userService.getById(userId);
        List<User> bought=book.getPurchasedBy();
        bought.add(user);
        book.setPurchasedBy(bought);
        return bookService.save(book);
    }
    @PostMapping("authors/add")
    public Author addAuthor(@RequestBody Author author)
    {
        return authorService.save(author);
    }

}
