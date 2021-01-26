import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {Icon} from "react-icons-kit";
import { u1F4A3 as bomb } from 'react-icons-kit/noto_emoji_regular/u1F4A3'; 

const ErrorMsg = ()=>{
    return <Wrapper>
        <Icon size={60} icon={bomb}/>
        <Title>An unknown error has occured.</Title>
        <Refresh>Please try refreshing the page, or contact support if the problem persists.</Refresh>
    </Wrapper>
};

const Refresh = styled.div`
    font-size: 15px;
    padding: 0px 120px;
    text-align: left;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 20px;
    padding-top: 30px;
    padding-bottom: 20px;
`;

const Wrapper = styled.div`
  
    border: 1px solid #EBEEF0;
    border-bottom: none;
    padding-top:60px;
    height: 100%;
    margin:0;
    box-sizing: border-box;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    justify-content: center;
`;

export default ErrorMsg;
