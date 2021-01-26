import React from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import TweetDetails from "./components/Tweet/TweetDetails";
import Profile from "./components/Profile/Profile";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import {CurrentUserProvider} from "./components/CurrentUserContext";
import {TweetDetailsProvider} from "./components/Tweet/TweetDetailsContext";
import GlobalStyles from "./components/GlobalStyles";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyles/>
    <CurrentUserProvider>
    <TweetDetailsProvider>
      <Router>
      <Sidebar/>
        <Switch>      
          <Route exact path="/">
            <HomeFeed/>
          </Route>
          <Route exact path="/notifications">
            <Notifications/>
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks/>
          </Route>
          <Route exact path="/tweet/:tweetId">
            <TweetDetails/>
          </Route>
          <Route exact path="/:profileId">
            <Profile />
          </Route>
        </Switch>
      </Router>
      </TweetDetailsProvider>
    </CurrentUserProvider>
    </Wrapper>
  )};

export default App;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
