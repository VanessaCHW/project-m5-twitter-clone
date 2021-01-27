import React from "react";
import styled from "styled-components";
import { FiRepeat,FiHeart,FiUpload } from "react-icons/fi";
import {BiMessageRounded} from "react-icons/bi";
import { useHistory } from "react-router-dom";

const ActionBar = ({tweet, setUserFeed}) =>{
    const currentPage = useHistory().location.pathname;
    
// PUT request to like/unike
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
            if(currentPage==="/"){
                fetch("/api/me/home-feed")
                .then((res)=>res.json())
                .then((res)=> setUserFeed(Object.values(res.tweetsById).reverse()))
            }else{
                fetch(`/api${currentPage}/feed`)
                .then((res)=>res.json())
                .then((res)=> setUserFeed(Object.values(res.tweetsById).reverse()))}
        })
    };

// PUT request to like/unlike while using TAB
    const handleLikeTab = (event)=>{
        if(event.key ==="Enter"){
            event.preventDefault();
            handleLike(event);
        }
      };

// Placeholder function for reply/share/retweet
    const handleClick = (event)=>{
        event.stopPropagation();
    };

    return <Wrapper>
        <Action tabIndex="-1">
            <ReplyShare onClick={handleClick} tabIndex="0">
                <BiMessageRounded/>
            </ReplyShare>
        </Action><Count> </Count>
        <Action tabIndex="-1">
            <Retweet onClick={handleClick} tabIndex="0">
            <FiRepeat/>
            </Retweet>
        </Action>{tweet.retweetFrom? <Count>1</Count>: <Count/>}
        <Action tabIndex="-1">
            <HeartButton onClick={handleLike} onKeyDown={handleLikeTab} tabIndex="0"  aria-label="like tweet">
                <FiHeart/>
            </HeartButton>
        </Action>{tweet.isLiked? <Count>{tweet.numLikes}</Count>: <Count/>}
        <Action tabIndex="-1">
            <ReplyShare onClick={handleClick} tabIndex="0">
                <FiUpload/>
            </ReplyShare>
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
    background-color:rgb(251,229,236);
      color: rgb(224, 36, 94);
  }
  &:focus{
      outline: none;
      background-color:rgb(251,229,236);
  }
`;

const ReplyShare=styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 38px;
  height: 38px;
  &:hover{
      background-color: rgb(228,243,251);
      color: rgb(27, 149, 224);
  }
  &:focus{
      outline: none;
      background-color: rgb(228,243,251);
  }
`;

const Retweet=styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 38px;
  height: 38px;
  &:hover{
      background-color: rgb(228,247,237);
      color: rgb(23, 191, 99);
  }
  &:focus{
      outline: none;
      background-color: rgb(228,247,237);
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

