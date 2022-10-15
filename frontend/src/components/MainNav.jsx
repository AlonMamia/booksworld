import React, { useEffect, useRef, useState } from "react";
import { Nav, Navbar, Container, Form, Row, Col } from "react-bootstrap";
import { Booklist } from "./Booklist";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function MainNav(props) {
  // const [books, setBooks] = useState([])
  // const [currentBook, setCurrentBook] = useState(null)
  const [searchbox_value, setSearchbox_value] = useState(" ");
  const [select_value, setSelect_value] = useState("Name");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState(false);
  let ChildRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // const handleSearchboxChange = (value) => {
  //   setSearchbox_value(value, () => {

  //   });
  // };

  useEffect(() => {
    if (searchbox_value == null || searchbox_value.trim() === "") {
      ChildRef.current.getBooks();
    }
    else{
    switch (select_value) {
      case "Name":
        ChildRef.current.searchBooksByName(searchbox_value, category);
        break;
      case "Author":
        ChildRef.current.searchBooksByAuthor(searchbox_value, category);
        break;
    }
  }
    
  }, [searchbox_value]);

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
      <Booklist search_value={searchbox_value} ref={ChildRef}></Booklist>
    </>
  );
}
