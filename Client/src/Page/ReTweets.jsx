// import Axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";

// function ReTweets(){
//     const location = useLocation()
//     const {id, tweetId} = useParams()
//     const [rt, setRt] = useState(location.state.rt)
//     const [user, setUser] = useState([])
//     const [followText, setFollowtext] = useState("Follow")
//     const [followornot, setFollowornot] = useState(false)
//     const [ft, setFt] = useState(followornot)


//     useEffect(() => {
//         Axios.post("http://localhost:5000/find-user").then(
//             (res) => {
//                 setUser(res.data)
//             }
//         )
//         Axios.get("http://localhost:5000/signUp").then(
//             (res) => {
//                 setUser(res.data)
//             }
//         )
//     },[rt])


//     function follows(event){
//         event.preventDefault()
//         Axios.post("http://localhost:5000/followUpdate", {userId: location.state.loggedInUser, followId: event.target.id}).then(
//             (res) => {
//                 // console.log(res.data)
//                 if(res.status===200){
//                     setFollowornot(res.data)
//                     setFt(res.data)
//                 }

//             }
//         )
//     }

//     return(
//         <div className="tweet-card">
//             <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"/>
//             {user.map(m => {
//                     for(var i=0; i<rt.length; i++){
//                         if(rt[i]===m._id){
//                             return(
//                                 <div>
//                                     <Link className="username"
//                                         to={"/personal_"+rt[i]}
//                                         state={{
//                                             followId: rt[i],
//                                             loggedInUser: location.state.loggedInUser,
//                                             loggedIn: location.state.loggedInUser
//                                         }}>{m.name} @{m.userName}</Link>
//                                     <button id={rt[i]} onClick={follows}>{followText}</button>     
//                                 </div>
//                             )
//                         }
//                     }
//                 })}
//         </div>
//     )
// }

// export default ReTweets

import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import FollowCard from "../Components/FollowCard";


function ReTweets() {
    const location = useLocation()
    const [rt, setRt] = useState(location.state.rt)
    const [user, setUser] = useState([])
    const [followText, setFollowtext] = useState("Follow")
    const [followornot, setFollowornot] = useState(false)
    const [ft, setFt] = useState(followornot)

    useEffect(() => {
        Axios.post("http://localhost:5000/find-user").then(
            (res) => {
                setUser(res.data)
            }
        )
        // Axios.get("http://localhost:5000/signUp").then(
        //     (res) => {
        //         setUser(res.data)
        //     }
        // )
    }, [rt])


    return (
        <div>
            <div className="tweetArea" style={{ width: "50%", justifyContent: "center"}}>
                {user.map(singleUser => {
                    return location.state.rt.retweetedBy.map(m => {
                        if (singleUser._id === m) {
                            return (
                                <FollowCard key={singleUser._id} id={singleUser._id} followers={singleUser.followers} 
                                followId={singleUser._id} personalLog={location.state.loggedInUser} l
                                oggedInUser={location.state.loggedInUser} name={singleUser.name} />
                            )
                        }
                    })
                })}
            </div>

            {/* {user.map(m => {
                for(var i=0; i<l.length; i++){
                    if(l[i].likedBy===m._id){
                        return(
                            <div>
                                <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"/>
                                <Link className="username"
                                    to={"/personal_"+l[i].likedBy}
                                    state={{
                                        followId: l[i].likedBy,
                                        loggedInUser: location.state.loggedInUser,
                                        loggedIn: location.state.loggedInUser
                                    }}>{m.name} @{m.userName}</Link> 
                                <button id={l[i].likedBy} onClick={follows}>{followText}</button>
                            </div>
                        )
                    }
                }
            })} */}
        </div>
    )
}

export default ReTweets