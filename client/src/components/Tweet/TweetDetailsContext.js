import React, { createContext, useState } from "react";

export const TweetDetailsContext = createContext(null);

export const TweetDetailsProvider = ({ children }) => {
    const [currentTweet, setCurrentTweet] = useState([]);
    const [tweetDetailStatus, setTweetDetailStatus] = useState("loading");
  
    return <TweetDetailsContext.Provider value={{ currentTweet,setCurrentTweet,tweetDetailStatus,setTweetDetailStatus }}>
        {children}
      </TweetDetailsContext.Provider>
    
  };
