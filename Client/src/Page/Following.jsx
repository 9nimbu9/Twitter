import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios"
import FollowCard from "../Components/FollowCard";

function Following(event){
    const location = useLocation()
    const [following, setFollowing] = useState(location.state.following[0])
    const [users, setUsers] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:5000/signUp").then(
            (res) => {
                setUsers(res.data)
            }
        )
    },[])

    return(
        <div>
            {users.map(singleUser => {
                return following.map(m => {
                    if(singleUser._id===m){
                        return(
                            <FollowCard key={singleUser._id} id={singleUser._id} followers={singleUser.followers} followId={singleUser._id} personalLog={location.state.personalLog} loggedInUser={location.state.loggedInUser} name={singleUser.name}/>
                        )
                    }
                })
            })}
        </div>
    )
}

export default Following