import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URI = "/api/auth/userlogin";

  const formSubmitted = useCallback(
    async (event) => {
      event.preventDefault();
      const data = {
        email,
        password,
      };
      setEmail("");
      setPassword("");
      // console.log(data);

      const response = await fetch(API_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);

      const { token } = json; // fetch the token from server

      // console.log(token);

      if (response.status === 404) {
        alert("User Doesn't Exist");
      }
      if (response.status === 201) {
        // when user successfully logged in sign it with jsonwebtoken
        localStorage.setItem("token", token);
        alert("User Successfully Logged In");
        navigate("/dashboard");
      }
      if (response.status === 403) {
        alert("Try to login with valid credentails invalid key provided");
      }
      if (response.status === 500) {
        alert("Some Internal Server Error");
      }
    },
    // eslint-disable-next-line
    [email, password]
  );

  return (
    <>
      <form
        onSubmit={formSubmitted}
        className="mt-5 p-4 p-md-5 border rounded-3 bg-light container"
      >
        <h3 className="form-label">Sign In</h3>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            minLength="5"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <Link to="/signUp">Not a User</Link>
          </label>
        </div>
        <button className="rounded fs-5 w-100 btn btn-primary" type="submit">
          Sign In
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignIn;
