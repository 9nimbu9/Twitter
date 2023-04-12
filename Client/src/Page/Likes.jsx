import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import FollowCard from "../Components/FollowCard";

function Likes() {
    const location = useLocation()
    const [l, setL] = useState(location.state.l)
    const [user, setUser] = useState([])
    const [storeTweet, setStoretweet] = useState([])
    const [followText, setFollowtext] = useState("Follow")
    const [followornot, setFollowornot] = useState(false)
    const [ft, setFt] = useState(followornot)
    const [bol, setBol] = useState(false)
    const [found, setFound] = useState([])

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
        Axios.post("http://localhost:5000/get-tweets").then(
            (res) => {
                setStoretweet(res.data)
                setBol(true)
            }
        )   
    }, [l])
    

    return (
        <div>
            <div className="tweetArea" style={{ width: "50%", justifyContent: "center"}}>
                {user.map(singleUser => {
                    return location.state.l.l.map(m => {
                        if (singleUser._id === m.likedBy) {
                            return (
                                <FollowCard key={singleUser._id} id={singleUser._id} followers={singleUser.followers} 
                                followId={singleUser._id} personalLog={location.state.loggedInUser} loggedInUser={location.state.loggedInUser} name={singleUser.name} />
                            )
                        }
                    })
                })}
            </div>
        </div>
    )
}

export default Likes