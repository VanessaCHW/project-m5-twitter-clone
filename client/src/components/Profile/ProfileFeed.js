import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Tweet from "../Tweet/Tweet";
import LoadingIcon from "../../components/LoadingIcon";

const ProfileFeed = ({userHandle}) =>{

    const [userFeed, setUserFeed]= useState(null);
    useEffect(()=>{
            fetch(`/api/${userHandle}/feed`)
            .then((res)=>res.json())
            .then((res)=>{
                setUserFeed(Object.values(res.tweetsById).reverse());
                console.log("Profile feed",Object.values(res.tweetsById).reverse());
            })
            .catch((error)=>console.error('Error (fetch user tweets)',error))
        
    },[]);

    return (
    <Wrapper>
        {userFeed ? 
            userFeed.map((tweet)=>
            <Tweet 
                tweet={tweet} 
                key={tweet.id}
                setUserFeed={setUserFeed}/>)
            :<LoadingIcon/> } 
    </Wrapper>
    );
};

export default ProfileFeed;

const Wrapper = styled.div`
    width: 600px;
`;

const SectionBox = styled.div`
  
    border: 1px solid #eaebee;
    border-bottom: none;
    padding: 12px 10px;
`;
