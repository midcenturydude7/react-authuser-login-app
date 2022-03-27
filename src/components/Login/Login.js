import React from "react";
import PropTypes from "prop-types";

import "./Login.css"

async function LoginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = async event => {
    event.preventDefault();
    const token = await LoginUser({
      username,
      password
    });
    setToken(token)
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In Motherfucker!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={event => setUsername(event.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={event => setPassword(event.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
