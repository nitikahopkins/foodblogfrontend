import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import "./App.css";

function App() {
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [signInForm, setSignInForm] = useState({ username: "", password: "" });

  async function signOut() {
    try {
      await Auth.signOut({ global: true }).then(() => {
        window.location = "";
      });
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

  // useEffect(() => {
  //   (async () => console.log(await Auth.currentAuthenticatedUser()))();
  // }, []);
  return (
    <div className="App">
      <button onClick={signOut}>Logout</button>
      <div>
        <input
          onChange={(e) =>
            setSignInForm({ ...signInForm, username: e.target.value })
          }
        />
        <input
          type="password"
          onChange={(e) =>
            setSignInForm({ ...signInForm, password: e.target.value })
          }
        />
        <button onClick={signIn}>Sign In</button>
      </div>
    </div>
  );
}

export default App;
