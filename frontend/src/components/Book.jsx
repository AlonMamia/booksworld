import React from "react";

export default function Book(props) {
  return (
    <div>
      <title>{props.book.name}</title>

      <textarea name="details" id="details" cols="30" rows="10">
        {props.book.description}
      </textarea>
      <div>
        <img src={props.book.image} width="333px" height="499px"></img>
      </div>
    </div>
  );
}
