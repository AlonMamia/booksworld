import { Rating } from "@mui/material";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";

export default function Book(props) {
  return (
    <div
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
        margin: "auto",
      }}
    >
      <Row>
        <Col>
          <div>
            <Image
              src={props.book.photo}
              height="50%"
              width="50%"
              style={{ margin: "auto" }}
            ></Image>
          </div>
        </Col>
        <Col>
          <div style={{ marginInline: true }}>
            <h1>{props.book.name}</h1>
            <Rating value={props.book.rating} readOnly></Rating>
            <p>{props.book.author}</p>
            <p>{props.book.description}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
