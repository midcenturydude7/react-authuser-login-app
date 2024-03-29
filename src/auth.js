import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import App from "./App";

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: "AIzaSyD8jdiOBnN2a5_aLWwKx2SzXRuyF9SWZBs",
  authDomain: "react-authuser-login.firebaseapp.com",
  databaseURL: "https://react-authuser-login-default-rtdb.firebaseio.com",
  projectId: "react-authuser-login",
  storageBucket: "react-authuser-login.appspot.com",
  appId: "1:782901313832:web:2a30cade890384e43e901d",
  measurementId: "G-S7LLXDEP2X"
});

function AuthProvider() {
  const [authState, setAuthState] = React.useState({ status: "loading" });

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (hasuraClaim) {
          setAuthState({ status: "in", user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref("metadata/" + user.uid + "/refreshTime");

          metadataRef.on("value", async (data) => {
            if(!data.exists) return
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: "in", user, token });
          });
        }
      } else {
        setAuthState({ status: "out" });
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      setAuthState({ status: "loading" });
      await firebase.auth().signOut();
      setAuthState({ status: "out" });
    } catch (error) {
      console.log(error);
    }
  };

  let content;
  if (authState.status === "loading") {
    content = null;
  } else {
    content = (
      <>
        <div>
          {authState.status === "in" ? (
            <div>
              <h2>Welcome, {authState.user.displayName}</h2>
              <button onClick={signOut}>Sign out</button>
            </div>
          ) : (
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          )}
        </div>

        <App authState={authState} />
      </>
    );
  }

  return <div className="auth">{content}</div>;
}

export default AuthProvider;
