import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

import { ClientWrapper, CustomerWrapper } from "./store";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ClientWrapper>
      <CustomerWrapper>
        <BrowserRouter>
          <Route path="/auth/signin" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/" exact component={Dashboard} />
        </BrowserRouter>
      </CustomerWrapper>
    </ClientWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
