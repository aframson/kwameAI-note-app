import React, { useState,useContext } from "react";
import "../css/app.css";
import Config from "../Config";
import ReactLoading from "react-loading";
import { RiDeleteBin7Fill } from "react-icons/ri";
import {StateContext} from '../State'

const EditBox = ({fetchState, setfetchSate}) => {


  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [succ, setSuccess] = useState(false);

  const AddNotes = async () => {
    if (title === "" || body === "") {
      alert("fields must not be empty");
    } else {
      setLoading(true);
      await fetch(Config.API_URL + "/notes/add", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          body: body
        })
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          console.log("notes : ", jsonRes.code);
          if (jsonRes.code === 11000) {
            setLoading(false);
            alert("Title already exists");
          } else {
            setLoading(false);
            setfetchSate(!fetchState)
            setTitle("");
            setBody("");
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 4000);
          }
        });
    }
  };

  return (
    <div className="editbox">
      <p>
        <p className="label">Enter Title</p>
        <input
          className="title"
          type="text"
          name=""
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </p>
      <p>
        <p className="label">Enter Text Body</p>
        <textarea
          placeholder="Enter text body here..."
          className="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </p>
      <button onClick={() => AddNotes()} className="submit">
        <center>
        {loading?<ReactLoading   height={"20%"}
              width={"20%"} color="white"/>:'Submit Note'}
        </center>
      </button>
      {succ ? (
        <span className="succ">
          Sunmitted successfully , You can add another one again or click anywhere to exit
        </span>
      ) : null}
    </div>
  );
};

export default EditBox;