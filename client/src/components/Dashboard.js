import React from "react";
import { useSelector } from "react-redux";
import Topnavigation from "./Topnavigation";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();

  let storeObj = useSelector((store) => {
    return store;
  });

  let onDeleteProfile = async () => {
    let url = `/deleteProfile?email=${storeObj.loginDetails.email}`;

    let reqOptions = {
      method: "DELETE",
    };

    let JSONData = await fetch(url, reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);

    if (JSOData.status == "success") {
      navigate("/");
    }
  };
  return (
    <div>
      <Topnavigation />
      <h1>Dashboard</h1>
      <h2>First Name :{storeObj.loginDetails.firstName}</h2>
      <h2>Last Name :{storeObj.loginDetails.lastName}</h2>

      <img
        className="profilePic"
        src={`/${storeObj.loginDetails.profilePic}`}
      ></img>
      <div>
        <button
          onClick={() => {
            onDeleteProfile();
          }}
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
