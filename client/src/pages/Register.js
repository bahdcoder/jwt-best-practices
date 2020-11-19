import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

import { register } from "../queries";
import { useClient, useCustomer } from "../store";

const Register = () => {
  const client = useClient();
  const history = useHistory();
  const { customer, setCustomer } = useCustomer();

  const onSubmit = (event) => {
    event.preventDefault();

    const [name, email, password] = event.target.elements;

    client
      .request(register, {
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then(({ register_customer: { customer, token } }) => {
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
    <form onSubmit={onSubmit} className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal text-center">
        Please register a new account
      </h1>
      <label htmlFor="inputEmail" className="sr-only">
        Name
      </label>
      <input
        type="name"
        id="name"
        className="form-control top-field"
        placeholder="Name"
        required
        autoFocus
      />
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="inputEmail"
        className="form-control middle-field"
        placeholder="Email address"
        required
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
        Create Account
      </button>
      <p className="mt-3 mb-3 text-muted text-center">
        Already registered ? <Link to="/auth/signin">Sign in here</Link>
      </p>
    </form>
  );
};

export default Register;
