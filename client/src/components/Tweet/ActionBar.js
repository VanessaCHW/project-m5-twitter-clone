import React from "react";
import styled from "styled-components";
import { FiRepeat,FiHeart,FiUpload } from "react-icons/fi";
import {BiMessageRounded} from "react-icons/bi";
import { useHistory } from "react-router-dom";

const ActionBar = ({tweet, setUserFeed}) =>{
    const currentPage = useHistory().location.pathname;

    const handleLike = (event)=>{
        event.stopPropagation();

        fetch(`/api/tweet/${tweet.id}/like`, {
            method: "PUT",
            body: JSON.stringify({like: !tweet.isLiked}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              }
        })
        .then((res)=>{
            console.log("Like request: ", res.json());
            if(currentPage==="/"){
                fetch("/api/me/home-feed")
                .then((res)=>res.json())
                .then((res)=>{
                    setUserFeed(Object.values(res.tweetsById).reverse());
                    console.log(Object.values(res.tweetsById).reverse());
            })
            }else{
                fetch(`/api${currentPage}/feed`)
                .then((res)=>res.json())
                .then((res)=>{
                    setUserFeed(Object.values(res.tweetsById).reverse());
                    console.log("Profile feed",Object.values(res.tweetsById).reverse());
            })}
        })
    };

    const handleLikeTab = (event)=>{
        if(event.key ==="Enter"){
            event.preventDefault();
            handleLike(event);
        }
      };

    const handleClick = (event)=>{
        event.stopPropagation();
    };

    return <Wrapper>
        <Action tabIndex="-1">
            <HeartButton onClick={handleClick} tabIndex="0">
                <BiMessageRounded/>
            </HeartButton>
        </Action><Count> </Count>
        <Action tabIndex="-1">
            <HeartButton onClick={handleClick} tabIndex="0">
            <FiRepeat/>
            </HeartButton>
        </Action>{tweet.retweetFrom? <Count>1</Count>: <Count/>}
        <Action tabIndex="-1">
            <HeartButton onClick={handleLike} onKeyDown={handleLikeTab} tabIndex="0">
                <FiHeart/>
            </HeartButton>
        </Action>{tweet.isLiked? <Count>{tweet.numLikes}</Count>: <Count/>}
        <Action tabIndex="-1">
            <HeartButton onClick={handleClick} tabIndex="0">
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
    justify-content:left;
    position: relative;
    left: -12px;
    `;

const Action = styled.button`
    align-items: center;
    justify-content: center;
    display: block;
    text-align: left;
    padding:0;
    margin:0;
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
      background-color: pink;
      outline: none;
  }
`;

const Count = styled.div`
    text-align: left;
    width: 88px;
    padding-right:0;
    margin: 0;
    color: gray;
    font-size:13px;
`;


export default ActionBar;

