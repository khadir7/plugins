import React from "react";
import { Route, Switch } from "react-router-dom";

// import Login from "components/login";
import Home from "components/home";
import SearchTerm from "components/searchTerm";
import SuggestTerm from "components/suggestTerm";
import DetailComponent from "components/DetailComponent";
import UserComponent from "components/UserComponent";
import LogOut from "components/LogOut";
import ServiceDesk from "components/serviceDesk";
import Favourite from "components/favourite";

const SwitchComponent = (props) => (
  <Switch>
    {/* <Route exact path={"/"}>
      <Login {...props} />
    </Route> */}
    <Route exact path={"/"}>
      <Home {...props} />
    </Route>
    <Route path="/search/term">
      <SearchTerm {...props} />
    </Route>
    <Route path="/suggestTerm">
      <SuggestTerm {...props} />
    </Route>
    <Route path="/detail/:type">
      <DetailComponent {...props} />
    </Route>
    <Route path="/user">
      <UserComponent {...props} />
    </Route>
    <Route path="/logout">
      <LogOut {...props} />
    </Route>
    <Route path="/service-desk/:context?">
      <ServiceDesk {...props} />
    </Route>
    <Route path="/favourite">
      <Favourite {...props} />
    </Route>
  </Switch>
);

export default SwitchComponent;
