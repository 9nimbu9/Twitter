// Search Follow Not working when going topersonal
import React, { useEffect, useState } from "react";
import Card from "../Components/Card"
import Search from "../Components/Search"
import Axios from "axios"
import { Link, useParams } from "react-router-dom";
import HomeInfo from "../Components/HomeInfo";
import { useLocation } from "react-router-dom";


function Status() {
    const location = useLocation()
    const [tweet, setTweet] = useState("")
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
    const [file, setFile] = useState("")
    // const [changes, setChanges] = useState(true)    
    const [latestTweetId, setLatestTweetId] = useState(null);


    function change(event) {
        setTweet(event.target.value)
    }

    function onFormSubmit(event) {
        event.preventDefault()
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('tweet', tweet)
        formData.append('userId', location.state.loggedIn)
        formData.append('commentedOnTweetId', tweetId)


        Axios.post("http://localhost:5000/upload", formData).then(res => {
            console.log(res)
            if (res.status === 200) {
                setBol(true)
            }
        }).catch(
            (error) => {
                console.log(error)
            }
        )
        setFile("")
        setTweet("")        

        Axios.post("http://localhost:5000/comments", { commentedBy: location.state.loggedIn, tweetId: tweetId }).then(
            (res) => {
                console.log(res.data)
            }
        )
    }

    function onInputChange(event) {
        setFile(event.target.files[0])
    }


    useEffect(() => {
        Axios.post("http://localhost:5000/get-tweets").then(
            (response) => {
                setStoretweet(response.data)
                setLatestTweetId(tweetId)
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
        //         setLatestTweetId(tweetId)
        //         setBol(false)
        //     }
        // ).catch(
        //     (error) => {
        //         console.log(error)
        //     }
        // )
    }, [bol, tweetId])

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
    }, [])

    

    useEffect(() => {
        setFilter(user.filter(m => m._id === loggedInUser))
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
                setFollow(found[0].followId) //Search Follow issue
                setFollowers(found[0].followers)
            }
        }
    }, [user])

    // console.log(location.state.followers)

    useEffect(() => {
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
    }, [location.state.followers])


    useEffect(() => {
        Axios.post("http://localhost:5000/upload").then(
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
                    if (filter[0].followId[i] === followId) {
                        setFt(true)
                    }
                }
            }
        }
    }, [filter])

    useEffect(() => {
        if (ft === true) {
            setFollowtext("Following")
        } else {
            setFollowtext("Follow")
        }
    }, [ft])



    return (
        <div className="row" style={{padding: "0", margin:"0"}}>

            <div className="" style={{ width: "15%" }}>
                {user.map(m => {
                    if (personalLog !== undefined || loggedInUser !== undefined) {
                        if (personalLog === m._id) {
                            {/* {console.log("1")} */ }
                            return <HomeInfo key={id} id={personalLog} name={m.name} />
                        } else if (loggedInUser === m._id) {
                            {/* {console.log("2")} */ }
                            return <HomeInfo key={id} id={loggedInUser} name={m.name} />
                        }
                    } else {
                        {/* On refreshing */ }
                        {/* {console.log("3")} */ }
                        return <HomeInfo key={id} id={personalLog} name={m.name} />
                    }
                })}
            </div>


            <div className="tweetArea" style={{ width: "50%" }}>
                {storeTweet.map(singleData => {
                    if (singleData.img !== undefined) {
                        const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))
                        if (singleData._id === latestTweetId) {
                            return (
                                <div key={singleData._id}>
                                    <Card key={singleData._id} personalLog={personalLog} loggedInUser={personalLog} followId={followId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`} />
                                </div>
                            )
                        }
                    } else {
                        if (singleData._id === latestTweetId) {
                            return (
                                <div key={singleData._id}>
                                    <Card key={singleData._id} personalLog={personalLog} loggedInUser={personalLog} PersonalfollowId={followId} personalId={id} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} />
                                </div>
                            )
                        }
                    }
                    
                })}


                <input className="tweetText" type="text" placeholder="Tweet your reply" value={tweet} onChange={change} />
                <form className="tweetActions" onSubmit={onFormSubmit}>
                    <label for="fileImage">
                        <svg xmlns="http://www.w3.org/2000/svg" width="7%" fill="#00acee" viewBox="0 0 24 24" strokeWidth="0">
                            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                        </svg>
                    </label>
                    <input type="file" id="fileImage" name="photo" onChange={onInputChange} />
                    <button className="tweetButton" style={{ width: "70px" }} variant="contained" type="submit">Reply</button>
                </form>

                {/* <Comment changes={changes} personalLog={personalLog} loggedInUser={loggedInUser}/> */}
                <div>
                    {storeTweet.map(singleData => {
                        if (singleData.img !== undefined) {
                            const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))
                            if (singleData.commentedOnTweetId === latestTweetId) {
                                return (
                                    <div key={singleData._id}>
                                        <Link key={singleData._id} className="tweetBox"
                                            to={"/status/" + singleData.userId + "/" + singleData._id}
                                            state={{
                                                followId: singleData.userId,
                                                loggedInUser: location.state.loggedInUser,
                                                loggedIn: location.state.loggedIn
                                            }}>
                                            <Card key={singleData._id} personalLog={personalLog} loggedInUser={personalLog} followId={singleData.userId} personalId={location.state.loggedIn} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={location.state.loggedIn} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`} />

                                        </Link>
                                    </div>
                                )
                            }
                        } else {
                            if (singleData.commentedOnTweetId === latestTweetId) {
                                return (
                                    <div key={singleData._id}>
                                        <Link key={singleData._id} className="tweetBox"
                                            to={"/status/" + singleData.userId + "/" + singleData._id}
                                            state={{
                                                followId: singleData.userId,
                                                loggedInUser: location.state.loggedInUser,
                                                loggedIn: location.state.loggedIn
                                            }}>
                                            <Card key={singleData._id} personalLog={personalLog} loggedInUser={personalLog} PersonalfollowId={singleData.userId} personalId={location.state.loggedIn} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={location.state.loggedIn} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} />
                                        </Link>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </div>


            <div className="" style={{ width: "35%" }}>
                <Search userId={id} followText={followtext} loggedIn={personalLog} Personalfilter={Personalfilter}
                    searchPersonal={searchPersonal} personalLog={personalLog} followIdfromPersonal={followId}
                    followers={[followers]} followId={[follow]} />
            </div>

        </div>
    )
}

export default Status