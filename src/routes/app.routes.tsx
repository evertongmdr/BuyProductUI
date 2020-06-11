import React from 'react';
import { Route, Switch } from "react-router-dom";
import SearchProduct from "../pages/ManageProduct/SearchProduct";
import ManageOrder from "../pages/ManageOrder";
import RegisterProduct from "../pages/ManageProduct/RegisterProduct";

const AppRoutes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
          <Route path="/product" component={SearchProduct} />
          <Route path="/register-product" component={RegisterProduct} />
          <Route path="/update-product" component={RegisterProduct} />
          <Route path="/order" component={ManageOrder} />
        </Switch>
    </React.Fragment>
  );
};


export default AppRoutes;
