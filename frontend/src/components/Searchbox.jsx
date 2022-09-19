import React from "react";
import { Button, Form } from "react-bootstrap";
import { axios } from "axios";
import Booklist from "./Book";

export default class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      searchbox_value: " ",
      select_value: "Name",
      category: "",
    };
  }

  searchBooks = () => {};

  handleSearchboxChange = (value) => {
    this.setState({ searchbox_value: value }, () => {
      console.log(value);
      switch (this.state.select_value) {
        case "Name":
          this.child.current.searchBooksByName(
            this.state.searchbox_value,
            this.state.category
          );
          break;
        case "Author":
          console.log("author");
          this.child.current.searchBooksByAuthor(
            this.state.searchbox_value,
            this.state.category
          );
          break;
      }
      if (
        this.state.searchbox_value == null ||
        this.state.searchbox_value.trim() == ""
      ) {
        this.child.current.getBooks();
      }
    });
  };

  handleSelectChange = (event) => {
    this.setState({ select_value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <>
        <div style={{ width: "50%", margin: "auto", position: "relative" }}>
          <h1 style={{ textAlign: "center" }}>World of books</h1>
          <div>
            <Form action="/books/" method="post" onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Search book </Form.Label>
                <Form.Control
                  onChange={(event) =>
                    this.handleSearchboxChange(event.target.value)
                  }
                  type="search"
                  placeholder="search books here"
                  id="searchbox"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Search by: </Form.Label>
                <Form.Select
                  id="category"
                  onChange={() => this.handleSelectChange}
                >
                  <option>Name</option>
                  <option>Author</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit" style={{ width: "100%" }}>
                submit
              </Button>
            </Form>
          </div>
        </div>
        <Booklist
          ref={this.child}
          bookName={this.state.searchbox_value}
          bookCategory={this.state.category}
        ></Booklist>
      </>
    );
  }
}
