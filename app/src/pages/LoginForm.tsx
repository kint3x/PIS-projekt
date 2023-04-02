import React from "react"
import './LoginForm.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useHistory } from "react-router-dom";
import { useState } from 'react'

const LoginForm = ({method}:any) => {

  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState("");
  

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "worker" || username === ""){
      history.push("/worker/clients")
      method("worker","worker")
    }
    else if (username === "manager") {
      history.push("/manager")
      method("manager","manager")
    }
    else if (username === "customer-department") {
      history.push("/customer-department")
      method("customer-department","customer-department")
    }
    else{
      setErrorMessage("Invalid username or password!")
    }
  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="Enter username"
              value = {username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="error-message-container">
            {errorMessage && <div className="error"> {errorMessage} </div>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;