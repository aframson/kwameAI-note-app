import React, { useState } from "react";
import "../css/app.css";
import { AnimationType, OutAnimationType, usePopup } from "react-custom-popup";
import Config from "../Config";
const EditBox = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succ,setSuccess] = useState(false)

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
                setLoading(false)
                alert('Title already exists')
            }else{
                setLoading(false)
                setTitle('')
                setBody('')
                setSuccess(true)
                setTimeout(()=>{
                    setSuccess(false)
                },4000)
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
        Submit Note
      </button>
      {succ?<span className="succ">Sunmitted successfully , you can add another one again</span>:null}
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
