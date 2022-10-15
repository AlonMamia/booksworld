import { Rating } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Image, Row, Container } from "react-bootstrap";
import "../styles/stylesheet.css";
import Book_menu from "./Book_menu";

export default function Book(props) {
  const [books, setBooks] = useState(() => {
    return props.Booklist.filter((book) => book != props.book);
  });

  useEffect(() => {
    setBooks(() => {
      return props.Booklist.filter((book) => book != props.book);
    });
  }, [books]);
  // console.log(books);
  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      <Container className="book-container">
        <div className="book-photo">
          <Image
            src={"/books/images/" + props.book.photo}
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
          <h1>{props.book.name}</h1>
          <p>{props.book.author}</p>
          <Rating value={props.book.rating} readOnly></Rating>
          <p>{props.book.description}</p>
          <Row>
            <Col>
              <p style={{ fontSize: 24 }}>
                In stock: <b>{props.book.InStock}</b>
              </p>
            </Col>
            <Col>
              <p style={{ fontSize: 24 }}>
                Price: <b>{props.book.price}$</b>
              </p>
            </Col>
          </Row>
        </div>
      </Container>
      <Book_menu selectBook={props.selectBook} books={books}></Book_menu>
    </div>
  );
}
