import { useSelector } from "react-redux";
import { selectSignin } from "../features/signin/signinSlice";
import "./DummyPage.css";

// import bender from "./bender.png";

export function LandingPage() {
  const { loggedInUser } = useSelector(selectSignin);

  return (
    <div className="page-landing center">
      <h1>Home page</h1>
      <p>Welcome {loggedInUser.firstName}.</p>
    </div>
  );
}
