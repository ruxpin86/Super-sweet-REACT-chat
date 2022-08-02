import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import Signup from "./components/Signup";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Signup />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
