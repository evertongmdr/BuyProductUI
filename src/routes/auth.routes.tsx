
import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/ManageUser/SignUp";

const AuthRoutes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
    </React.Fragment>
  );
};


export default AuthRoutes;
