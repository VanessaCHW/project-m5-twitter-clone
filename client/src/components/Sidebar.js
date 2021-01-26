import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import {COLORS} from "../constants";

import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { ReactComponent as Logo } from "../logo.svg";

const Sidebar = () =>{
     
    return (
<SidebarContainer>
    <Logo width="50px" />
    <NavigationLink to="/" exact={true}>
        <FiHome/>
        <BarSection>Home</BarSection>
    </NavigationLink>
    <NavigationLink strict to="/treasurymog">
        <FiUser/>
        <BarSection>Profile</BarSection>
    </NavigationLink>
    <NavigationLink strict to="/notifications">
        <FiBell/>
        <BarSection>Notifications</BarSection>
    </NavigationLink>
    <NavigationLink strict to="/bookmarks">
        <FiBookmark/>
        <BarSection>Bookmarks</BarSection>
    </NavigationLink>
</SidebarContainer>
);
};

export default Sidebar;

const NavigationLink = styled(NavLink)`
  /* default styles here */
  display: block;
  color: black;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;

  &:focus{
      outline-color: #00A2ED;
      outline-width: 1px;
  }
  
  &.active {
    color: ${COLORS.primary};
  }

  &:hover {
    color: ${COLORS.primary};
      background-color: #eee8fe;
      border-radius: 100px;
  }
`;

const SidebarContainer = styled.div`
    height: 100vh;
    padding-left: 10px;
    padding-right: 10px;

`;

const BarSection = styled.div`
    margin-left: 12px;
    display: inline-block;
`;
