import React, { useState, useEffect ,useContext} from "react";
import "../css/app.css";
import { AnimationType, OutAnimationType, usePopup } from "react-custom-popup";
import Config from "../Config";
import ReactLoading from "react-loading";
import { RiDeleteBin7Fill } from "react-icons/ri";
import EditBox from "./EditBox";
import {StateContext} from '../State'



function Notes() {
  const {fetchState, setfetchSate}  = useContext(StateContext)
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
            <div className="num">{data && data.length} Notes </div>
          )}

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
        {data &&
          data.map((item, i) => (
            <div key={i} className="notes">
              <div className="content">
                <div className="title2">{item.title}</div>
                <div className="body2">{limitText(item.body)}</div>
              </div>
              <div onClick={()=>DeleteNotes(item._id)} className="del">
                <RiDeleteBin7Fill style={{marginTop:5}} size={20} color={'black'}/>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Notes;
