import HorizontalScroll from "react-horizontal-scrolling";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Rating } from "@mui/material";

export default function Book_menu(props) {
  const books = props.books;
  console.log(books);

  return (
    <div>
      <HorizontalScroll>
        {books.map((book, index) => {
          return (
            <Card
              key={index}
              defaultValue={book}
              onClick={() => props.selectBook(books, index)}
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
                  src={"/books/images/" + book.photo}
                  style={{ width: "100%", height: "80%" }}
                ></Card.Img>
                <Card.Title style={{ minBlockSize: 50 }}>
                  {book.name}
                </Card.Title>
                {/* <Card.Text style={{ fontSize: "19px" }}>{book.description}</Card.Text> */}
                <Rating readOnly value={book.rating}></Rating>
              </div>
            </Card>
          );
        })}
      </HorizontalScroll>
    </div>
  );
}
