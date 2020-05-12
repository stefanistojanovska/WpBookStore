package com.wp.bookstore.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

@Table(name="authors")
public class Author implements Comparable<Author>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    String nameFull;

    @Override
    public int compareTo(Author o) {
        return this.nameFull.compareTo(o.nameFull);
    }
}
