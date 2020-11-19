import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import { login } from "../queries";
import { useCustomer, useClient } from "../store";

const Login = () => {
  const client = useClient();
  const history = useHistory();
  const { customer, setCustomer } = useCustomer();

  const onSubmit = (event) => {
    event.preventDefault();

    const [email, password] = event.target.elements;

    client
      .request(login, {
        email: email.value,
        password: password.value,
      })
      .then(({ login_customer: { customer, token } }) => {
        client.setHeader("authorization", `Bearer ${token}`);

        setCustomer(customer);

        history.push("/");
      })
      .catch(console.log);
  };

  if (customer) {
    return <Redirect to="/" />;
  }

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={onSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control top-field"
          placeholder="Email address"
          required
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-3 bottom-field"
          placeholder="Password"
          required
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p className="mt-3 mb-3 text-muted text-center">
          No account ? <Link to="/auth/register">Create one here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
