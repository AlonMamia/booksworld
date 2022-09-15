import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

class Book extends Component {
  render() {
    return (
      <div>
        <h1 id="name">{this.props.book_name}</h1>
        <image src={this.props.photo} width="1000" height="1000"></image>
        <h2 id="author">{this.props.author}</h2>
        <h2 id="description">{this.props.description}</h2>
        <h2 id="raiting">{this.props.raiting}</h2>
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

  displayBooks = (books) => {
    if (!books.length) return null;
    console.log(books);
    const rendered_books = books.map((book, index) => {
      return (
        <div key={index}>
          <h1>{book.photo}</h1>
          <img src={book.photo}></img>
        </div>
      );
    });
    return rendered_books;
  };

  render() {
    return (
      <div>
        <h1>{this.displayBooks(this.state.books)}</h1>
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
