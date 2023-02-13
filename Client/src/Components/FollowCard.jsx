import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomeInfo from "./HomeInfo";
import Axios from "axios";
import Search from "./Search";


function FollowCard(props){
    const location = useLocation()
    const {id} = useParams()
    const [user, setUser] = useState([])
    const [name, setName] = useState(props.name)
    const [loggedInUser, setLoggedInUser] = useState(props.loggedInUser)
    const [personalLog, setPersonalLog] = useState(props.personalLog)
    const [followornot, setFollowornot] = useState(false)
    const [ft, setFt] = useState(followornot)
    const [followtext, setFollowtext] = useState("Follow")
    // console.log(followId)

    // console.log(props.followers)

    useEffect(() => {
        Axios.get("http://localhost:5000/signUp").then(
            (res) => {
                setUser(res.data)
            }
        )
    },[])

    function follows(event){
        event.preventDefault()
        Axios.post("http://localhost:5000/followUpdate", {userId: personalLog, followId: event.target.id}).then(
            (res) => {
                console.log(res.data)
                if(res.status===200){
                    setFollowornot(res.data)
                    setFt(res.data)
                }

            }
        )
    }
    useEffect(() => {
        if(JSON.stringify(user.filter(m => m.name===props.name))!==JSON.stringify([])){
            if(user.filter(m => m.name===props.name)[0].followers!==[]){
                for(var i=0; i<user.filter(m => m.name===props.name)[0].followers.length;i++){
                    if(user.filter(m => m.name===props.name)[0].followers[i]===props.personalLog){
                        setFt(true)
                        break
                    }else{
                        setFt(false)
                        setName("")
                    }
                }
            }else{
                setFt(false)
                setName("")
            }
        }            
    },[user])

    useEffect(() => {
        if(ft===true){
            setFollowtext("Following")
        }else{
            setFollowtext("Follow")
        }
    })


    return(
        <div className="row">

            <div className="" style={{width: "15%"}}>
                {user.map(m => {
                    if(personalLog===m._id){
                        {/* {console.log("1")} */}
                        return <HomeInfo key={id} id={personalLog} name={m.name}/>
                    }else if(loggedInUser===m._id){
                        {/* {console.log("2")} */}
                        return <HomeInfo key={id} id={loggedInUser} name={m.name}/>
                    }
                })} 
            </div>

                    
            <div className="tweetArea" style={{width: "50%"}}>
                <Link
                    to={"/personal_"+props.id}
                    state={{
                        loggedInUser: personalLog,
                        followId: props.followId,
                        followers: props.followers,
                    }}>{props.name}</Link>
                <button id={props.followId} onClick={follows}>{followtext}</button>       
            </div>

        </div>
    )
}

export default FollowCard