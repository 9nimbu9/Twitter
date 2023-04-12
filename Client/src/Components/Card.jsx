import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import "../CSS/tweet.css"



function Card(props) {
    const location = useLocation()
    const { id, tweetId } = useParams()
    const [totalUser, setTotalusers] = useState([])
    const [name, setName] = useState("")
    const [personal, setPersonal] = useState("")
    const [likes, setLikes] = useState([])
    const [retweets, setRetweets] = useState([])
    const [userName, setUsername] = useState("")
    const [bol, setBol] = useState(false)
    const [rtBol, setRtBol] = useState(false)
    const [btn, setBtn] = useState("Like")
    const [ct, setCt] = useState(bol)
    const [rt, setRt] = useState(rtBol)
    const [fill, setFill] = useState("none")
    const [strokeRt, setStrokeRt] = useState("none")
    const [stroke, setStroke] = useState("currentColor")
    const [personalLog, setPersonalLog] = useState(props.personalLog)
    const [src, setSrc] = useState([])
    const [foundLike, setFoundLike] = useState([])
    const [foundRetweet, setFoundRetweet] = useState([])

    // To update the like on screen when updated to the database
    function like(event) {
        event.preventDefault()
        if (id === props.loggedInUser || props.followId === id) {
            // console.log("One")
            Axios.post("http://localhost:5000/likes", { likedBy: props.loggedInUser, likedOn: props.id, tweetId: props.id }).then(
                (res) => {
                    // console.log(res.data)
                    if (res.status === 200) {
                        setBol(res.data)
                        setCt(res.data)
                    }
                }
            )
        } else if (id === personalLog) {
            // console.log("Two")
            Axios.post("http://localhost:5000/likes", { likedBy: props.personalLog, likedOn: props.id, tweetId: props.id }).then(
                (res) => {
                    // console.log(res.data)
                    if (res.status === 200) {
                        setBol(res.data)
                        setCt(res.data)
                    }
                }
            )
        } else {
            if (props.loggedInUser !== undefined) {
                // console.log("Three")
                Axios.post("http://localhost:5000/likes", { likedBy: props.loggedInUser, likedOn: props.id, tweetId: props.id }).then(
                    (res) => {
                        // console.log(res.data)
                        if (res.status === 200) {
                            setBol(res.data)
                            setCt(res.data)
                        }
                    }
                )
            } else if (props.personalLog !== undefined) {
                // console.log("four")
                Axios.post("http://localhost:5000/likes", { likedBy: props.personalLog, likedOn: props.id, tweetId: props.id }).then(
                    (res) => {
                        // console.log(res.data)
                        if (res.status === 200) {
                            setBol(res.data)
                            setCt(res.data)
                        }
                    }
                )
            } else {
                // console.log("Five")
                Axios.post("http://localhost:5000/likes", { likedBy: props.personalLog, likedOn: props.id, tweetId: props.id }).then(
                    (res) => {
                        // console.log(res.data)
                        if (res.status === 200) {
                            setBol(res.data)
                            setCt(res.data)
                        }
                    }
                )
            }
        }
    }

    function retweet(event) {
        event.preventDefault()
        if (id === props.loggedInUser || props.followId === id) {
            // console.log("Fifth")
            Axios.post("http://localhost:5000/retweet", { retweetedBy: props.loggedInUser, retweetedOn: props.id, tweetId: props.id }).then(
                (res) => {
                    // console.log(res.data)
                    if (res.status === 200) {
                        setRtBol(res.data)
                        setRt(res.data)
                    }
                }
            )
        } else if (id === personalLog) {
            // console.log("Fourth")
            Axios.post("http://localhost:5000/retweet", { retweetedBy: props.personalLog, retweetedOn: props.id, tweetId: props.id }).then(
                (res) => {
                    // console.log(res.data)
                    if (res.status === 200) {
                        setRtBol(res.data)
                        setRt(res.data)
                    }
                }
            )
        } else {
            if (props.loggedInUser !== undefined) {
                // console.log("First")
                Axios.post("http://localhost:5000/retweet", { retweetedBy: props.loggedInUser, retweetedOn: props.id, tweetId: props.id }).then(
                    (res) => {
                        // console.log(res.data)
                        if (res.status === 200) {
                            setRtBol(res.data)
                            setRt(res.data)
                        }
                    }
                )
            } else if (props.personalLog !== undefined) {
                // console.log("Second")
                Axios.post("http://localhost:5000/retweet", { retweetedBy: props.personalLog, retweetedOn: props.id, tweetId: props.id }).then(
                    (res) => {
                        // console.log(res.data)
                        if (res.status === 200) {
                            setRtBol(res.data)
                            setRt(res.data)
                        }
                    }
                )
            } else {
                Axios.post("http://localhost:5000/retweet", { retweetedBy: props.personalLog, retweetedOn: props.id, tweetId: props.id }).then(
                    (res) => {
                        // console.log(res.data)
                        if (res.status === 200) {
                            setRtBol(res.data)
                            setRt(res.data)
                        }
                    }
                )
            }
        }
    }


    // To show the like after refreshing
    useEffect(() => {
        if (id === props.loggedInUser || props.followId === props.personalId || id === props.personalLog || props.personalId === props.PersonalfollowId) {
            for (var i = 0; i < props.l.map(m => m.likedBy).length; i++) {
                if (props.l[i] !== undefined) {
                    if (props.l[i].likedBy === props.loggedInUser || props.l[i].likedBy === props.personalLog) {
                        // console.log(true)
                        setCt(true)
                        break
                    }
                }
            }
        } else {
            // console.log("two")
            for (var i = 0; i < props.l.map(m => m.likedBy).length; i++) {
                if (props.l[i] !== undefined) {
                    if (props.l[i].likedBy === props.loggedInUser || props.l[i].likedBy === props.personalLog) {
                        setCt(true)
                        break
                    }
                }
            }
        } if (id === props.loggedInUser || props.followId === props.personalId || id === props.personalLog || props.personalId === props.PersonalfollowId) {
            // console.log("three")
            for (var i = 0; i < props.rt.length; i++) {
                if (props.rt[i] !== undefined) {
                    if (props.rt[i] === props.loggedInUser || props.rt[i] === props.personalLog) {
                        setRt(true)
                        break
                    }
                }
            }
        } else {
            // console.log("four")
            for (var i = 0; i < props.rt.length; i++) {
                if (props.rt[i] !== undefined) {
                    if (props.rt[i] === props.loggedInUser || props.rt[i] === props.personalLog) {
                        setRt(true)
                        break
                    }
                }
            }
        }
    }, [])

    useEffect(() => {
        Axios.post("http://localhost:5000/get-tweets").then(
            (res) => {
                setLikes(res.data)
            }
        )
        // Axios.get("http://localhost:5000/upload").then(
        //     (res) => {
        //         setLikes(res.data)
        //     }
        // )
    }, [ct, bol])

    useEffect(() => {
        Axios.post("http://localhost:5000/get-tweets").then(
            (res) => {
                setRetweets(res.data)
            }
        )
        // Axios.get("http://localhost:5000/upload").then(
        //     (res) => {
        //         setRetweets(res.data)
        //     }
        // )
    }, [rt, rtBol])


    useEffect(() => {
        if (ct === true) {
            setBtn("Liked")
            setFill("rgb(249, 24, 128)")
            setStroke("red")
        } else {
            setBtn("Like")
            setFill("none")
            setStroke("currentColor")
        }
    }, [ct])

    useEffect(() => {
        if (rt === true) {
            setStrokeRt("green")
        } else {
            setStrokeRt("currentColor")
        }
    }, [rt])

    useEffect(() => {
        Axios.post("http://localhost:5000/find-user").then(
            (res) => {
                setTotalusers(res.data)
            }
        )
        // Axios.get("http://localhost:5000/signUp").then(
        //     (res) => {
        //         setTotalusers(res.data)
        //     }
        // )
    }, [])

    useEffect(() => {
        totalUser.map(m => {
            if (props.person === m._id) {
                if (m.img !== undefined) {
                    const base64String = btoa(String.fromCharCode(...new Uint8Array((m.img.data.data))))
                    setSrc(src => [...src, `data: image/png;base64,${base64String}`])
                } else {
                    setSrc(src => [...src, "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"])
                }
                setName(m.name)
                setUsername(m.userName)
            } if (props.user === m._id) {
                setPersonal(m.name)
                setUsername(m.userName)
            }
        })
    }, [totalUser])


    useEffect(() => {
        const foundTweet = likes.filter(m => m._id === props.id)
        setFoundLike(foundTweet)
    }, [likes])

    useEffect(() => {
        const foundTweet = retweets.filter(m => m._id === props.id)
        setFoundRetweet(foundTweet)
    }, [retweets])


    return (
        <form className="tweet-card">

            <div className="row" style={{ padding: "0" }}>

                <div className="tweetLayout1">
                    {totalUser.map(m => {
                        if (m._id === props.person) {
                            return (
                                <img className="avatar" src={src} />
                            )
                        }
                    })}
                </div>

                <div className="tweetLayout2">
                    <Link className="username"
                        to={"/personal_" + props.person}
                        state={{
                            followId: props.PersonalfollowId,
                            loggedInUser: props.loggedInUser,
                            loggedIn: props.loggedInUser,
                            person: props.person
                        }}>{name}
                    </Link>
                    <Link className="userNameTag"
                        to={"/personal_" + props.person}
                        state={{
                            followId: props.PersonalfollowId,
                            loggedInUser: props.loggedInUser,
                            loggedIn: props.loggedInUser,
                            person: props.person
                        }}>@{userName}
                    </Link>
                    <div className="message">
                        <div>
                            {props.tweet}
                        </div>
                        <img className="tweetImage" src={props.src} alt="" />
                    </div>


                    <div className="actions">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 comment">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                            </svg>
                            <span class="fas fa-retweet action-icon">{props.comments.length}</span>
                        </div>

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" id={props.id} onClick={retweet} fill="none" viewBox="0 0 24 24" width="20" strokeWidth="2.25" stroke={strokeRt} className="w-6 h-6 reTweet">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                            </svg>
                            <Link class="fas fa-retweet action-icon"
                                to={"/status/" + props.person + "/" + props.id + "/retweets"}
                                state={{
                                    rt: foundRetweet[0],
                                    loggedInUser: props.loggedInUser,
                                    loggedIn: props.loggedInUser,
                                    id: props.id
                                }}>
                                {retweets !== [] ? retweets.map(m => <span key={m._id}>{m._id === props.id ? m.retweetedBy.length : ""}</span>) : ""}
                            </Link>
                        </div>

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" id={props.id} onClick={like} fill={fill} width="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke={stroke} className="w-6 h-6 like">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <Link class="fas fa-heart action-icon" key={props.id}
                                to={"/status/" + props.person + "/" + props.id + "/likes"}
                                state={{
                                    l: foundLike[0],
                                    loggedInUser: props.loggedInUser,
                                    loggedIn: props.loggedInUser,
                                    id: props.id
                                }}>
                                {likes !== [] ? likes.map(m => <span key={m._id}>{m._id === props.id ? m.l.length : ""}</span>) : ""}
                            </Link>
                        </div>

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 share">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Button type="submit" variant="outlined" startIcon={<DeleteIcon/>}>Delete</Button>   */}
        </form>
    )
}

export default Card

// function deleteTweet(event){
//     // event.preventDefault()
//     console.log(props.id)
//     Axios.post("http://localhost:5000/delete", {"delete": props.id}).then(
//         (response) => {
//             console.log(response.status)
//             if(response.status===200){
//                 console.log(props.id)
//             }
//         }
//     )
// }
