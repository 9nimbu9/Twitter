import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from "../Components/Card"
import Search from "../Components/Search"
import Axios from "axios"
import { useParams } from "react-router-dom";
import HomeInfo from "../Components/HomeInfo";
import { useLocation } from "react-router-dom";
import PersonalCard from "../Components/PersonalCard";


function Personal(){
    const location = useLocation()
    const {id} = useParams()
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
    const [followtext, setFollowtext] = useState("Follow")
    const [followers, setFollowers] = useState([])
    const [searchPersonal, setSearchPersonal] = useState([])
    const [searchTweet, setSearchTweet] = useState([])
    const [st, setSt] = useState(false)

    console.log(followId)


    useEffect(() => {
        Axios.get("http://localhost:5000/upload").then(
            (response) => {
                setStoretweet(response.data)
                setBol(false)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    },[bol])

    useEffect(() => {
        Axios.get("http://localhost:5000/signUp").then(
            (res) => {
                setUser(res.data)
            }
        )
    },[])

    function follows(event){
        event.preventDefault()
        Axios.post("http://localhost:5000/followUpdate", {userId: loggedInUser, followId: followId}).then(
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
        setFilter(user.filter(m => m._id===loggedInUser))
        const found = user.filter(m => id===m._id)
        if(location.state.followers!==undefined){
            if(JSON.stringify(location.state.followers)!==[]){
                for(var i=0; i<location.state.followers.length;i++){
                    if(location.state.followers[i]===loggedInUser || location.state.followers[i]==personalLog){
                        setSearchPersonal(location.state.followers[i])
                    }
                }
            }            
        }
        if(found!==[]){
            if(found[0]!==undefined){
                setFollow(found[0].followId)
                setFollowers(found[0].followers)
            }
        }
    },[user])

    // console.log(location.state.followers)

    useEffect(() => {
        if(location.state.followers!==undefined){
            if(JSON.stringify(location.state.followers)!==JSON.stringify([])){
                for(var i=0; i<location.state.followers.length;i++){
                    if(location.state.followers[i]===loggedInUser || location.state.followers[i]==personalLog){
                        setPersonalFilter(location.state.followers[i])
                    }
                }
            }
        }
    },[location.state.followers])

    useEffect(() => {
        Axios.get("http://localhost:5000/upload").then(
            (response) => {
                setSearchTweet(response.data)
            }
        )
        setSt(true)
    },[location.state.searchId])    

    useEffect(() => {
        if(filter!==[]){
            if(filter[0]!==undefined){
                for(var i=0; i<filter[0].followId.length;i++){
                    if(filter[0].followId[i]===followId){
                        setFt(true)
                    }
                }
            }
        }
    },[filter])

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
                    if(personalLog!==undefined || loggedInUser!==undefined){
                        if(personalLog===m._id){
                            {/* {console.log("1")} */}
                            return <HomeInfo key={id} id={personalLog} name={m.name}/>
                        }else if(loggedInUser===m._id){
                            {/* {console.log("2")} */}
                            return <HomeInfo key={id} id={loggedInUser} name={m.name}/>
                        }
                    }else{
                        {/* On refreshing */}
                        {/* {console.log("3")} */}
                        return <HomeInfo key={id} id={personalLog} name={m.name}/>
                    }
                })} 
            </div>


            <div className="tweetArea" style={{width: "50%"}}>
                {personalLog!==id?<button onClick={follows}>{followtext}</button>:""}
                <div>
                    <PersonalCard personalLog={personalLog} loggedInUser={loggedInUser} following={[follow]} followers={[followers]}/>
                </div>

                {st===false?storeTweet.map(singleData=> {
                    if(singleData.img!==undefined){
                        const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))                        
                        if(singleData.userId===id || singleData.retweetedBy.filter(m => m===id)[0]===id){
                            return(
                                <div key={singleData._id}>
                                    <Card key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} followId={followId} personalId={id} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`}/>   
                                </div> 
                            )
                        }
                    }else{
                        if(followId!==undefined){
                            if(singleData.userId===id || singleData.retweetedBy.filter(m => m===id)[0]===id){
                                return(
                                    <div key={singleData._id}>
                                        <Card key={singleData._id}  personalLog={personalLog} loggedInUser={loggedInUser} followId={followId} personalId={id} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet}/>   
                                    </div> 
                                )
                            }
                        }else{
                            if(singleData.userId===id || singleData.retweetedBy.filter(m => m===id)[0]===id){
                                return(
                                    <div key={singleData._id}>
                                        <Card key={singleData._id}  personalLog={personalLog} loggedInUser={loggedInUser} PersonalfollowId={singleData.userId} personalId={id} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet}/>   
                                    </div> 
                                )
                            }
                        }                        
                    }
                }):searchTweet.map(singleData=> {
                    if(singleData.img!==undefined){
                        const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))                        
                        if(singleData.userId===id || singleData.retweetedBy.filter(m => m===id)[0]===id){
                            return(
                                <div key={singleData._id}>
                                    <Card key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} followId={followId} personalId={id} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`}/>   
                                </div> 
                            )
                        }
                    }else{
                        if(followId!==undefined){
                            if(singleData.userId===id || singleData.retweetedBy.filter(m => m===id)[0]===id){
                                return(
                                    <div key={singleData._id}>
                                        <Card key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} followId={followId} personalId={id} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet}/>   
                                    </div> 
                                )
                            }
                        }else{
                            if(singleData.userId===id || singleData.retweetedBy.filter(m => m===id)[0]===id){
                                return(
                                    <div key={singleData._id}>
                                        <Card key={singleData._id} personalLog={personalLog} loggedInUser={loggedInUser} PersonalfollowId={singleData.userId} personalId={id} rt={singleData.retweetedBy} l={singleData.l} logged={id} person={singleData.userId} id={singleData._id} tweet={singleData.tweet}/>   
                                    </div> 
                                )
                            }
                        }
                    }
                })}
            </div>


            <div className="" style={{width: "35%"}}>
                <Search userId={id} loggedIn={loggedInUser} Personalfilter={Personalfilter} searchPersonal={searchPersonal} personalLog={personalLog} followIdfromPersonal={followId} followers={[followers]} followId={[follow]}/>
            </div>


        </div>
    )
}

export default Personal