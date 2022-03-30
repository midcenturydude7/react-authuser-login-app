import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import EditProfilePage from "./pages/edit_profile";
import LandingPage from "./pages/landing_page";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/not-found";
import ProfilePage from "./pages/profile";
import SignUpPage from "./pages/signup";


function App() {

  return (
    <div className="wrapper">
      <h1>Login Application</h1>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/accounts/login" component={LoginPage} />
          <Route exact path="/accounts/profile" component={ProfilePage}/>
          <Route exact path="/accounts/edit" component={EditProfilePage} />
          <Route exact path="/accounts/emailsignup" component={SignUpPage} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
