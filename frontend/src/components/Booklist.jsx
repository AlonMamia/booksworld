import React, { useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import Book from "./Book";
// import { stylesheet  } from "../styles/stylesheet.css";
import "../styles/cardstyle.css";
import { maxHeight } from "@mui/system";
const path = require("path");

export const Booklist = forwardRef((props, ref) => {
  const [books, setBooks] = useState([]);
  const [current_book, setCurrent_book] = useState(null);

  useImperativeHandle(ref, () => ({
    searchBooksByName(name, category) {
      console.log(name);
      axios({
        method: "post",
        url: "/books/get_books_by_name",
        headers: {},
        data: {
          name: name,
          category: category,
        },
      })
        .then((response) => {
          const data = response.data;
          setBooks(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchBooksByAuthor(author, category) {
      console.log(author + category);
      axios({
        method: "post",
        url: "/books/get_books_by_author",
        headers: {},
        data: {
          author: author,
          category: category,
        },
      })
        .then((response) => {
          const data = response.data;
          setBooks(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getBooks() {
      axios
        .get("/books/all")
        .then((response) => {
          const data = response.data;
          setBooks(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  }));

  const selectBook = (books, index) => {
    setCurrent_book(books[index]);
  };

  const displayBooks = (books) => {
    if (!books.length) return null;
    // const photos = books.map(async (book, index) => {
    //   const photo = axios({
    //     method: "get",
    //     url: `localhost:5000/books/images/${book.photo}`,
    //     headers: {},
    //     data: {},
    //   });

    //   return photo;
    // });

    const rendered_books = books.map((book, index) => {
      return (
        <div
          className="card"
          key={index}
          style={{
            backgroundImage: `url('/books/images/${book.photo}')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            padding: 10,
            marginLeft: "5em",
          }}
        >
          <div className="content">
            <h3 className="title">{book.name}</h3>
            <p className="copy">
              <Rating readOnly value={book.rating}></Rating>
            </p>
            <Button className="primary" onClick={() => selectBook(books,index)}>
              view
            </Button>
          </div>
        </div>
      );
    });
    return rendered_books;
  };

  const getOtherBooks = (books) => {
    const books_without_selected = books.filter((book) => book != current_book);

    return books_without_selected;
  };

  if (current_book) {
    return (
      <div style={{ marginTop: "50px" }}>
        <h1>{props.search_value}</h1>
        <Book
          book={current_book}
          Booklist={books}
          selectBook={selectBook}
        ></Book>
      </div>
    );
  } else {
    return (
      <div
        style={{
          marginTop: "50px",
          width: "100%",
          marginRight: "auto",
          visibility: false,
        }}
      >
        {/* <img src="/books/images/91fbe1589b4cafd755286bc50e36df71"></img> */}
        <Row xs={"auto"} xxl={"auto"}>
          {displayBooks(books)}
        </Row>
      </div>
    );
  }
});
