import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import Book from "./Book";

export default class Booklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      current_book: null,
    };
  }

  componentDidMount = () => {
    this.getBooks();
  };
  getBooks = () => {
    axios
      .get("/books/all")
      .then((response) => {
        const data = response.data;
        this.setState({ books: data });
      })
      .catch(() => {
        alert("Error receiving book list");
      });
  };

  searchBooksByName = (name, category) => {
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
        this.setState({ books: data });
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  searchBooksByAuthor = (author, category) => {
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
        this.setState({ books: data });
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  selectBook = (index) => {
    this.setState({ current_book: this.state.books[index] });
  };
  displayBooks = (books) => {
    if (!books.length) return null;
    const rendered_books = books.map((book, index) => {
      return (
        <Col style={{ marginBottom: "10px" }} key={index}>
          <Card
            defaultValue={book}
            onClick={() => this.selectBook(index)}
            style={{
              // marginLeft: "10px",
              width: "200px",
              height: "400px",
              borderWidth: "1px",
              position: "relative",
            }}
          >
            <div style={{ margin: "auto", padding: 20 }}>
              <Card.Img
                src={book.photo}
                style={{ width: "100%", height: "80%" }}
              ></Card.Img>
              <Card.Title style={{ minBlockSize: 50 }}>{book.name}</Card.Title>
              {/* <Card.Text style={{ fontSize: "19px" }}>{book.description}</Card.Text> */}
              <Rating readOnly value={book.rating}></Rating>
            </div>
          </Card>
        </Col>
      );
    });
    return rendered_books;
  };

  render() {
    if (this.state.current_book) {
      return (
        <div style={{ marginTop: "50px" }}>
          <Book book={this.state.current_book}></Book>
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
          <Row xs={"auto"} xxl={4}>
            {this.displayBooks(this.state.books)}
          </Row>
        </div>
      );
    }
  }
}
