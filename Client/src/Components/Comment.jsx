import React, { useEffect, useState } from "react";
import Axios from "axios"
import { Link, useParams } from "react-router-dom";
import Card from "./Card";

function Comment(props) {
    const [storeTweet, setStoretweet] = useState([])
    const { id, tweetId } = useParams()
    const [personalLog, setPersonalLog] = useState(props.personalLog)
    const [followId, setFollowId] = useState(props.followId)
    const [loggedInUser, setLoggedInUser] = useState(props.loggedInUser)
    const [changes, setChanges] = useState(props.changes)

    useEffect(() => {
        Axios.post("http://localhost:5000/get-tweets").then(
            (response) => {
                setStoretweet(response.data)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
        // Axios.get("http://localhost:5000/upload").then(
        //     (response) => {
        //         setStoretweet(response.data)
        //     }
        // ).catch(
        //     (error) => {
        //         console.log(error)
        //     }
        // )
    }, [tweetId, changes])

    return (
        <div>
            {changes && storeTweet.map(singleData => {
                if (singleData.img !== undefined) {
                    const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))
                    if (singleData.commentedOnTweetId === tweetId) {
                        console.log(singleData)
                        return (
                            <div key={singleData._id}>
                                <Link key={singleData._id} className="tweetBox"
                                    to={"/status/" + singleData.userId + "/" + singleData._id}
                                    state={{
                                        followId: singleData.userId,
                                        loggedInUser: loggedInUser,
                                        loggedIn: personalLog
                                    }}>
                                    <Card key={singleData._id} personalLog={personalLog} loggedInUser={personalLog} followId={singleData.userId} personalId={loggedInUser} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={loggedInUser} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`} />

                                </Link>
                            </div>
                        )
                    }
                } else {
                    if (singleData.commentedOnTweetId === tweetId) {
                        console.log(singleData)
                        return (
                            <div key={singleData._id}>
                                <Link key={singleData._id} className="tweetBox"
                                    to={"/status/" + singleData.userId + "/" + singleData._id}
                                    state={{
                                        followId: singleData.userId,
                                        loggedInUser: loggedInUser,
                                        loggedIn: personalLog
                                    }}>
                                    <Card key={singleData._id} personalLog={personalLog} loggedInUser={personalLog} PersonalfollowId={singleData.userId} personalId={loggedInUser} comments={singleData.commentedBy} rt={singleData.retweetedBy} l={singleData.l} logged={loggedInUser} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} />

                                </Link>
                            </div>
                        )
                    }
                }
            })}
        </div>
    )

}

export default Comment