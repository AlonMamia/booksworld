import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Rating from "@mui/material/Rating";

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

  displayBooks = (books) => {
    if (!books.length) return null;
    const rendered_books = books.map((book, index) => {
      return (
        <Col style={{ margin: "10px" }} key={index}>
          <Card
            style={{
              marginLeft: "10px",
              width: "200px",
              height: "400px",
              borderWidth: "1px",
              position: "relative",
            }}
          >
            <div style={{ margin: "auto", padding: 20 }}>
              <Card.Img
                src={book.photo}
                style={{ width: "167px", height: "250px" }}
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
    return (
      <div style={{ marginTop: "100px" }}>
        <Row xs={7}>{this.displayBooks(this.state.books)}</Row>
      </div>
    );
  }
}
