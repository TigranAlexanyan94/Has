import React from "react";
import { Admin , Resource} from "react-admin";
import authProvider from "./providers/AuthProvider";
import { createBrowserHistory } from "history";
import Login from "./pages/login/Login";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import Events from "./pages/events/Event";
import "./App.less";
const history = createBrowserHistory();

const App = () => (
  <div className="App">
    <Admin
      loginPage={Login}
      history={history}
      authProvider={authProvider}
      requireAuth
    >
      <Resource name="categories" list={<Categories />} />
      <Resource name="products" list={<Products />}/>
      <Resource name="events" list={<Events />} />
    </Admin>
    <p className="copyRight">
      © 2022 Copyright Instigate Mobile
    </p>
  </div>
);

export default App;
