import "./index.css";

import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import OnRouteChange from "./utils/OnRouteChange";

import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";

const Routing = () => {
  return (
    <Router>
      <OnRouteChange>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/pokemon/:id" component={PokemonDetails} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </OnRouteChange>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Routing />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
