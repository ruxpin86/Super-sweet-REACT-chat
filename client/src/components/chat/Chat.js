import React, { useState, useEffect, useRef } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import io from "socket.io-client";
import { ADD_MESSAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { QUERY_ALL_MESSAGES } from "../../utils/queries";
import { QUERY_ALL_CONVERSATIONS } from "../../utils/queries";
import "./chat.css";

//Socket.io Middleware
const socket = io();

export default function Chat() {
  const [messageFormData, setMessageFormData] = useState({ content: "" });
  const msgRef = useRef([]);
  const inputRef = useRef(null);
  const [trig, setTrig] = useState(false);
  const trigger = () => setTrig((b) => !b);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  const [addMessage, { error }] = useMutation(ADD_MESSAGE);
  if (error) {
    console.log(JSON.stringify(error));
  }

  //SOCKET.IO
  useEffect(() => {
    socket.on(
      "connect",
      () => {
        console.log(socket.id);
        setIsConnected(true);
        const onScroll = (e) => {
          setScrollTop(e.target.documentElement.scrollTop);
          setScrolling(e.target.documentElement.scrollTop > scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
      },
      [scrollTop]
    );

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("msg", (msg) => {
      msgRef.current.push(msg);
      trigger();
      console.log("received msg", msg, msgRef.current);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("msg");
      // socket.disconnect();
    };
  }, []);

  const { loading, data, error: userError } = useQuery(QUERY_ME);
  // console.log(data);
  if (userError) {
    console.log(JSON.stringify(userError));
  }
  const userData = data?.getMe;
  const username = userData?.username;
  const userId = userData?.id;

  //THIS ONE FOR GRABBING USER MESSAGE
  const userMessage = userData?.messages;

  console.log(userData);
  console.log(userMessage);
  console.log(userId);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessageFormData({ ...messageFormData, [name]: value });
  };
  const {
    // register,
    // formState: { errors },
    // handleSubmit,
  } = useForm();

  //NEED TO IMPORT USER DATA TO USER IN messageObject
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Message Submitted");
    let messageObject = {
      userID: userId,
      user: username,
      msg: messageFormData,
    };

    socket.emit("msg", messageObject);
    // setMessageArray([...messageArray, messageFormData]);
    msgRef.current.push(messageObject.user, messageObject.msg);
    trigger();
    // try {
    const { data } = await addMessage(
      {
        variables: {
          userId: messageObject.userID,
          input: messageObject.msg,
        },
      }
      // console.log(data)
    );
    setMessageFormData({
      content: "",
    });
    // inputRef.current.focus();
  };

  return (
    <div className="main">
      {/* <div className="main-chat"> */}
      <div className="body">
        <p>Connected: {"" + isConnected}</p>
        {/* <p>Last pong: {lastPong || "=ping"}</p> */}
        {msgRef.current.map((msg) => (
          <div>
            <p>
              {msg.user}: {msg.msg}
            </p>
          </div>
        ))}
      </div>
      <div className="text-board">
        <form>
          <textarea
            className="textarea"
            autoFocus
            ref={inputRef}
            name="content"
            // {...register("content", { required: true })}
            onChange={handleInputChange}
            value={messageFormData.content}
          ></textarea>
          <button className="send-btn" type="submit" onClick={handleSubmit}>
            Send
          </button>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
}
