import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js"

function Search(props) {
    const location = useLocation()
    const { id } = useParams()
    const [name, setName] = useState("")
    const [stored, setStored] = useState([])
    const [find, setFind] = useState([])
    const [followtext, setFollowtext] = useState("Follow")
    const [followornot, setFollowornot] = useState(false)
    const [ft, setFt] = useState(followornot)
    const [results, setResults] = useState([])

    function change(event) {
        setName(event.target.value)
        const results = fuse.search(event.target.value);
        setResults(results)
    }

    // Click Function
    useEffect(() => {
        Axios.post("http://localhost:5000/find-user").then(
            (res) => {
                setStored(res.data)
            }
        )
        // Axios.get("http://localhost:5000/signUp").then(
        //     (res) => {
        //         setStored(res.data)
        //     }
        // )
        // setFind(stored.filter(m => m.name === name))
    }, []) //[name]

    const options = {
        includeScore: true,
        keys: ['name', 'userName'],
        threshold: 0.5,
    }
    const fuse = new Fuse(stored, options);


    useEffect(() => {
        setFind(stored.filter(m => m.name === name || m.userName === name))
    }, [name])


    function follow(event) {
        if (id === props.loggedIn || id === props.followIdfromPersonal || props.loggedIn === props.searchPersonal) {
            console.log("first")
            Axios.post("http://localhost:5000/followUpdate", { followId: event.target.id, userId: props.loggedIn }).then(
                (res) => {
                    // console.log(res.data)
                    if (res.status === 200) {
                        setFollowornot(res.data)
                        setFt(res.data)
                    }
                }
            )
        } else if (id === props.personalLog || props.personalLog === props.Personalfilter) {
            console.log("Second")
            Axios.post("http://localhost:5000/followUpdate", { followId: event.target.id, userId: props.personalLog }).then(
                (res) => {
                    // console.log(res.data)
                    if (res.status === 200) {
                        setFollowornot(res.data)
                        setFt(res.data)
                    }
                }
            )
        } else if (JSON.stringify(props.searchPersonal) === JSON.stringify([]) && props.loggedIn !== undefined) {
            // console.log("Third")
            Axios.post("http://localhost:5000/followUpdate", { followId: event.target.id, userId: props.loggedIn }).then(
                (res) => {
                    console.log(res.data)
                    if (res.status === 200) {
                        setFollowornot(res.data)
                        setFt(res.data)
                    }
                }
            )
        } else if (JSON.stringify(props.Personalfilter) === JSON.stringify([]) && props.personalLog !== undefined) {
            // console.log("Fourth")
            Axios.post("http://localhost:5000/followUpdate", { followId: event.target.id, userId: props.personalLog }).then(
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

    // console.log(props.followId)
    // Shows at first
    useEffect(() => {
        // console.log(id)
        // console.log(props.personalLog)
        if (JSON.stringify(find) !== JSON.stringify([])) {
            if (find[0] !== undefined) {
                if (id === props.personalLog) {
                    if (JSON.stringify(props.followId[0]) !== JSON.stringify([undefined])) {
                        console.log("First")
                        for (var i = 0; i < props.followId[0].length; i++) {
                            if (find[0]._id === props.followId[0][i]) {
                                setFt(true)
                                break
                            } else {
                                setFt(false)
                            }
                        }
                    }
                } else if (JSON.stringify(find[0].followers) !== JSON.stringify([])) {
                    console.log(find[0].followers)
                    console.log("Second")
                    for (var i = 0; i < find[0].followers.length; i++) {
                        if (props.loggedIn === find[0].followers[i] || find[0].followers[i] === props.personalLog) {
                            setFt(true)
                            break
                        } else {
                            setFt(false)
                        }
                    }
                }
                else {
                    setFt(false)
                }
            }
        }
    }, [find])

    function click() {
        setFind([])
        setName("")
        setResults([])
    }


    useEffect(() => {
        if (ft === true) {
            setFollowtext("Following")
        } else {
            setFollowtext("Follow")
        }
    }, [ft])


    // useEffect(() => {
    //     Axios.get("https://newsapi.org/v2/everything?q=tcs&from=2023-03-05&sortBy=popularity&apiKey=4dd32169f3da4b00a2ddcaa856b640b3").then(
    //         (res) => {
    //             console.log(res.data)
    //         }
    //     )
    // },[])

    return (
        <div className="search-container">
            <div className="search-bar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input className="text-white" value={name} onChange={change} type="text" placeholder="Search Twitter" />
            </div>
            {/* find.map */}
            <div className="search-results">
                {find.map(m => {
                    if (m.img !== undefined) {
                        const base64String = btoa(String.fromCharCode(...new Uint8Array((m.img.data.data))))
                        return (
                            <div className="single-result">
                                <p key={m._id}>
                                    <Link onClick={click}
                                        className="text-white"
                                        to={"/personal_" + m._id}
                                        state={{
                                            searchId: m._id,
                                            followId: m._id,
                                            loggedInUser: props.loggedIn,
                                            followers: m._id,
                                            // followers: find[0].followers,
                                            followText: followtext,
                                            loggedIn: props.loggedIn
                                        }}>
                                        <img className="avatar" src={`data: image/png;base64,${base64String}`} />
                                        {m.name}@{m.userName}</Link>
                                    {m._id !== props.loggedIn ? <button className={`button ${followtext === "Following" ? 'true' : 'false'}`} id={m._id} onClick={follow}>{followtext}</button> :
                                        ""}
                                </p>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <p key={m._id}>
                                    <Link onClick={click}
                                        className="text-white"
                                        to={"/personal_" + m._id}
                                        state={{
                                            searchId: m._id,
                                            followId: m._id,
                                            loggedInUser: props.loggedIn,
                                            followers: m.followers,
                                            followText: followtext,
                                            loggedIn: props.loggedIn
                                        }}>
                                        <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                                        {m.name}@{m.userName}</Link>
                                    {m._id !== props.loggedIn ? <button className={`button ${followtext === "Following" ? 'true' : 'false'}`} id={m._id} onClick={follow}>{followtext}</button> :
                                        ""}
                                </p>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Search

// 4dd32169f3da4b00a2ddcaa856b640b3


