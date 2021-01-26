import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {CurrentUserContext} from "../../components/CurrentUserContext";
import {format, parse} from 'date-fns';
import {COLORS} from "../../constants";
import {GrLocation} from "react-icons/gr";
import {FiCalendar} from "react-icons/fi";

import ProfileFeed from "./ProfileFeed";
import LoadingIcon from "../../components/LoadingIcon";


const Profile = () =>{

    // Create the user to be rendered
    const [user, setUser] = useState(null);
    
    // Import currentUser
    const {currentUser} = useContext(CurrentUserContext);

    // Find the handle from the url
    const [userHandle, setHandle] = useState(useHistory().location.pathname.replace("/",''));
    //const userHandle = useHistory().location.pathname.replace("/",'');

    // Fetch new profile if it isn't the current user
    useEffect(()=>{
        
        if(currentUser !== null){if(userHandle !== (currentUser.handle)){
            fetch(`/api/${userHandle}/profile`)
            .then((res)=>res.json())
            .then((res)=>{
                setUser(Object.values(res)[0]);
                console.log("Some Profile:",Object.values(res)[0]);
            })
            .catch((error)=>console.error('Error! loading user profile',error))
        }else{
            setUser(currentUser);
        }}
    },[userHandle, currentUser]);

    return (
    <Wrapper>
        {user===null? <LoadingIcon/> :
        <>
        <SectionBox>
            <BannerBox>
                <Banner src={user.handle==="giantcat9"?
                    "https://pbs.twimg.com/profile_banners/1168513974763171840/1604095267/1500x500"
                    : user.bannerSrc} alt="user-banner"/>
            </BannerBox>
            <Avatar>
                <Photo src={user.handle==="giantcat9"? 
                    "https://pbs.twimg.com/profile_images/1348661903741038596/jH448dJ4_400x400.jpg"
                    : user.avatarSrc} alt="avatar"/>
            </Avatar>
            <FollowingBox>
                {user.handle==="treasurymog"? 
                <FollowingButton disabled={true} style={{visibility: "hidden"}}>Following</FollowingButton>
                :<FollowingButton disabled={true}>Following</FollowingButton>
                }
            </FollowingBox>
            <InfoBox>
                <DisplayName>{user.displayName}</DisplayName>
                <Handle>@{user.handle}</Handle>
                {user.isFollowingYou? <FollowsYou>Follows you</FollowsYou>: null}
                <Bio>{user.bio}</Bio>
                <ALine>
                    {user.location? 
                        <ItemBox><GrLocation/><ItemText>{user.location}</ItemText></ItemBox>
                        :null}
                    <ItemBox>
                        <FiCalendar/>
                        <ItemText>
                        Joined {format(new Date(user.joined),'MMMM yyyy')}
                        </ItemText>
                    </ItemBox>
                </ALine>
                <ALine>
                    <ItemBox><Number>{user.numFollowing}</Number><ItemText>Following</ItemText></ItemBox>
                    <ItemBox><Number>{user.numFollowers}</Number><ItemText>Followers</ItemText></ItemBox>
                </ALine>
            </InfoBox>
            <OptionBar>
                <OptionTextActive>Tweets</OptionTextActive>
                <OptionText>Media</OptionText>
                <OptionText>Likes</OptionText>
            </OptionBar>
        </SectionBox>
        <ProfileFeed userHandle={userHandle}/>
        </>}

    </Wrapper>
    );


};

export default Profile;

const Wrapper = styled.div`
    width: 600px;
`;

const SectionBox = styled.div`
    border: 1px solid #eaebee;
    border-top: none;
    padding: 0;
    display:flex;
    flex-direction: column;  
`;

const Banner = styled.img`
  width:100%;
  height:auto;
  padding:0;
  margin:0;
`;

const BannerBox =styled.div`
    width: 100%;
    height: 200px;
    overflow: hidden;
`;

const Avatar = styled.div`
    width: 130px;
    height: 130px;
    overflow: hidden;
    border-radius: 50%;
    border: 4px solid white;
    position: absolute;
    top: 130px;
    margin-left: 14px;
`;

const Photo = styled.img`
    height: 100%;
    width: auto;
`;

const FollowingButton = styled.button`
    padding: 10px;
    width: 100px;
    right: 0px;
    color: white;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    background-color: ${COLORS.primary};
    border-radius: 50px;
    text-align: center;
`;

const FollowingBox = styled.div`
    padding-right: 16px;
    padding-top: 25px;
    padding-bottom: 12px;
    display: flex;
    justify-content: flex-end;
    text-align: center;
`;

const InfoBox = styled.div`
    padding: 0px 14px;
    font-family: Arial, Helvetica, sans-serif;
`;

const DisplayName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const Handle = styled.div`
    color: #4F515A;
    display: inline;
    font-size: 14px;
`;

const FollowsYou = styled.div`
    background-color: #E8E9F0;
    border-radius: 5px;
    display: inline;
    font-size: 12px;
    margin-left: 6px;
    padding: 2px 3px;
    color: #4F515A;
`;

const Bio = styled.div`
    padding-top: 10px;
    font-size: 15px;
`;

const ItemBox = styled.div`
    display: flex;
    align-items: center;
    padding-top: 10px;
`;
const ItemText = styled.div`
    padding-left: 5px;
    padding-right: 20px;
`;
const ALine = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 15px;
    color: #4F515A;
`;
const OptionBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;

const OptionText = styled.div`
    padding: 18px 0px;
    width: 33%;
    text-align: center;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
`;

const OptionTextActive = styled.div`
    padding: 18px 0px;
    width: 33%;
    text-align: center;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: ${COLORS.primary};
    border-bottom: 2px solid ${COLORS.primary};
`;

const Number = styled.div`
    color: black;
    font-weight: bold;
`;