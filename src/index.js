import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/pokemon/:id" component={PokemonDetails} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById("root")
);
