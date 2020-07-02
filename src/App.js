import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Router, navigate } from "@reach/router";
import SignInPage from "./components/SignInPage";
import "./App.css";

function Home({ signOut, signedInUser }) {
  if (!signedInUser) navigate("/signin");
  return <button onClick={signOut}>Logout</button>;
}

function NotFound() {
  return <div>There is nothing at this page</div>;
}

function App() {
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [signInForm, setSignInForm] = useState({ username: "", password: "" });
  console.log(signInForm);

  function signOut() {
    try {
      Auth.signOut({ global: true }).then(() => setSignedInUser(undefined));
    } catch (error) {
      console.log(error);
    }
  }

  async function signIn() {
    try {
      console.log(signInForm);
      const user = await Auth.signIn(signInForm.username, signInForm.password);
      setSignedInUser(user);

      console.log(await Auth.currentAuthenticatedUser());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const user = await Auth.currentAuthenticatedUser();
      if (signedInUser) navigate("/");
      setSignedInUser(user);
    })();
  }, []);
  return (
    <div className="App">
      <Router>
        <Home path="/" signOut={signOut} signedInUser={signedInUser} />
        <SignInPage
          path="/signin"
          signIn={signIn}
          setSignInForm={setSignInForm}
          signInForm={signInForm}
        />
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
