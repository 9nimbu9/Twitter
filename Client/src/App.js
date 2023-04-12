import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from "./Page/Main"
import Home from "./Page/Home";
import Personal from "./Page/Personal/Personal";
import SignIn from "./Page/Sign-In";
import SignUp from "./Page/Sign-Up";
import Followers from "./Page/Followers";
import Following from "./Page/Following";
import Status from "./Page/Status";
import Likes from "./Page/Likes";
import ReTweets from "./Page/ReTweets"; 
import Personal_Likes from "./Page/Personal/Personal_Likes";
import Personal_Replies from "./Page/Personal/Personal_Replies";
import Personal_Media from "./Page/Personal/Personal_Media";
import Notification from "./Page/Notification";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Main/>}/>
                <Route exact path="/home_:id" element={<Home/>}/> 
                <Route exact path="/notification/:id" element={<Notification/>}/> 
                <Route exact path="/Sign-In" element={<SignIn/>}/>
                <Route exact path="/Sign-Up" element={<SignUp/>}/> 
                <Route exact path="/personal_:id" element={<Personal/>}/>
                <Route exact path="/personal_:id/with_replies" element={<Personal_Replies/>}/>
                <Route exact path="/personal_:id/likes" element={<Personal_Likes/>}/>
                <Route exact path="/personal_:id/media" element={<Personal_Media/>}/>
                <Route exact path="/status/:id/:tweetId" element={<Status/>}/>
                <Route exact path="/status/:id/:tweetId/likes" element={<Likes/>}/>
                <Route exact path="/status/:id/:tweetId/retweets" element={<ReTweets/>}/>
                <Route exact path="/followers_:id" element={<Followers/>}/>
                <Route exact path="/following_:id" element={<Following/>}/>
            </Routes>
        </BrowserRouter>
    ) 
}

export default App