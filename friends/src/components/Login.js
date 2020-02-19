import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Loader from "react-loader-spinner";


const Login = props => {
  const [ credentials, setCredentials ] = useState({
    username: "",
    password: ""
  });
  const [ isLoading, setIsLoading ] = useState(false);

  const loading = () => {
    setIsLoading(true);
  }

  const handleChange = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch(err => {
        localStorage.removeItem("token");
        console.log("invalid login: ", err);
      });
  };

  return (
    <div>
      {isLoading && (
          <div>
            <Loader type="Puff" color="#204963" height={60} width={60} />
            <p>Logging you in now...</p>
          </div>
        )}
      <form onSubmit={login} >
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button onClick={loading}>Log in</button>
      </form>
    </div>
  )
}

export default Login