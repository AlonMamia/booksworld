import React, { useEffect, useRef, useState } from "react";
import { Nav, Navbar, Container, Form, Row, Col } from "react-bootstrap";
import { Booklist } from "./Booklist";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import axios from "axios";

export default function MainNav(props) {
  // const [books, setBooks] = useState([])
  // const [currentBook, setCurrentBook] = useState(null)
  const [searchbox_value, setSearchbox_value] = useState(" ");
  const [select_value, setSelect_value] = useState("Name");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState(false);
  let ChildRef = useRef();
  const [books, setBooks] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // const handleSearchboxChange = (value) => {
  //   setSearchbox_value(value, () => {

  //   });
  // };

  const searchBooksByName = (name, category) => {
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
  };

  const searchBooksByAuthor = (author, category) => {
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
  };

  const getBooks = () => {
    axios
      .get("/books/all")
      .then((response) => {
        const data = response.data;
        console.log(data);
        setBooks(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (searchbox_value == null || searchbox_value.trim() === "") {
      getBooks();
    } else {
      switch (select_value) {
        case "Name":
          searchBooksByName(searchbox_value, category);
          break;
        case "Author":
          searchBooksByAuthor(searchbox_value, category);
          break;
      }
    }
  }, [searchbox_value]);
  if (books != undefined && books.length > 0) {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/"></Navbar.Brand>
            <Nav
              className="me-auto"
              style={{ margin: "auto", position: "relative" }}
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Form action="/books/" method="get" onSubmit={handleSubmit}>
                <Row>
                  <Col xs="auto">
                    <Form.Select
                      id="category"
                      onChange={(e) => setSelect_value(e.target.value)}
                    >
                      <option>Name</option>
                      <option>Author</option>
                    </Form.Select>
                  </Col>
                  <Col xs="auto">
                    <Form.Control
                      type="search"
                      onChange={(e) => setSearchbox_value(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Row>
              </Form>
            </Nav>
          </Container>
        </Navbar>
        <BrowserRouter basename="/">
          {/* <Booklist search_value={searchbox_value} ref={ChildRef}></Booklist> */}
          <Booklist search_value={searchbox_value} books={books}></Booklist>
        </BrowserRouter>
      </>
    );
  } else {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/"></Navbar.Brand>
            <Nav
              className="me-auto"
              style={{ margin: "auto", position: "relative" }}
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Form action="/books/" method="get" onSubmit={handleSubmit}>
                <Row>
                  <Col xs="auto">
                    <Form.Select
                      id="category"
                      onChange={(e) => setSelect_value(e.target.value)}
                    >
                      <option>Name</option>
                      <option>Author</option>
                    </Form.Select>
                  </Col>
                  <Col xs="auto">
                    <Form.Control
                      type="search"
                      onChange={(e) => setSearchbox_value(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Row>
              </Form>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}
