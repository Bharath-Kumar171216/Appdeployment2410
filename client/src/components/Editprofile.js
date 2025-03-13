import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Topnavigation from "./Topnavigation";
import Login from "./Login";

function Editprofile() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let phoneNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic,setProfilePic] = useState("./images/no-pic.jpg")


  let loginDetails = useSelector((store)=>{
    return store.loginDetails;

  })

  useEffect(()=>{
    firstNameInputRef.current.value = loginDetails.firstName;
    lastNameInputRef.current.value = loginDetails.lastName;
    ageInputRef.current.value = loginDetails.age;
    emailInputRef.current.value = loginDetails.email;
    phoneNoInputRef.current.value = loginDetails.phoneNo;
    setProfilePic(`http://localhost:12345/${loginDetails.profilePic}`);
    
    
  },[])

  let onUpdateProfileDetails = async() => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("phoneNo", phoneNoInputRef.current.value);

    for(let i=0;i<profilePicInputRef.current.files.length;i++){
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }
   

    let reqOptions = {
      method: "PATCH",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:12345/updateProfile",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);

    


  };
  return (
    <div className="App">
      <Topnavigation/>
      <form className="App">
        <h2>Update Profile</h2>
        <div>
        
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name </label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef} readOnly></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Phone NO</label>
          <input ref={phoneNoInputRef} ></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input type="file" ref={profilePicInputRef}

          onChange={(ele)=>{
            let setURLProfilePic = URL.createObjectURL(ele.target.files[0]);
            setProfilePic(setURLProfilePic);

          }}
            

          ></input>
        </div>
        <img src={profilePic} className="profilePic"></img>
        <div>
          <button type="button"  onClick={()=>{
            onUpdateProfileDetails();
          }}>Update profile</button>
          <br></br>
          
        </div>
      </form>
      
    </div>
  );
}

export default Editprofile;
