// Search Follow Not working when going topersonal
import React, { useEffect, useState } from "react";
import Card from "../../Components/Card"
import Search from "../../Components/Search"
import Axios from "axios"
import { useParams, Link } from "react-router-dom";
import HomeInfo from "../../Components/HomeInfo";
import { useLocation } from "react-router-dom";
import PersonalCard from "../../Components/PersonalCard";
import Personal_Likes from "./Personal_Likes";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// Going from liked to personal and then to a tweet, follow button

function Personal() {
    const location = useLocation()
    const { id, tweetId } = useParams()
    const [user, setUser] = useState([])
    const [storeTweet, setStoretweet] = useState([])
    const [bol, setBol] = useState(true)
    const [follow, setFollow] = useState([])
    const [followId, setFollowId] = useState(location.state.followId)
    const [loggedInUser, setLoggedInUser] = useState(location.state.loggedInUser)
    const [personalLog, setPersonalLog] = useState(location.state.loggedIn)
    const [followornot, setFollowornot] = useState(false)
    const [ft, setFt] = useState(followornot)
    const [filter, setFilter] = useState([])
    const [Personalfilter, setPersonalFilter] = useState([])
    const [followtext, setFollowtext] = useState(location.state.followText)
    const [followers, setFollowers] = useState([])
    const [searchPersonal, setSearchPersonal] = useState([])
    const [searchTweet, setSearchTweet] = useState([])
    const [st, setSt] = useState(false)
    const [src, setSrc] = useState(location.state.src)

    useEffect(() => {
        Axios.post("http://localhost:5000/get-tweets").then(
            (response) => {
                setStoretweet(response.data)
                setBol(false)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
        // Axios.get("http://localhost:5000/upload").then(
        //     (response) => {
        //         setStoretweet(response.data)
        //         setBol(false)
        //     }
        // ).catch(
        //     (error) => {
        //         console.log(error)
        //     }
        // )
    }, [bol])

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
    }, [id])

    function follows(event) {
        event.preventDefault()
        if (loggedInUser !== undefined) {
            if (location.state.followId !== undefined) {
                Axios.post("http://localhost:5000/followUpdate", { userId: loggedInUser, followId: location.state.followId }).then(
                    (res) => {
                        console.log(res.data)
                        if (res.status === 200) {
                            setFollowornot(res.data)
                            setFt(res.data)
                        }

                    }
                )
            } else {
                Axios.post("http://localhost:5000/followUpdate", { userId: loggedInUser, followId: id }).then(
                    (res) => {
                        console.log(res.data)
                        if (res.status === 200) {
                            setFollowornot(res.data)
                            setFt(res.data)
                        }

                    }
                )
            }
        } else if (personalLog !== undefined) {
            console.log("Sedond")
            Axios.post("http://localhost:5000/followUpdate", { userId: personalLog, followId: location.state.followId }).then(
                (res) => {
                    console.log(res.data)
                    if (res.status === 200) {
                        setFollowornot(res.data)
                        setFt(res.data)
                    }

                }
            )
        }
    }

    useEffect(() => {
        setFilter(user.filter(m => m._id === loggedInUser || m._id === personalLog))
        const found = user.filter(m => id === m._id)
        if (location.state.followers !== undefined) {
            if (JSON.stringify(location.state.followers) !== []) {
                for (var i = 0; i < location.state.followers.length; i++) {
                    if (location.state.followers[i] === loggedInUser || location.state.followers[i] == personalLog) {
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
    }, [user, id])


    useEffect(() => {
        // Location.state.followers is coming from FollowCard Component
        if (location.state.followers !== undefined) {
            if (JSON.stringify(location.state.followers) !== JSON.stringify([])) {
                for (var i = 0; i < location.state.followers.length; i++) {
                    if (location.state.followers[i] === loggedInUser || location.state.followers[i] == personalLog) {
                        setPersonalFilter(location.state.followers[i])
                        setFt(true)
                    } else {
                        setFt(false)
                    }
                }
            } else {
                setFt(false)
            }
        }
    }, [location.state.followers, tweetId])


    useEffect(() => {
        Axios.post("http://localhost:5000/get-tweets").then(
            (response) => {
                setSearchTweet(response.data)
            }
        )
        setSt(true)
        // Axios.get("http://localhost:5000/upload").then(
        //     (response) => {
        //         setSearchTweet(response.data)
        //     }
        // )
        // setSt(true)
    }, [location.state.searchId])


    useEffect(() => {
        if (filter !== []) {
            if (filter[0] !== undefined) {
                for (var i = 0; i < filter[0].followId.length; i++) {
                    if (filter[0].followId[i] === id) {
                        setFt(true)
                        break
                    } else {
                        setFt(false)
                    }
                }
            }
        }
    }, [id, filter])

    useEffect(() => {
        if (ft === true) {
            setFollowtext("Following")
        } else {
            setFollowtext("Follow")
        }
    }, [ft])

    function Reload() {
        window.location.reload()
    }

    // console.log(followers)

    return (
        <div className="row" style={{padding: "0", margin:"0"}}>

            <div className="" style={{ width: "15%" }}>
                {user.map(m => {
                    if (personalLog !== undefined || loggedInUser !== undefined) {
                        if (personalLog === m._id) {
                            return <HomeInfo key={id} src={src} id={personalLog} name={m.name} />
                        } else if (loggedInUser === m._id) {
                            return <HomeInfo key={id} src={src} id={loggedInUser} name={m.name} />
                        }
                    } else {
                        {/* On refreshing */ }
                        return <HomeInfo key={id} src={src} id={personalLog} name={m.name} />
                    }
                })}
            </div>


            <div className="tweetArea" style={{ width: "50%" }}>
                {personalLog !== id ? <button className={`button ${followtext === "Following" ? 'true' : 'false'}`} onClick={follows}>{followtext}</button> : ""}
                <div>
                    <PersonalCard Personalfilter={Personalfilter} followIdfromPersonal={followId} followId={[follow]} searchPersonal={searchPersonal} personalLog={personalLog} loggedInUser={loggedInUser} following={[follow]} followers={[followers]} src={src} />
                </div>


                <div className="personalSections">
                    <span className="sections pointer borderColor" onClick={Reload}>
                        Tweet
                    </span>
                    <Link className="sections"
                        to={"/personal_" + id + "/with_replies"}
                        state={{
                            followId: followId,
                            loggedInUser: loggedInUser,
                            loggedIn: personalLog,
                            personalFilter: Personalfilter,
                            followIdfromPersonal: followId,
                            follow: follow,
                            searchPersonal: searchPersonal,
                            personalLog: personalLog,
                            followers: followers
                        }}>
                        Replies
                    </Link>

                    <Link className="sections"
                        to={"/personal_" + id + "/media"}
                        state={{
                            followId: followId,
                            loggedInUser: loggedInUser,
                            loggedIn: personalLog,
                            personalFilter: Personalfilter,
                            followIdfromPersonal: followId,
                            follow: follow,
                            searchPersonal: searchPersonal,
                            personalLog: personalLog,
                            followers: followers
                        }}>
                        Media
                    </Link>

                    <Link className="sections"
                        to={"/personal_" + id + "/likes"}
                        state={{
                            followId: followId,
                            loggedInUser: loggedInUser,
                            loggedIn: personalLog,
                            personalFilter: Personalfilter,
                            followIdfromPersonal: followId,
                            follow: follow,
                            searchPersonal: searchPersonal,
                            personalLog: personalLog,
                            followers: followers
                        }}>
                        Likes
                    </Link>
                </div>

                {st === false ? storeTweet.map(singleData => {
                    if (singleData.img !== undefined) {
                        const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))
                        if (singleData.userId === id || singleData.retweetedBy.filter(m => m === id)[0] === id) {
                            return (
                                <div key={singleData._id}>
                                    <Link key={singleData._id} className="tweetBox"
                                        to={"/status/" + singleData.userId + "/" + singleData._id}
                                        state={{
                                            followId: followId,
                                            loggedInUser: loggedInUser,
                                            loggedIn: personalLog
                                        }}>
                                        <Card pfp={src} key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} followId={followId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`} />
                                    </Link>
                                </div>
                            )
                        }
                    } else {
                        if (followId !== undefined) {
                            if (singleData.userId === id || singleData.retweetedBy.filter(m => m === id)[0] === id) {
                                return (
                                    <div key={singleData._id}>
                                        <Link key={singleData._id} className="tweetBox"
                                            to={"/status/" + singleData.userId + "/" + singleData._id}
                                            state={{
                                                followId: followId,
                                                loggedInUser: loggedInUser,
                                                loggedIn: personalLog
                                            }}>
                                            <Card pfp={src} key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} followId={followId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} />
                                        </Link>
                                    </div>
                                )
                            }
                        } else {
                            if (singleData.userId === id || singleData.retweetedBy.filter(m => m === id)[0] === id) {
                                return (
                                    <div key={singleData._id}>
                                        <Link key={singleData._id} className="tweetBox"
                                            to={"/status/" + singleData.userId + "/" + singleData._id}
                                            state={{
                                                followId: followId,
                                                loggedInUser: loggedInUser,
                                                loggedIn: personalLog
                                            }}>
                                            <Card pfp={src} key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} PersonalfollowId={singleData.userId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} />
                                        </Link>
                                    </div>
                                )
                            }
                        }
                    }
                }) : searchTweet.map(singleData => {
                    if (singleData.img !== undefined) {
                        const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))
                        if (singleData.userId === id || singleData.retweetedBy.filter(m => m === id)[0] === id) {
                            return (
                                <div key={singleData._id}>
                                    <Link key={singleData._id} className="tweetBox"
                                        to={"/status/" + singleData.userId + "/" + singleData._id}
                                        state={{
                                            followId: followId,
                                            loggedInUser: loggedInUser,
                                            loggedIn: personalLog,
                                            l: singleData.l
                                        }}>
                                        <Card pfp={src} key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} followId={followId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`} />
                                    </Link>
                                </div>
                            )
                        }
                    } else {
                        if (followId !== undefined) {
                            if (singleData.userId === id || singleData.retweetedBy.filter(m => m === id)[0] === id) {
                                return (
                                    <div key={singleData._id}>
                                        <Link key={singleData._id} className="tweetBox"
                                            to={"/status/" + singleData.userId + "/" + singleData._id}
                                            state={{
                                                followId: followId,
                                                loggedInUser: loggedInUser,
                                                loggedIn: personalLog,
                                                l: singleData.l
                                            }}>
                                            <Card pfp={src} key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} followId={followId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} />
                                        </Link>
                                    </div>
                                )
                            }
                        } else {
                            if (singleData.userId === id || singleData.retweetedBy.filter(m => m === id)[0] === id) {
                                return (
                                    <div key={singleData._id}>
                                        <Link key={singleData._id} className="tweetBox"
                                            to={"/status/" + singleData.userId + "/" + singleData._id}
                                            state={{
                                                followId: followId,
                                                loggedInUser: loggedInUser,
                                                loggedIn: personalLog,
                                                l: singleData.l
                                            }}>
                                            <Card pfp={src} key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} PersonalfollowId={singleData.userId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} />
                                        </Link>
                                    </div>
                                )
                            }
                        }
                    }
                })}
            </div>


            <div className="" style={{ width: "35%" }}>
                <Search userId={id} followText={followtext} loggedIn={loggedInUser} Personalfilter={Personalfilter}
                    searchPersonal={searchPersonal} personalLog={personalLog} followIdfromPersonal={followId}
                    followers={[followers]} followId={[follow]} />
            </div>


        </div>
    )
}

export default Personal