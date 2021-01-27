import React, {useContext} from "react";
import styled from "styled-components";
import { format } from 'date-fns';
import { useHistory } from "react-router-dom";
import ActionBar from "./ActionBar";
import {TweetDetailsContext} from "./TweetDetailsContext";
import { FiRepeat} from "react-icons/fi";

const Tweet = ({tweet, setUserFeed}) =>{
    const {setCurrentTweet} = useContext(TweetDetailsContext);
    let history = useHistory();

    const handleNameClick = (event)=>{
      event.stopPropagation();
      history.push(`/${tweet.author.handle}`);
      window.location.reload();
    };
    const handleNameTab = (event)=>{
      if(event.key ==="Enter"){
        event.stopPropagation();
        history.push(`/${tweet.author.handle}`);
        window.location.reload();
      }
    };

    const handleTweetClick = ()=>{
      setCurrentTweet(tweet);
      history.push(`/tweet/${tweet.id}`);
    };

    const handleTweetTab = (event)=>{
      if(event.key ==="Enter"){
        setCurrentTweet(tweet);
        history.push(`/tweet/${tweet.id}`);
      }
    };

    return (
  <Wrapper>
    {tweet.retweetFrom? <Retweeted><FiRepeat/> {tweet.retweetFrom.displayName} Remeowed</Retweeted>:null}
    <SectionBox onClick={handleTweetClick} onKeyDown={handleTweetTab} tabIndex="0" aria-label="view tweet">
      <Avatar src={tweet.author.handle==="giantcat9"? "https://pbs.twimg.com/profile_images/1348661903741038596/jH448dJ4_400x400.jpg"
      :tweet.author.avatarSrc}/>
      <Content>
        <DisplayName onClick={handleNameClick} onKeyDown={handleNameTab} tabIndex="0" aria-label="view profile">{tweet.author.displayName}</DisplayName>
        <Username >@{tweet.author.handle}</Username>
        <Time>· {format(new Date(tweet.timestamp),'MMM do')}</Time>
        <Status>{tweet.status}</Status>
        {tweet.media[0]? <Image src={tweet.media[0].url}/>: null}
        <ActionBar tweet={tweet} setUserFeed={setUserFeed}/>
      </Content>
    </SectionBox>
  </Wrapper>
    );
};

const Retweeted = styled.div`
  width: 100%;
  color: gray;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding-left: 50px;
  padding-top: 11px;

`;

const Wrapper = styled.div`
    border: 1px solid #eaebee;

`;

const SectionBox = styled.div`
    border-bottom: none;
    padding: 12px 14px;
    padding-bottom:2px;
    display:flex;
    flex-direction: row; 
    &:hover{
    cursor: pointer;}
    &:focus{
      outline-color: #00A2ED;
      outline-width: 1px;
    }
`;
const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-left:16px;
`;
const DisplayName = styled.div`
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
  z-index:10;
  background-color: white;
  &:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  &:focus{
    outline-color: #00A2ED;
      outline-width: 1px;
    }
`;
const Username = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: gray;
  padding-left: 5px;
`;
const Time = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: gray;
  padding-left: 5px;
`;
const Status = styled.div`
    width: 480px;
    overflow-wrap: break-word;
    padding-top: 4px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
`;
const Image = styled.img`
  max-width:100%;
  min-width:100%;
  max-height:100%;
  border-radius: 14px;
  margin-bottom: 4px;
  margin-top: 8px;
  border: 0.5px solid #eaebee;
`;

export default Tweet;
