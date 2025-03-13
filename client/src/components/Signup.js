import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let phoneNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic,setProfilePic] = useState("./images/no-pic.jpg")

  let onSendingDataToServer = async() => {
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
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:12345/signup",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);

    


  };
  return (
    <div className="App">
      <form className="App">
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
          <input ref={emailInputRef}></input>
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
            onSendingDataToServer();
          }}>Sign up</button>
          <br></br>
          
        </div>
      </form>
      <div>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
