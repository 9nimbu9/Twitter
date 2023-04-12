import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import Card from "../../Components/Card";
import HomeInfo from "../../Components/HomeInfo";
import Search from "../../Components/Search";
import PersonalCard from "../../Components/PersonalCard";

function Personal_Likes() {
    const location = useLocation()
    const { id } = useParams()
    const [user, setUser] = useState([])
    const [userAccount, setUserAccount] = useState([])
    const [storeTweet, setStoretweet] = useState([])

    // console.log(location.state.followId)

    useEffect(() => {
        Axios.post("http://localhost:5000/find-user").then(
            (res) => {
                setUser(res.data)
            }
        )
        Axios.post("http://localhost:5000/get-tweets").then(
            (res) => {
                setStoretweet(res.data)
            }
        )
        // Axios.get("http://localhost:5000/signUp").then(
        //     (res) => {
        //         setUser(res.data)
        //     }
        // )
        // Axios.get("http://localhost:5000/upload").then(
        //     (res) => {
        //         setStoretweet(res.data)
        //     }
        // )
    }, [])

    useEffect(() => {
        setUserAccount(user.map(m => m._id === location.state.loggedIn))
    }, [user])


    function Reload() {
        window.location.reload()
    }

    console.log(location.state.followers)

    // console.log(location.state.followId)
    return (
        <div className="row" style={{padding: "0", margin:"0"}}>

            <div className="" style={{ width: "15%" }}>
                {user.map(m => {
                    if (location.state.loggedIn !== undefined || location.state.loggedIn !== undefined) {
                        if (location.state.loggedIn === m._id) {
                            return <HomeInfo key={id} id={location.state.loggedIn} name={m.name} />
                        } else if (location.state.loggedIn === m._id) {
                            return <HomeInfo key={id} id={location.state.loggedIn} name={m.name} />
                        }
                    } else {
                        {/* On refreshing */ }
                        return <HomeInfo key={id} id={location.state.loggedIn} name={m.name} />
                    }
                })}
            </div>

            <div className="tweetArea" style={{ width: "50%" }}>

                {/* {location.state.personalLog !== id ? <button className={`button ${followtext === "Following" ? 'true' : 'false'}`} onClick={follows}>{followtext}</button> : ""} */}
                <div>
                    <PersonalCard Personalfilter={location.state.personalFilter} followIdfromPersonal={location.state.followId} followId={[location.state.following]} searchPersonal={location.state.searchPersonal} personalLog={location.state.personalLog} loggedInUser={location.state.loggedInUser} following={[location.state.follow]} followers={[location.state.followers]} />
                </div>


                <div className="personalSections">
                    <Link className="sections"
                        to={"/personal_" + id}
                        state={{
                            followId: location.state.followId,
                            loggedInUser: location.state.loggedInUser,
                            loggedIn: location.state.personalLog,
                            personalFilter: location.state.Personalfilter,
                            followIdfromPersonal: location.state.followId,
                            following: location.state.follow,
                            searchPersonal: location.state.searchPersonal,
                            personalLog: location.state.personalLog,
                            followers: location.state.followers,
                            follow: location.state.follow
                        }}>
                        Tweet
                    </Link>
                    <Link className="sections"
                        to={"/personal_" + id + "/with_replies"}
                        state={{
                            followId: location.state.followId,
                            loggedInUser: location.state.loggedInUser,
                            loggedIn: location.state.personalLog,
                            // personalFilter: location.state.Personalfilter,
                            followIdfromPersonal: location.state.followId,
                            following: location.state.follow,
                            searchPersonal: location.state.searchPersonal,
                            personalLog: location.state.personalLog,
                            followers: location.state.followers,
                            follow: location.state.follow
                        }}>
                        Replies
                    </Link>

                    <Link className="sections"
                        to={"/personal_" + id + "/media"}
                        state={{
                            followId: location.state.followId,
                            loggedInUser: location.state.loggedInUser,
                            loggedIn: location.state.personalLog,
                            personalFilter: location.state.Personalfilter,
                            followIdfromPersonal: location.state.followId,
                            following: location.state.follow,
                            searchPersonal: location.state.searchPersonal,
                            personalLog: location.state.personalLog,
                            followers: location.state.followers,
                            follow: location.state.follow
                        }}>
                        Media
                    </Link>

                    <span className="sections pointer borderColor" onClick={Reload}>
                        Likes
                    </span>
                </div>

                {user.map(m => {
                    if (m._id === id) {
                        const likedTweets = storeTweet.filter(singleData => m.likedId.includes(singleData._id))
                        return (
                            <div>
                                {likedTweets.map(singleData => {
                                    if (singleData.img !== undefined) {
                                        console.log(singleData.img)
                                        const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))
                                        return (
                                            <div key={singleData._id}>
                                                <Link key={singleData._id} className="tweetBox"
                                                    to={"/status/" + singleData.userId + "/" + singleData._id}
                                                    state={{
                                                        followId: location.state.followId,
                                                        loggedInUser: location.state.loggedIn,
                                                        loggedIn: location.state.loggedIn
                                                    }}>
                                                    <Card key={singleData._id} followId={location.state.followId} personalLog={location.state.loggedIn} loggedInUser={location.state.loggedIn} PersonalfollowId={singleData.userId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={location.state.loggedIn} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`} />
                                                </Link>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={singleData._id}>
                                                <Link key={singleData._id} className="tweetBox"
                                                    to={"/status/" + singleData.userId + "/" + singleData._id}
                                                    state={{
                                                        followId: location.state.followId,
                                                        loggedInUser: location.state.loggedIn,
                                                        loggedIn: location.state.loggedIn
                                                    }}>
                                                    <Card key={singleData._id} followId={location.state.followId} personalLog={location.state.loggedIn} loggedInUser={location.state.loggedIn} PersonalfollowId={singleData.userId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={location.state.loggedIn} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} />
                                                </Link>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    }
                })}

            </div>

            <div className="" style={{ width: "35%" }}>
                <Search userId={id} loggedIn={location.state.loggedIn} Personalfilter={location.state.personalfilter}
                    searchPersonal={location.state.searchPersonal} personalLog={location.state.personalLog} followIdfromPersonal={location.state.followId}
                    followers={[location.state.following]} followId={[location.state.follow]} />
            </div>

        </div>
    )
}

export default Personal_Likes