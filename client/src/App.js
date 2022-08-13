import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/chat" element={<Chat />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
