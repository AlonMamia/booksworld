import React from "react";
import { Button, Form } from "react-bootstrap";
import { axios } from "axios";

export default class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchbox_value: "",
      category: "",
    };
  }

  searchBooks = () => {};

  handleSearchboxChange = (event) => {
    this.setState({ searchbox_value: event.target.value });
    console.log(this.state.searchbox_value);
  };

  handleSubmit = (event) => {
    alert("submitted!!!");
    event.preventDefault();
  };
  render() {
    return (
      <>
        <div style={{ width: "50%", margin: "auto" }}>
          <h1 style={{ textAlign: "center" }}>World of books</h1>
          <div>
            <Form
              action="/books/search"
              method="post"
              onSubmit={this.handleSubmit}
            >
              <Form.Group className="mb-3">
                <Form.Label>Search book </Form.Label>
                <Form.Control
                  value={this.state.searchbox_value}
                  onChange={this.handleSearchboxChange}
                  type="search"
                  placeholder="search books here"
                  id="searchbox"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Search by: </Form.Label>
                <Form.Select id="category">
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
      </>
    );
  }
}
