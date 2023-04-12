import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios"
import FollowCard from "../Components/FollowCard";
import HomeInfo from "../Components/HomeInfo";
import Search from "../Components/Search";

function Followers() {
    const location = useLocation()
    const { id } = useParams()
    const [following, setFollowing] = useState(location.state.following[0])
    const [followerss, setFollowerss] = useState(location.state.followers[0])
    const [users, setUsers] = useState([])
    const [searchPersonal, setSearchPersonal] = useState([])
    const [follow, setFollow] = useState([])
    const [followers, setFollowers] = useState([])
    const [filter, setFilter] = useState([])
    const [Personalfilter, setPersonalFilter] = useState([])

    useEffect(() => {
        Axios.post("http://localhost:5000/find-user").then(
            (res) => {
                setUsers(res.data)
            }
        )
        // Axios.get("http://localhost:5000/signUp").then(
        //     (res) => {
        //         setUsers(res.data)
        //     }
        // )
    }, [])

    useEffect(() => {
        setFilter(users.filter(m => m._id === location.state.personalLog))
        const found = users.filter(m => id === m._id)
        if (location.state.followers !== undefined) {
            if (JSON.stringify(location.state.followers) !== []) {
                for (var i = 0; i < location.state.followers.length; i++) {
                    if (location.state.followers[i] == location.state.personalLog) {
                        setSearchPersonal(location.state.followers[i])
                    }
                }
            }
        }
        if (found !== []) {
            if (found[0] !== undefined) {
                setFollow(found[0].followId)
                setFollowers(found[0].followers)
            }
        }
    }, [users])
    useEffect(() => {
        if (location.state.followers !== undefined) {
            if (JSON.stringify(location.state.followers) !== JSON.stringify([])) {
                for (var i = 0; i < location.state.followers.length; i++) {
                    if (location.state.followers[i] == location.state.personalLog) {
                        setPersonalFilter(location.state.followers[i])
                    }
                }
            }
        }
    }, [location.state.followers])

    return (
        <div className="row" style={{padding: "0", margin:"0"}}>

            <div style={{ width: "15%" }}>
                {users.map(m => {
                    if (location.state.personalLog !== undefined) {
                        if (location.state.personalLog === m._id) {
                            return <HomeInfo key={id} id={location.state.personalLog} name={m.name} />
                        }
                    } else {
                        {/* On refreshing */ }
                        return <HomeInfo key={id} id={location.state.personalLog} name={m.name} />
                    }
                })}
            </div>

 
            <div className="tweetArea" style={{ width: "50%" }}>
                <h3>Followers</h3>
                {users.map(singleUser => {
                    return followerss.map(m => {
                        if (singleUser._id === m) {
                            return (
                                <FollowCard key={singleUser._id} id={singleUser._id} followers={singleUser.followers} followId={singleUser._id} personalLog={location.state.personalLog} loggedInUser={location.state.loggedInUser} name={singleUser.name} />
                            )
                        }
                    })
                })}
            </div>

            <div className="search-container" style={{ width: "35%" }}>
                <Search userId={id} loggedIn={location.state.personalLog} Personalfilter={Personalfilter}
                    searchPersonal={searchPersonal} personalLog={location.state.personalLog}
                    followIdfromPersonal={location.state.followIdfromPersonal} followers={[followers]}
                    followId={[following]} />
            </div>

        </div>
    )
}

export default Followers