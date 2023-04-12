import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Axios from "axios";

import '../CSS/Follow.css'


function FollowCard(props) {
    const location = useLocation()
    const { id, tweetId } = useParams()
    const [user, setUser] = useState([])
    const [name, setName] = useState(props.name)
    const [personalLog, setPersonalLog] = useState(props.personalLog)
    const [followornot, setFollowornot] = useState(false)
    const [ft, setFt] = useState(followornot)
    const [followtext, setFollowtext] = useState("Follow")


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

    function follows(event) {
        event.preventDefault()
        Axios.post("http://localhost:5000/followUpdate", { userId: personalLog, followId: event.target.id }).then(
            (res) => {
                // console.log(res.data)
                if (res.status === 200) {
                    setFollowornot(res.data)
                    setFt(res.data)
                }

            }
        )
    }
    useEffect(() => {
        if (JSON.stringify(user.filter(m => m.name === props.name)) !== JSON.stringify([])) {
            if (user.filter(m => m.name === props.name)[0].followers !== []) {
                for (var i = 0; i < user.filter(m => m.name === props.name)[0].followers.length; i++) {
                    if (user.filter(m => m.name === props.name)[0].followers[i] === props.personalLog) {
                        setFt(true)
                        break
                    } else {
                        setFt(false)
                        setName("")
                    }
                }
            } else {
                setFt(false)
                setName("")
            }
        }
    }, [user])

    useEffect(() => {
        if (ft === true) {
            setFollowtext("Following")
        } else {
            setFollowtext("Follow")
        }
    })


    return (
        <div className="tweet-card">
            <div className="username">
                <Link
                    to={"/personal_" + props.id}
                    state={{
                        loggedInUser: props.personalLog,
                        followId: props.followId,
                        followers: props.followers,
                        loggedIn: props.personalLog
                    }}>
                    {user.map(m => {
                        if (m._id === props.followId) {
                            if (m.img !== undefined) {
                                const base64String = btoa(String.fromCharCode(...new Uint8Array((m.img.data.data))))
                                return (
                                    <img className="avatar" src={`data: image/png;base64,${base64String}`} />
                                )
                            } else {
                                return (
                                    <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                                )
                            }
                        }
                    })}
                    {props.name}
                </Link>
                {props.followId !== props.personalLog ? <button className={`button ${followtext === "Following" ? 'true' : 'false'}`} style={{ justifyContent: "right" }} id={props.followId} onClick={follows}>{followtext}</button> : ""}
            </div>
        </div>
        
    )
}

export default FollowCard