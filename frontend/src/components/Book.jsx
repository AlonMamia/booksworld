import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { maxHeight } from "@mui/system";

class Book extends Component {
  render() {
    return (
      <div>
        <h1 id="name">{this.props.book_name}</h1>
        <image src={this.props.photo} width="1000" height="1000"></image>
        <h2 id="author">{this.props.author}</h2>
        <h2 id="description">{this.props.description}</h2>
        <h2 id="rating">{this.props.rating}</h2>
        <h2 id="InStock">{this.props.InStock}</h2>
        <h2 id="tags">{this.props.tags}</h2>
      </div>
    );
  }
}

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
  samerowbook = () => {};
  displayBooks = (books) => {
    if (!books.length) return null;
    console.log(books);
    const rendered_books = books.map((book, index) => {
      return (
        <td>
          <Card
            style={{
              marginLeft: "10px",
              width: "200px",
              height: "400px",
              borderWidth: "1px",
              position: "relative",
            }}
            key={index}
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
        </td>
      );
    });
    return rendered_books;
  };

  render() {
    return (
      <div style={{ marginTop: "200px" }}>
        {this.displayBooks(this.state.books)}
      </div>
    );
    // return (
    //   <div className="container">
    //     <form>
    //       <input type="search" name="book_search" placeholder="Search here!" />
    //     </form>
    //   </div>
    // );
  }
}
