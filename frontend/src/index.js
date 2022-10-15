import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Booklist from "./components/Booklist";
import Searchbox from "./components/before_function_change/Searchbox";
import "bootstrap/dist/css/bootstrap.css";
import "reactjs-popup/dist/index.css";
import MainNav from "./components/MainNav"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div style={{ position: "relative" }}>
    <MainNav></MainNav>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
