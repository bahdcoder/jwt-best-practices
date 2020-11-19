import React from "react";
import { Redirect, useHistory } from "react-router-dom";

import { remove_refresh_token } from "../queries";
import { useCustomer, useClient } from "../store";

const Dashboard = () => {
  const client = useClient();
  const history = useHistory();
  const { customer, setCustomer } = useCustomer();

  const logout = () => {
    client.request(remove_refresh_token).finally(() => {
      history.push("/auth/signin");

      setCustomer(null);
    });
  };

  if (!customer) {
    return <Redirect to="/auth/signin" />;
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="/">
            JWT Best practices
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto"></ul>
            <button
              onClick={() => logout()}
              className="btn btn-danger my-2 my-sm-0"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <div className="mt-5">
        <h1 className="text-center">{customer.name}</h1>
        <h3 className="text-muted text-center">{customer.email}</h3>
      </div>
    </>
  );
};

export default Dashboard;
