import "../css/app.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Config from "../Config";
import ReactLoading from "react-loading";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    await fetch(Config.API_URL + "/notes/fetch", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log("notes : ", jsonRes);
        setData(jsonRes);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container2">
      <div className="title">Noty</div>
      <div className="sub">
        A simple note taking app for all your quick needs.
      </div>
      <Link to="/notes">
        <button className="start">Get started</button>
      </Link>
      <div className="data">
        {loading ? (
          <center> 
            <ReactLoading
              type={"spin"}
              color={"black"}
              height={"10%"}
              width={"10%"}
            />
          </center>
        ) : (
          <>
            {data && data.length} note{data.length > 1 ? "s" : ""} created !
          </>
        )}
      </div>
      <div className="footer">
        A Sample Test Project for KwameAI&reg; 2022&copy;
      </div>
    </div>
  );
}

export default App;
