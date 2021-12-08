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
    <>
      <div className="flex container">
        <div className="page-login flex-35 ">
          {/* <p>You must log in to view the page at {from.pathname}</p> */}
          <p className="formheading">Welcome to Silara</p>
          <form className="flex column">
            <div className="inputfield">
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
                // style={{ backgroundColor: "orange" }}
                name="username"
                type="text"
                required
                size="32"
                value={formState.username}
                onChange={handleFormStateChange}
              />
              <hr />

              <label
                className="left"
                htmlFor="password"
                style={{ display: "block" }}
              >
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
            <div className="flex middle">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formState.rememberMe}
                onChange={handleFormStateChange}
              />
              <label className="left" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <button className="submit" onClick={handleOnClick}>
              LOG IN
            </button>
          </form>
        </div>
        <img alt="image2" className="image flex-65" />
      </div>
    </>
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
