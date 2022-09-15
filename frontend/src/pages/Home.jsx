import { useEffect, useState } from "react";

const Home = () => {
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:5000/books/all ");
    };
  }, []);
  return <div></div>;
};
