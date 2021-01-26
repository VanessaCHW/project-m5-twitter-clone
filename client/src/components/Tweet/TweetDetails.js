import React, {useContext} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {BsArrowLeftShort} from "react-icons/bs";
import {TweetDetailsContext} from "./TweetDetailsContext";
import {format} from 'date-fns';
import ActionBarDetails from "./ActionBarDetails";
import { FiRepeat} from "react-icons/fi";

const TweetDetails = () =>{
    const {currentTweet} = useContext(TweetDetailsContext);
    let history = useHistory();

    return (
    <Wrapper>
        <TitleBox>
            <Arrow><BsArrowLeftShort/></Arrow>
            <SectionTitle>Meow</SectionTitle>
        </TitleBox>
        <SectionBox>
        {currentTweet.retweetFrom? <Retweeted><FiRepeat/> {currentTweet.retweetFrom.displayName} Remeowed</Retweeted>:null}
        <HeaderTweet>
            <Avatar src={currentTweet.author.handle==="giantcat9"? 
            "https://pbs.twimg.com/profile_images/1348661903741038596/jH448dJ4_400x400.jpg"
            :currentTweet.author.avatarSrc}/>
            <Name>
                <DisplayName 
                tabIndex="0" 
                onClick={()=>{history.push(`/${currentTweet.author.handle}`);}}
                onKeyDown={(e)=>{if(e.key ==="Enter"){history.push(`/${currentTweet.author.handle}`);}}}>
                    {currentTweet.author.displayName}</DisplayName>
                <Handle>@{currentTweet.author.handle}</Handle>
            </Name>
        </HeaderTweet>
        <Content>
            <Status>{currentTweet.status}</Status>
            {currentTweet.media[0]? <Image src={currentTweet.media[0].url}/>: null}
            <FooterTweet>
                <FooterContent>{format(new Date(currentTweet.timestamp),'p')}</FooterContent>
                <FooterContent>· {format(new Date(currentTweet.timestamp),'MMM d Y')}</FooterContent>
                <FooterContent>· Critter web app</FooterContent>
            </FooterTweet>
        </Content>
        <ActionBarDetails tweet={currentTweet}/>
        </SectionBox>
        <BottomBox/>
    </Wrapper>
    );
};

const Retweeted = styled.div`
  color: gray;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding-bottom: 10px;
  box-sizing: border-box;

`;
const FooterTweet = styled.div`
    display: flex;
    flex-direction: row;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: #4F515A;
    padding: 10px 0px;
`;
const FooterContent = styled.div`
    padding-right: 5px;
`;
const Name = styled.div`
    padding-left: 14px;
`;
const HeaderTweet = styled.div`
    display: flex;
    flex-direction: row;
`;
const SectionBox = styled.div`
    border: 1px solid #eaebee;
    border-bottom: none;
    padding: 12px 14px;
    padding-bottom:2px;
    display:flex;
    flex-direction: column; 
    &:focus{
        outline-color: #00A2ED;
        outline-width: 1px;
    }
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-left:0px;
`;
const DisplayName = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
  z-index:10;
  background-color: white;
  padding-top: 4px;
  &:hover{
    cursor: pointer;
    text-decoration: underline;}
    &:focus{
        outline-color: #00A2ED;
        outline-width: 1px;
    }
`;
const Handle = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: gray;
`;

const Status = styled.div`
    overflow-wrap: break-word;
    padding-top: 14px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    width: 100%;
`;
const Image = styled.img`
  max-width:100%;
  min-width:100%;
  max-height:100%;
  border-radius: 14px;
  margin-bottom: 4px;
  margin-top: 10px;
  border: 0.5px solid #eaebee;
`;
const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
const Wrapper = styled.div`
    width: 600px;
    display:flex;
    flex-direction: column;
`;
const TitleBox = styled.div`
    border: 1px solid #EBEEF0;
    border-bottom: none;
    padding: 12px 14px;
    display: flex;
    align-items: center;
`;
const BottomBox = styled.div`
    border: 1px solid #EBEEF0;
    border-bottom: none;
    padding: 12px 14px;
    flex-grow: 1;`;
const SectionTitle = styled.div`
    font-weight: bold;
    font-size: 22px;
    padding-left: 10px;
`;
const Arrow = styled.div`
    font-size: 22px;
    line-height: 16px;
`;

export default TweetDetails;