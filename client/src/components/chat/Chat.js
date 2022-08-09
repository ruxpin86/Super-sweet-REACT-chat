import React, { useState, useEffect, useRef } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { io } from "socket.io-client";
import "./chat.css";
import { ADD_MESSAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { QUERY_ALL_MESSAGES } from "../../utils/queries";
// import { QUERY_ALL_CONVERSATIONS } from "../../utils/queries";

//Socket.io Middleware
const socket = io("http://localhost:3001", { transports: ["websocket"] });

export default function Chat() {
  const [messageFormData, setMessageFormData] = useState({ content: "" });
  const [messages, setMessages] = useState([]);
  const previousMsgs = [];
  const [trig, setTrig] = useState(false);
  const trigger = () => setTrig((b) => !b);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const [isConnected, setIsConnected] = useState(socket.connected);
  // const [lastPong, setLastPong] = useState(null);

  // const { loading, data, error: userError } = useQuery(QUERY_ME);
  // // console.log(data);
  // if (userError) {
  //   console.log(JSON.stringify(userError));
  // }
  // const userData = data?.getMe;
  // const username = userData?.username;
  // const userId = userData?.id;

  // //THIS ONE FOR GRABBING USER MESSAGE
  // const userMessage = userData?.messages;
  // msgRef.current.push(userMessage);

  // let previousMsgObject = {
  //   userName: username,
  //   msgs: userMessage,
  // };

  // previousMsgs.push(previousMsgObject);

  // console.log(userData);
  // console.log(userMessage);
  // console.log(userId);

  const [addMessage, { error }] = useMutation(ADD_MESSAGE);
  if (error) {
    console.log(JSON.stringify(error));
  }

  const inputRef = useRef(null);

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
      let tempArray = [...messages, msg];
      setMessages(tempArray);
      trigger();
      console.log("received msg", msg);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("msg");
      // socket.disconnect();
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

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
  // previousMsgs.push(userMessage);

  // if (!loading && !error && data) {
  //   setMessages(userData?.messages);
  // }

  console.log(userData);
  // console.log(userMessage);
  // console.log(userId);

  const handleInputChange = (event) => {
    // const { name, value } = event.target;
    // setMessageFormData({ ...messageFormData, [name]: value });
    setMessageFormData(event.target.value);
  };

  //NEED TO IMPORT USER DATA TO USER IN messageObject
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Message Submitted", messageFormData);
    let messageObject = {
      userID: userId,
      user: username,
      msg: messageFormData,
    };

    console.log(messageObject);

    socket.emit("msg", messageObject);
    // setMessageArray([...messageArray, messageFormData]);
    let tempArray = [...messages, messageObject];
    setMessages(tempArray);
    trigger();
    // try {
    const { data } = await addMessage({
      variables: {
        userId: messageObject.userID,
        user: messageObject.user,
        input: { content: messageObject.msg },
      },
    });
    setMessageFormData({
      content: "",
    });
    inputRef.current.focus();
  };

  const renderPrevMessages = () => {
    previousMsgs.map((data) => {
      console.log(data);
      return `${username}: ${data}`;
    });
  };

  return (
    <div className="main">
      {/* <div className="main-chat"> */}
      <div className="body">
        <p>Connected: {"" + isConnected}</p>
        {/* <p>Last pong: {lastPong || "=ping"}</p> */}
        {/* <p>{renderPrevMessages()}</p>
        {userMessage.map((data) => (
          <div>
            <p>{data && data.content}</p>
          </div>
        ))} */}
        {data?.getMe?.messages &&
          data?.getMe?.messages.map((msg) => (
            <div>
              <p>
                {msg.user}: {msg.content}
              </p>
              <p>user name: {msg.username + ""}</p>
              <pre>{JSON.stringify(msg)}</pre>
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
