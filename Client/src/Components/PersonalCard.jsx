import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Axios from "axios";

function PersonalCard(props) {
    const location = useLocation()
    const { id } = useParams()
    const [user, setUser] = useState([])
    const [file, setFile] = useState("")
    const [bol, setBol] = useState(true)



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
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('userId', id)

        Axios.post("http://localhost:5000/profileImage", formData).then(res => {
            console.log(res)
            if (res.status === 200) {
                setBol(true)
            }
        }).catch(
            (error) => {
                console.log(error)
            }
        )
    }, [file])

    function onInputChange(event) {
        setFile(event.target.files[0])
    }

    return (
        <div className="personal-card">
            <div className="user-info">
                {user.map(m => {
                    if (m._id === id) {
                        if (m.img !== undefined) {
                            if (props.personalLog === id || id == props.loggedInUser) {
                                const base64String = btoa(String.fromCharCode(...new Uint8Array((m.img.data.data))))
                                return (
                                    <div className="tweetActions">
                                        <label for="fileImage">
                                            <img className="avatarPersonal" src={`data: image/png;base64,${base64String}`} />
                                        </label>
                                        <input type="file" id="fileImage" name="photo" onChange={onInputChange} />
                                        <div>
                                            <span>{m.name}</span>
                                            <span> @{m.userName}</span>
                                        </div>
                                    </div>
                                )
                            } else {
                                const base64String = btoa(String.fromCharCode(...new Uint8Array((m.img.data.data))))
                                return (
                                    <div className="tweetActions">
                                        <img className="avatarPersonal" src={`data: image/png;base64,${base64String}`} />
                                        <div>
                                            <span>{m.name}</span>
                                            <span> @{m.userName}</span>
                                        </div>
                                    </div>
                                )
                            }
                        } else {
                            return (
                                <div>
                                    <img className="avatarPersonal" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                                    <div>
                                        <span>{m.name}</span>
                                        <span> @{m.userName}</span>
                                    </div>
                                </div>
                            )
                        }
                    }
                })}
            </div>
            
            <div className="followers-following">
                <span>{JSON.stringify(props.following) !== JSON.stringify([undefined]) ? props.following[0].length : "0"}</span>
                <Link className="link"
                    to={"/following_" + props.personalLog}
                    state={{
                        followers: props.followers,
                        following: props.following,
                        personalLog: props.personalLog,
                    }}>Following
                </Link>
                <span>{JSON.stringify(props.followers) !== JSON.stringify([undefined]) ? props.followers[0].length : "0"}</span>
                <Link className="link"
                    to={"/followers_" + props.personalLog}
                    state={{
                        following: props.following,
                        followers: props.followers,
                        personalLog: props.personalLog,
                    }}>Followers
                </Link>
            </div>
        </div>
    )
}

export default PersonalCard