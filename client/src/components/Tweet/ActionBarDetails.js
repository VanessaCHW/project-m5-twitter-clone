import React, { useState } from "react";
import styled from "styled-components";
import { FiRepeat,FiHeart,FiUpload } from "react-icons/fi";
import {BiMessageRounded} from "react-icons/bi";
import { useHistory } from "react-router-dom";

const ActionBar = ({tweet}) =>{
    const currentPage = useHistory().location.pathname;
    const [isLiked, setIsLiked] = useState(tweet.isLiked);

    const handleLike = (event)=>{
        event.stopPropagation();

        fetch(`/api/tweet/${tweet.id}/like`, {
            method: "PUT",
            body: JSON.stringify({like: !isLiked}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              }
        })
        .then((res)=>{
            console.log("Like request: ", res.json());
            setIsLiked(!isLiked);
        })
    };

    const handleClick = (event)=>{
        event.stopPropagation();
    };

    return <Wrapper>
        <Action tabIndex="-1">
            <HeartButton onClick={handleClick}  tabIndex="0">
                <BiMessageRounded/>
            </HeartButton>
        </Action><Count> </Count>
        <Action tabIndex="-1">
            <HeartButton onClick={handleClick}  tabIndex="0">
            <FiRepeat/>
            </HeartButton>
        </Action><Count> </Count>
        <Action tabIndex="-1">
            <HeartButton onClick={handleLike}  tabIndex="0">
                <FiHeart/>
            </HeartButton>
        </Action>{isLiked? <Count>{1}</Count>: <Count/>}
        <Action tabIndex="-1">
            <HeartButton onClick={handleClick}  tabIndex="0">
                <FiUpload/>
            </HeartButton>
        </Action><Count> </Count>
    </Wrapper>

};

const Wrapper = styled.div`
    width: 100%;
    margin:0;
    padding:0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    `;

const Action = styled.button`
    align-items: center;
    display: flex;
    flex-direction: row;
    text-align: center;
    padding:0;
    margin:0;
    margin-left: 30px;
    border:none;
    width: 38px;
    height: 38px;
    font-size:18px;
    color: grey;
    background-color: transparent;

    &:hover{
    cursor: pointer;
    }
`;

const HeartButton=styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 38px;
  height: 38px;
  &:hover{
      background-color: red;
  }
  &:focus{
      outline: none;
      background-color: pink;
  }
`;

const Count = styled.div`
    text-align: left;
    padding-right:0;
    margin: 0;
    color: gray;
    font-size:13px;
    width: 70px;
`;


export default ActionBar;

