import React, { useState, useEffect } from "react";
import "../css/app.css";
import Config from "../Config";
import ReactLoading from "react-loading";
import { RiDeleteBin7Fill } from "react-icons/ri";

const UpdateBox = ({ id, title, body, fetchState, setfetchSate }) => {
  const [titles, setTitle] = useState(title && title);
  const [bodys, setBody] = useState(body && body);
 

  const [loading, setLoading] = useState(false);
  const [succ, setSuccess] = useState(false);

  const UpdateNotes = async () => {
    if (title === "" || body === "") {
      alert("fields must not be empty");
    } else {
      setLoading(true);
      await fetch(Config.API_URL + "/notes/update", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id,
          title: titles,
          body: bodys
        })})
        .then((res) => res.json())
        .then((jsonRes) => {
          console.log("notes : ", jsonRes.code);
          if (jsonRes.code === 11000) {
            setLoading(false);
            alert("Title already exists");
          } else {
            setLoading(false);
            setfetchSate(!fetchState);
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
          value={titles}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </p>
      <p>
        <p className="label">Enter Text Body</p>
        <textarea
          placeholder="Enter text body here..."
          className="body"
          value={bodys}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </p>
      <button
        style={{ background: "black",color:'white' }}
        onClick={() => UpdateNotes()}
        className="submit"
      >
        <center>
          {loading ? (
            <ReactLoading height={"10%"} width={"10%"} color="white" />
          ) : "Update Note"}
        </center>

      </button>
      {succ ? <span className="succ">Saved !!</span> : null}
    </div>
  );
};

export default UpdateBox;
