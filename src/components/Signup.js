import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let history = useNavigate();
  const [signupCredentials, setsignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: signupCredentials.name,
        email: signupCredentials.email,
        password: signupCredentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setsignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value,
    });
    // console.log(signupCredentials)
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div class="mb-3">
          <label for="cpassword" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
