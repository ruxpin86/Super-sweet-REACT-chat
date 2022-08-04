import React, { useState, useEffect, useRef } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import io from "socket.io-client";
import { ADD_MESSAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { QUERY_ALL_MESSAGES } from "../../utils/queries";
import { QUERY_ALL_CONVERSATIONS } from "../../utils/queries";

//Socket.io Middleware
const socket = io();

export default function Chat() {
  const [messageFormData, setMessageFormData] = useState({ content: "" });
  const msgRef = useRef([]);
  const inputRef = useRef(null);
  const [trig, setTrig] = useState(false);
  const trigger = () => setTrig((b) => !b);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrolling, setScrolling] = useState(false);

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
  console.log(data);
  if (userError) {
    console.log(JSON.stringify(userError));
  }
  const userData = data?.getMe;
  const username = userData?.username;
  const userId = userData?._id;

  //THIS ONE FOR GRABBING USER MESSAGE
  const userMessage = userData?.messages;
  console.log(userData);
  console.log(userMessage);
  console.log(userId);

  // const onPageLoad = () => {
  //   const {
  //     loading,
  //     data,
  //     error: convoError,
  //   } = useQuery(QUERY_ALL_CONVERSATIONS);

  //   if (convoError) {
  //     console.log(JSON.stringify(convoError));
  //   }

  //   const convoData = data?.getConversations;
  //   const convoId = convoData?._id;
  //   const convoMembers = convoData?.members;
  //   const convoMessages = convoData?.messages;
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessageFormData({ ...messageFormData, [name]: value });
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //NEED TO IMPORT USER DATA TO USER IN messageObject
  handleSubmit(async (event) => {
    event.preventDefault();
    console.log("submit", messageFormData);
    let messageObject = {
      userID: userId,
      user: username,
      msg: messageFormData,
    };
    socket.emit("msg", messageObject);
    // setMessageArray([...messageArray, messageFormData]);
    msgRef.current.push(messageObject);
    trigger();
    // try {
    const { data } = await addMessage({
      variables: {
        userId: messageObject.userID,
        input: { messages: messageObject.msg },
      },
    });

    setMessageFormData({
      messageInput: "",
    });
    inputRef.current.focus();
  });

  return (
    <div>
      <h1>Chat</h1>
      <div className="body">
        <p>Connected: {"" + isConnected}</p>
        <p>Welcome to LiveChat :D</p>
        {/* <p>Last pong: {lastPong || "=ping"}</p> */}
        {msgRef.current.map((msg) => (
          <div>
            <p>
              {msg.user}: {msg.msg}
            </p>
          </div>
        ))}
      </div>
      <form>
        <textarea
          autoFocus
          ref={inputRef}
          {...register("content", { required: true })}
          onChange={handleInputChange}
          value={messageFormData.messageInput}
        ></textarea>
      </form>
      <button onClick={handleSubmit} type="submit"></button>
    </div>
  );
}
