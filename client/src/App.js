import React from "react";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
// import Signup from "./components/signup/Signup";
import Footer from "./components/footer/Footer";
import Chat from "./components/chat/Chat";

// const httpLink = createHttpLink({
//   uri: "http://localhost:3001/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("id_token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    // <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
        <div className="main">
          {/* <Main /> */}
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/chat" element={<Chat />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    // </ApolloProvider>
  );
}

export default App;
