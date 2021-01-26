import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Tweet from "./Tweet/Tweet";
import LoadingIcon from "./LoadingIcon";
import {CurrentUserContext} from "./CurrentUserContext";
import {COLORS} from "../constants";
import ErrorMsg from "./ErrorMsg";

const HomeFeed = () =>{
    const {currentUser, status} = useContext(CurrentUserContext);
    const [newTweet, setNewTweet] = useState({
        content: "",
        numCharLeft: "280"
    });
    const [userFeed, setUserFeed]= useState(null);
    const [buttonState, setButtonState]=useState(true);
    const [countColor, setColor] = useState("#D2D2D7");
    const [homeFeedStatus, setHomeStatus] = useState("loading");
    
    // Get user feed on mount
    useEffect(()=>{
            fetch("/api/me/home-feed")
            .then((res)=>res.json())
            .then((res)=>{
                setUserFeed(Object.values(res.tweetsById).reverse());
                console.log(Object.values(res.tweetsById).reverse());
                setHomeStatus("idle");
            })
            .catch((error)=>{
                console.error('Error (fetch homefeed)',error);
                setHomeStatus("error");
            })
    }, []);

    // Keep new tweet in a state and determine the number of characters + color
    // deduce if submit button is disabled
    const handleNewTweet = (event)=>{
        setNewTweet({
            content: event.target.value,
            numCharLeft: 280 - event.target.value.length})
        if(event.target.value.length >0 && event.target.value.length<280){
            setButtonState(false);
            event.target.value.length>225? setColor("#ffd633") : setColor("#D2D2D7"); //yellow:grey
        }else{
            setButtonState(true);
            event.target.value.length===0? setColor("#D2D2D7"):setColor("red"); //grey:red
        }
    };

    // POST the new tweet and get the new user feed
    const handleSubmit = (event)=>{
        event.preventDefault();
        fetch("/api/tweet", {
            method: "POST",
            body: JSON.stringify({status: newTweet.content}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              }
        })
        .then((res)=>{
            console.log(res.json());
            setNewTweet({
                content: "",
                numCharLeft: 280});
        })
        .catch((error)=>{
            console.error('Error (fetch homefeed after tweet)',error);
            setHomeStatus("error");
        })
        .then(()=>{
            fetch("/api/me/home-feed")
            .then((res)=>res.json())
            .then((res)=>{
                setUserFeed(Object.values(res.tweetsById).reverse());
                console.log(Object.values(res.tweetsById).reverse());
                setHomeStatus("idle");
            })
        })
        .catch((error)=>{
            console.error('Error (fetch homefeed after tweet)',error);
            setHomeStatus("error");
        })
    };

    // Conditional render of the Homefeed
    const renderHomefeed = () =>{
        switch(homeFeedStatus){
            case "loading":
                return <Wrapper><LoadingIcon/></Wrapper>;
            case "error":
                return <Wrapper><ErrorMsg/></Wrapper>;
            case "idle":
                return userFeed.map((tweet)=><Tweet tweet={tweet} key={tweet.id} setUserFeed={setUserFeed}/>)
        }
    };

    // Conditionnal render of the page
    // Depending on currentUser
    switch(status){
        case 'loading':
            return <Wrapper><LoadingIcon/></Wrapper>;

        case 'error':
            return <Wrapper><ErrorMsg/></Wrapper>;

        case 'idle':
            return <Wrapper>
            <SectionBox><SectionTitle>Home</SectionTitle></SectionBox>
            <SectionBox>
                <StyledForm onSubmit={handleSubmit}>
                <FormSection1>
                    <Avatar src={currentUser.avatarSrc}/>
                    <StyledTextArea 
                    id="tweet-content"
                    type="text" 
                    placeholder="What's happening?"
                    rows="5" cols="1"
                    value={newTweet.content}
                    onChange={handleNewTweet}
                    />
                </FormSection1>
                <FormSection2>
                    <CharCount style={{color: countColor}}>{newTweet.numCharLeft}</CharCount>
                <StyledButton type="submit" disabled={buttonState}>Meow</StyledButton>
                </FormSection2>
                </StyledForm>
            </SectionBox>
            <Divider/>  
            {renderHomefeed()}
            </Wrapper>
    }

// OLD VERSION

  /*  return (
    <Wrapper>
        {status ==="loading"? <LoadingIcon/>: 
        <>
        <SectionBox>
            <SectionTitle>Home</SectionTitle>
        </SectionBox>
        <SectionBox>

        <StyledForm onSubmit={handleSubmit}>
        <FormSection1>
            <Avatar src={currentUser.avatarSrc}/>
            <StyledTextArea 
            id="tweet-content"
            type="text" 
            placeholder="What's happening?"
            rows="5" cols="1"
            value={newTweet.content}
            onChange={handleNewTweet}
            />
        </FormSection1>
        <FormSection2>
            <CharCount style={{color: countColor}}>{newTweet.numCharLeft}</CharCount>
        <StyledButton type="submit" disabled={buttonState}>Meow</StyledButton>
        </FormSection2>
        </StyledForm>

        </SectionBox>
        <Divider/>

        {userFeed ? userFeed.map((tweet)=>
            <Tweet tweet={tweet} key={tweet.id} setUserFeed={setUserFeed}/>)
            :<LoadingIcon/> }     
            </>}
    </Wrapper>
    );*/
};

export default HomeFeed;

const Wrapper = styled.div`
    width: 600px;
`;

const SectionBox = styled.div`
  
    border: 1px solid #EBEEF0;
    border-bottom: none;
    padding: 12px 14px;

`;
const Divider = styled.div`
  
    border: 1px solid #EBEEF0;
    border-bottom: none;
    padding: 4px;
    background-color: #F7F9FA;
`;

const FormSection1 = styled.div`
    display:flex;
    flex-direction: row;
`;
const FormSection2 = styled.div`
    width: 100%;
    text-align: right;
`;
const SectionTitle = styled.p`
    display: inline;
    margin:0;
    padding: 20px 0px;
    font-weight: bold;
    font-size: 22px;
`;

const StyledForm = styled.form`
    display: inline;
    padding-top: 0px;
`;

const StyledTextArea = styled.textarea`
    width: 500px;
    border: none;
    padding-top: 10px;
    resize: none;
    font-size: 18px;
    font-family: Helvetica, sans-serif;

    ::placeholder{
        color: lightgray;
    }

    &:active, &:focus{
        outline: none;
    }
`;

const Avatar = styled.img`
    display: inline;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    margin-right: 16px;
`;

const CharCount = styled.p`
    margin:0;
    padding:0;
    color: #D2D2D7;
    display: inline;
    font-size: 15px;

`;
 const StyledButton = styled.button`
    color: white;
    font-size: 16px;
    font-weight: bold;   
    padding: 10px 15px;
    margin-left: 16px; 
    border-radius: 50px;
    background-color: ${COLORS.primary};
    display: inline;

    &:disabled{
        opacity: 50%;
    }

    &:active{
       outline: none;
    }

    &:hover{
        cursor: pointer;
    }
 `;
