import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");

  const API_URI = "/api/auth/createUser";

  const formSubmitted = useCallback(
    async (event) => {
      event.preventDefault(); // prevent the default form submitting action

      //   to validate the user age must be 18 years
      const bday = new Date(dob);
      const today = Date.now() - bday;
      // eslint-disable-next-line
      dob = Math.floor(today / 1000 / 60 / 60 / 24 / 365);
      console.log(dob);
      if (dob < 18) {
        alert("Minimum age is 18 years...");
        return window.location.reload();
      }
      const data = {
        name,
        email,
        password,
        dob,
        phone,
      };

      setName("");
      setEmail("");
      setPassword("");
      setDob("");
      setPhone("");

      // console.log(data);
      const response = await fetch(API_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // eslint-disable-next-line
      const json = await response.json();
      // console.log(json);

      if (response.status === 403) {
        alert("User Already Exist");
      }
      if (response.status === 201) {
        alert("User Successfully Registered");
        // navigate to login page
        navigate("/signIn");
      }
      if (response.status === 500) {
        alert("Some Internal Server Error");
      }
    },
    [name, email, password, dob, phone]
  );

  return (
    <>
      <form
        className="p-4 p-md-5 border rounded-3 bg-light container mt-5"
        onSubmit={formSubmitted}
      >
        <h3>Sign UP</h3>
        <div className="form-floating mb-3">
          <input
            type="name"
            minLength="2"
            className="form-control"
            id="name"
            required
            placeholder="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            required
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="dob"
            required
            placeholder="date of birth"
            value={dob}
            onChange={(event) => {
              setDob(event.target.value);
            }}
          />
          <label htmlFor="floatingInput">Date of Birth</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            id="tel"
            required
            placeholder="phone number"
            minLength="10"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <label htmlFor="floatingInput">Phone Number</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <Link to="/signIn">Already a User</Link>
          </label>
        </div>
        <button className="rounded fs-5 w-100 btn btn-primary" type="submit">
          Sign up
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignUp;
