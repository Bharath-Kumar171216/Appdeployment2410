import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";

function Topnavigation() {


    let navigate = useNavigate();

    

    

    let storeObj = useSelector((store)=>{
        return store;


    })
    useEffect(()=>{
        if(storeObj && storeObj.loginDetails &&  storeObj.loginDetails.email ){

        }else{
            navigate("/")
    
        }

    },[])

   
  return (
   <nav>
    <Link to="/dashboard">Dash board</Link>
    <Link to="/editprofile">Edit Profile</Link>
    <Link to="/tasks">Tasks</Link>
    <Link to="/leaves">Leaves</Link>
    <Link to="/requests">Requests</Link>
    <Link to="/" onClick={()=>{
        localStorage.clear();
    }} >Signout</Link>

   </nav>
  )
}

export default Topnavigation
