import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PersonalCard(props){
    return(
        <div>
            {props.following!==[]?props.following[0].length:""}
            <Link 
                to={"/following_"+props.personalLog}
                state={{
                    following: props.following,
                    personalLog: props.personalLog,
                    loggedInUser: props.loggedInUser
                }}>Following</Link>
            {props.followers!==[]?props.followers[0].length:""}
            <Link 
                to={"/followers_"+props.personalLog}
                state={{
                    followers: props.followers,
                    personalLog: props.personalLog,
                    loggedInUser: props.loggedInUser
                }}> 
                Followers</Link>
        </div>
    )
}

export default PersonalCard