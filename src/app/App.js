import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Posts } from "../common/DummyPage";
import { LandingPage } from "../common/LandingPage";
import { NotFoundPage } from "../common/NotFoundPage";
import { AuthGuardedRoute } from "../features/signin/AuthGuardedRoute";
import { LoginPage } from "../features/signin/LoginPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="menu navbar">
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dummy">Posts</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <AuthGuardedRoute exact path={["/", "/index.html"]}>
          <LandingPage />
        </AuthGuardedRoute>
        <AuthGuardedRoute path={["/dummy", "/wtfk"]}>
          <Posts />
        </AuthGuardedRoute>
        <AuthGuardedRoute path="/login">
          <LoginPage />
        </AuthGuardedRoute>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
