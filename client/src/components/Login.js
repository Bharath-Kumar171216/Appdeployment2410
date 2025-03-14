import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      emailInputRef.current.value = localStorage.getItem("email");
      passwordInputRef.current.value = localStorage.getItem("password");
      onValidateToken();
    }
  }, []);

  let onValidateToken = async () => {
    let dataToSend = new FormData();

    dataToSend.append("token", localStorage.getItem("token"));

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/validateToken", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);

    if (JSOData.status == "success") {
      // localStorage.setItem("email",emailInputRef.current.value);
      // localStorage.setItem("password",passwordInputRef.current.value);
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    } else {
      alert(JSOData.msg);
    }
  };

  let onLogin = async () => {
    let dataToSend = new FormData();

    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/login", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);

    if (JSOData.status == "success") {
      // localStorage.setItem("email",emailInputRef.current.value);
      // localStorage.setItem("password",passwordInputRef.current.value);
      localStorage.setItem("token", JSOData.data.token);
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    } else {
      alert(JSOData.msg);
    }
  };
  return (
    <div className="App">
      <form className="App">
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onLogin();
            }}
          >
            Log in
          </button>
          <br></br>
        </div>
      </form>
      <div>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
