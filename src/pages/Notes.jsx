import React, { useState } from "react";
import "../css/app.css";
import { AnimationType, OutAnimationType, usePopup } from "react-custom-popup";

const EditBox = () => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="editbox">
      <p>
        <p className="label">Enter Title</p>
        <input
          className="title"
          type="text"
          name=""
          id=""
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Title"
        />
      </p>
      <p>
        <p className="label">Enter Text Body</p>
        <textarea
          placeholder="Enter text body here..."
          className="body"
          onChange={(e)=>setBody(e.target.value)}
        ></textarea>
      </p>
      <button className="submit">Submit Note</button>
    </div>
  );
};

function Notes() {
  const { showModal } = usePopup();

  return (
    <>
      <div className="notebox">
        <div className="rowbox">
          <div className="num">23 Notes.</div>
          <button
            className="add"
            onClick={() =>
              showModal(<EditBox />, {
                animationType: AnimationType.SLIDE_IN_UP,
                outAnimationType: OutAnimationType.SLIDE_OUT_UP
              })
            }
          >
            {" "}
            + Create Note{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Notes;
