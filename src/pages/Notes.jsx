import React, { useState, useEffect, useContext } from "react";
import "../css/app.css";
import { AnimationType, OutAnimationType, usePopup } from "react-custom-popup";
import Config from "../Config";
import ReactLoading from "react-loading";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import EditBox from "./EditBox";
import { StateContext } from "../State";
import UpdateBox from "./UpdateBox";
import moment from "moment";
import { Link } from "react-router-dom";

function Notes() {
  const { fetchState, setfetchSate } = useContext(StateContext);
  const { showModal } = usePopup();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const DeleteNotes = async (id) => {
    setLoading(true);
    await fetch(Config.API_URL + `/notes/delete/${id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log("notes : ", jsonRes);
        setLoading(false);
        setfetchSate(!fetchState);
      });
  };

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

  const limitText = (text) => {
    let count = 50;
    let result = text.slice(0, count) + (text.length > count ? "..." : "");
    return result;
  };

  function timeSince(date) {
    var seconds = Math.floor((new Date().toISOString() - date) / 1000);
    console.log("Date:", new Date().toISOString());

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  useEffect(() => {
    fetchNotes();
  }, [fetchState]);

  return (
    <>
      <div className="notebox">
        <div className="rowbox">
          {loading ? (
            <ReactLoading
              type={"spin"}
              color={"black"}
              height={"3%"}
              width={"3%"}
            />
          ) : (
            <>
              <Link to={"/"}>
                <BiArrowBack size={40} color="black" />
              </Link>
              <div className="num">{data && data.length} Notes </div>
            </>
          )}

          <button
            className="add"
            onClick={() =>
              showModal(
                <EditBox fetchState={fetchState} setfetchSate={setfetchSate} />,
                {
                  animationType: AnimationType.SLIDE_IN_UP,
                  outAnimationType: OutAnimationType.SLIDE_OUT_UP
                }
              )
            }
          >
            {" "}
            + Create Note{" "}
          </button>
        </div>
        {data &&
          data.map((item, i) => (
            <div key={i} className="notes">
              <div
                onClick={() =>
                  showModal(
                    <UpdateBox
                      id={item._id}
                      title={item.title}
                      body={item.body}
                      fetchState={fetchState}
                      setfetchSate={setfetchSate}
                    />,
                    {
                      animationType: AnimationType.SLIDE_IN_UP,
                      outAnimationType: OutAnimationType.SLIDE_OUT_UP
                    }
                  )
                }
                className="content"
              >
                <div className="title2">{item.title}</div>
                <div className="body2">{limitText(item.body)}</div>
                <div className="rowbox2">
                <div className="last">
                  last Updated : {moment(item.updatedAt).fromNow()}
                </div>
                <div style={{color:'black'}} className="last">
                  Created : {moment(item.createdAt).fromNow()}
                </div>
                </div>
               
              </div>
              <div onClick={() => DeleteNotes(item._id)} className="del">
                <RiDeleteBin7Fill
                  style={{ marginTop: 5 }}
                  size={20}
                  color={"black"}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Notes;
