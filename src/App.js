import React from "react";
import { Auth } from "aws-amplify";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";

async function signOut() {
  try {
    await Auth.signOut({ global: true }).then(() => {
      window.location = "/cats";
    });
  } catch (error) {
    console.log(error);
  }
}

function App() {
  return (
    <div className="App">
      <button onClick={signOut}>Logout</button>
    </div>
  );
}

export default withAuthenticator(App);
