import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import Book from "./Book";
import "../styles/cardstyle.css";

import { maxHeight } from "@mui/system";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

export const Booklist = (props) => {
  const [current_book, setCurrent_book] = useState(null);
  const first_update = useRef(true);
  const navigate = useNavigate();

  const selectBook = (books, index_in_array) => {
    setCurrent_book(books[index_in_array]);
    // setBooks(books.filter((book) => book != current_book));
    console.log(current_book);
  };

  useEffect(() => {
    if (!first_update.current) {
      navigate(`/books/${current_book.Count}`);
    } else {
      first_update.current = false;
    }
  }, [current_book]);

  const displayBooks = (books) => {
    console.log("hi");
    if (!books.length) return null;

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
            <Button
              className="primary"
              onClick={() => selectBook(props.books, index)}
            >
              view
            </Button>
          </div>
        </div>
      );
    });
    return rendered_books;
  };

  return (
    <Routes>
      <Route
        path="/books/:index"
        element={
          <div style={{ marginTop: "50px" }}>
            {<Book Booklist={props.books} selectBook={selectBook}></Book>}
          </div>
        }
      ></Route>
      <Route
        path="/"
        element={
          <div
            style={{
              marginTop: "50px",
              width: "100%",
              marginRight: "auto",
              visibility: false,
            }}
          >
            <Row xs={"auto"} xxl={"auto"}>
              {displayBooks(props.books)}
            </Row>
          </div>
        }
      ></Route>
    </Routes>
  );
};
