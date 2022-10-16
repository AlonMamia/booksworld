import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Col, Image, Row, Container } from "react-bootstrap";
import { useSearchParams, useParams } from "react-router-dom";
import "../styles/stylesheet.css";
import Book_menu from "./Book_menu";

export default function Book(props) {
  const { index } = useParams();
  const [books, setBooks] = useState(() => {
    return props.Booklist.filter((book) => book != props.book);
  });

  const [book, setBook] = useState();

  const IsFirst = useRef(true);

  useEffect(() => {
    if (book == undefined) {
      fetch(`/books/${index}`)
        .then((res) => res.json())
        .then((data) => setBook(data));
      console.log(book);
    }
  }, [book]);

  if (book == undefined) {
    return <h1>Not Found!</h1>;
  }
  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      <Container className="book-container">
        <div className="book-photo">
          <Image
            src={"/books/images/" + book.photo}
            height="100%"
            width="100%"
            style={{
              margin: "auto",
              borderWidth: "0.5px",
              borderColor: "black",
              border: "solid",
            }}
          ></Image>
        </div>

        <div className="book-content">
          <h1>{book.name}</h1>
          <p>{book.author}</p>
          <Rating value={book.rating} readOnly></Rating>
          <p>{book.description}</p>
          <Row>
            <Col>
              <p style={{ fontSize: 24 }}>
                In stock: <b>{book.InStock}</b>
              </p>
            </Col>
            <Col>
              <p style={{ fontSize: 24 }}>
                Price: <b>{book.price}$</b>
              </p>
            </Col>
          </Row>
        </div>
      </Container>
      <Book_menu selectBook={props.selectBook} books={books}></Book_menu>
    </div>
  );
}
