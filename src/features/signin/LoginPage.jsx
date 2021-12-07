import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "./signinSlice";
import "./LoginPage.css";

export function LoginPage() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  return (
    <div className="page-login ">
      <p className="center">
        You must log in to view the page at {from.pathname}
      </p>
      <form className="login-form">
        <div className="form-group">
          <label
            className="left"
            htmlFor="username"
            style={{ display: "block" }}
          >
            Username:
          </label>
          <input
            id="username"
            className="input"
            name="username"
            type="text"
            required
            size="32"
            value={formState.username}
            onChange={handleFormStateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ display: "block" }}>
            Password:
          </label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            required
            size="32"
            value={formState.password}
            onChange={handleFormStateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rememberMe">Remember me</label>
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formState.rememberMe}
            onChange={handleFormStateChange}
          />
        </div>
        <button className="submit" onClick={handleOnClick}>
          Login
        </button>
      </form>
    </div>
  );

  function handleFormStateChange(event) {
    const { name, type, value, checked } = event.target;

    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleOnClick(event) {
    event.preventDefault();
    await dispatch(login(formState));

    history.replace(from);
  }
}
