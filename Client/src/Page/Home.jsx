import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from "../Components/Card"
import Search from "../Components/Search"
import Axios from "axios"
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomeInfo from "../Components/HomeInfo";


function Home() {
    const location = useLocation()
    const { id, tweetId } = useParams()
    const [tweet, setTweet] = useState("")
    const [file, setFile] = useState("")
    const [user, setUser] = useState([])
    const [follow, setFollow] = useState([])
    const [storeTweet, setStoretweet] = useState([])
    const [bol, setBol] = useState(true)
    const [log, setLog] = useState(location.state.loggedIn)

    function change(event) {
        setTweet(event.target.value)
    }

    function onFormSubmit(event) {
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('tweet', tweet)
        formData.append('userId', id)

        Axios.post("http://localhost:5000/upload", formData).then(res => {
            // console.log(res)
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
        event.preventDefault()
    }

    function onInputChange(event) {
        setFile(event.target.files[0])
    }

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
        const found = user.filter(m => id === m._id)
        if (found !== []) {
            if (found[0] !== undefined) {
                setFollow(found[0].followId)
            }
        }
    }, [user])
    // console.log(id)

    return (
        <div className="row" style={{ padding: "0", margin: "0" }}>

            <div style={{ width: "10%", marginTop: "1.75%", marginLeft: "5%" }}>
                {user.map(m => {
                    if (log === m._id) {
                        if (m.img !== undefined) {
                            const base64String = btoa(String.fromCharCode(...new Uint8Array((m.img.data.data))))
                            return <HomeInfo key={id} id={log} name={m.name} src={`data: image/png;base64,${base64String}`} />
                        } else {
                            return <HomeInfo key={id} id={log} name={m.name} src={"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} />
                        }
                    }
                })}
            </div>


            <div className="tweetArea" style={{ width: "50%" }}>
                <h5 style={{ margin: "2.5%", fontWeight: "650" }}>Home</h5>
                <div className="tweetContainer row" style={{ padding: "0", margin: "0" }}>

                    <div className="tweetLayout1">
                        {user.map(m => {
                            if (log === m._id) {
                                if (m.img !== undefined) {
                                    const base64String = btoa(String.fromCharCode(...new Uint8Array((m.img.data.data))))
                                    return (
                                        <Link
                                            to={"/personal_" + id}
                                            state={{
                                                loggedIn: id
                                            }}>
                                            <img className="avatarHome" src={`data: image/png;base64,${base64String}`} />
                                        </Link>
                                    )
                                } else {
                                    return (
                                        <Link
                                            to={"/personal_" + id}
                                            state={{
                                                loggedIn: id
                                            }}>
                                            <img className="avatarHome" src={"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} />
                                        </Link>
                                    )
                                }
                            }
                        })}
                    </div>

                    <div className="tweetLayout3">
                        <input className="tweetText" type="text" placeholder="What's Happening?" value={tweet} onChange={change} />
                        <form className="tweetActions" onSubmit={onFormSubmit}>
                            <label className="imageLabel" for="fileImage">
                                <svg xmlns="http://www.w3.org/2000/svg" width="7%" fill="#00acee" viewBox="0 0 24 24" strokeWidth="0">
                                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                                </svg>
                            </label>
                            <input type="file" id="fileImage" name="photo" onChange={onInputChange} />
                            {tweet!=="" || file!==""?<button className="tweetButton" variant="contained" type="submit">Tweet</button>:
                            <button className="tweetButtonDisabled" disabled>Tweet</button>}
                        </form>
                    </div>

                </div>
                <br></br>

                {storeTweet.map((singleData, index) => {
                    if (singleData.img !== undefined) {
                        const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))
                        if (follow !== undefined) {
                            return (
                                <div key={singleData._id}>
                                    {follow.map(m => {
                                        if (m === singleData.userId) {
                                            return (
                                                <Link key={singleData._id} className="tweetBox"
                                                    // Personal
                                                    to={"/status/" + m + "/" + singleData._id}
                                                    state={{
                                                        followId: m,
                                                        loggedInUser: log,
                                                        loggedIn: log
                                                    }}>
                                                    <Card key={singleData._id} PersonalfollowId={m} loggedInUser={log} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={log} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`} />
                                                </Link>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        }
                    } else {
                        if (follow !== undefined) {
                            return (
                                <div key={singleData._id}>
                                    {follow.map(m => {
                                        if (m === singleData.userId) {
                                            return (
                                                <Link key={singleData._id} className="tweetBox"
                                                    to={"/status/" + m + "/" + singleData._id}
                                                    state={{
                                                        followId: m,
                                                        loggedInUser: log,
                                                        loggedIn: log
                                                    }}>
                                                    <Card key={singleData._id} PersonalfollowId={m} loggedInUser={log} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={log} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} />
                                                </Link>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        }
                    }
                })}
            </div>

            <div className="" style={{ width: "35%" }}>
                <Search userId={id} loggedIn={log} followId={[follow]} />
            </div>


        </div>
    )
}

export default Home