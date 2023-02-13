import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Search(props){
    const location = useLocation()
    const {id} = useParams()
    const [name, setName] = useState("")
    const [stored, setStored] = useState([])
    const [find, setFind] = useState([])
    const [followtext, setFollowtext] = useState("Follow")
    const [followornot, setFollowornot] = useState(false)
    const [ft, setFt] = useState(followornot)

    function change(event){
        setName(event.target.value)
    }
    
    
    function click(){
        Axios.get("http://localhost:5000/signUp").then(
            (res) => {
                setStored(res.data)                
            }
        )
        setFind(stored.filter(m => m.name===name))
    }

    function follow(event){
        if(id===props.loggedIn || id===props.followIdfromPersonal || props.loggedIn===props.searchPersonal){
            Axios.post("http://localhost:5000/followUpdate",{followId: event.target.id, userId: props.loggedIn}).then(
                (res) => {
                    console.log(res.data)
                    if(res.status===200){
                        setFollowornot(res.data)
                        setFt(res.data)
                    }
                }
            )
        }else if(id===props.personalLog || props.personalLog===props.Personalfilter){
            console.log("Second")
            Axios.post("http://localhost:5000/followUpdate",{followId: event.target.id, userId: props.personalLog}).then(
                (res) => {
                    console.log(res.data)
                    if(res.status===200){
                        setFollowornot(res.data)
                        setFt(res.data)
                    }
                }
            )
        }else if(JSON.stringify(props.searchPersonal)===JSON.stringify([]) && props.loggedIn!==undefined){
            Axios.post("http://localhost:5000/followUpdate",{followId: event.target.id, userId: props.loggedIn}).then(
                (res) => {
                    console.log(res.data)
                    if(res.status===200){
                        setFollowornot(res.data)
                        setFt(res.data)
                    }
                }
            )         
        }else if(JSON.stringify(props.Personalfilter)===JSON.stringify([]) && props.personalLog!==undefined){
            Axios.post("http://localhost:5000/followUpdate",{followId: event.target.id, userId: props.personalLog}).then(
                (res) => {
                    console.log(res.data)
                    if(res.status===200){
                        setFollowornot(res.data)
                        setFt(res.data)
                    }
                }
            )         
        }
    }


    useEffect(() => {
        // console.log(props.followIdfromPersonal)
        if(JSON.stringify(find)!==JSON.stringify([])){
            if(find[0]!==undefined){
                if(id===props.personalLog){
                    if(JSON.stringify(props.followId[0])!==JSON.stringify([])){
                        // console.log("First")
                        for(var i=0; i<props.followId[0].length; i++){
                            if(find[0]._id===props.followId[0][i]){
                                setFt(true)
                                break
                            }else{
                                setFt(false)
                            }
                        }
                    }
                }else if(JSON.stringify(find[0].followers)!==JSON.stringify([])){
                    // console.log("Second")
                    for(var i=0; i<find[0].followers.length; i++){
                        if(props.loggedIn===find[0].followers[i] || find[0].followers[i]===props.personalLog){
                            setFt(true)
                            break
                        }else{
                            setFt(false)
                        }
                    }
                }else{
                    setFt(false)
                }
            }
        }
    },[find])


    useEffect(() => {
        if(ft===true){
            setFollowtext("Following")
        }else{
            setFollowtext("Follow")
        }
    },[ft])


    return(
        <div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input value={name} onChange={change} type="text" placeholder="Search"/>
            </div>
            {find.map(m => <p key={m._id}>Found Search: 
                <Link 
                    to={"/personal_"+m._id} 
                    state={{
                        searchId: m._id,
                        followId: find[0]._id,
                        loggedInUser: props.loggedIn,
                        followers: find[0].followers
                    }}>{m.name}</Link> 
                <button id={m._id} onClick={follow}>{followtext}</button></p>)}
            <button onClick={click}>Submit</button>
        </div>
    )
}

export default Search


// if(props.followers!==undefined){
//     console.log(JSON.stringify(find[0].followers)===JSON.stringify([]))