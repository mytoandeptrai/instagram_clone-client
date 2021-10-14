import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import DataProvider from "./redux/store";

ReactDOM.render(
  <React.Fragment>
    <DataProvider>
      <Router>
        <App />
      </Router>
    </DataProvider>
  </React.Fragment>,
  document.getElementById("root")
);
