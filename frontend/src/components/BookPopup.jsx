import React from "react";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
const axios = require('axios').default;


export default function Booklist(props) {
  const books = props.books;
  const listbooks = books.map((book) => <h1 key={book}>{book}</h1>);
  return <div>{listbooks}</div>;
}
