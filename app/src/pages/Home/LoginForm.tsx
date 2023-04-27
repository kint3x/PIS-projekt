import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authRequest } from '../../store/ducks/employee/actions';
import { AppState } from '../../store';
import jwtDecode, { JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  groups: string[]
  upn: string
}

const LoginForm = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState("");

  const token = useSelector((state: AppState) => state.employee.token);
  const error = useSelector((state: AppState) => state.employee.error);
  const errMsg = useSelector((state: AppState) => state.employee.errMsg);

  useEffect(() => {
    if (error) {
      console.log(errMsg) //TODO correct error msg
      setErrorMessage("Invalid login!")
    }
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);

      let userType: string
      if (decodedToken.groups.includes("owner")) {
        userType = "owner"
      } else if (decodedToken.groups.includes("manager")) {
        userType = "manager"
      } else {
        userType = "worker"
      }

      localStorage.setItem("userType", userType)
      localStorage.setItem('jwtToken', token)
      localStorage.setItem("name", decodedToken.upn);


      history.push("/clients")
    }
  }, [token, error, errMsg]);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authRequest(username, password));
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
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