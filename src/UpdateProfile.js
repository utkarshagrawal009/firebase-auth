import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, update } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./UpdateProfile.css";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [photoURL, setPhoto] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/update");
  }, [user, loading]);

  return (
    <div className="update">
      <div className="update__container">
        <input
          type="text"
          className="update__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Username"
        />
        <input
          type="text"
          className="update__textBox"
          value={photoURL}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="URL of new Profile Picture"
        />
        <button
          className="update__btn"
          onClick={() => update(name, photoURL)}
        >
          Update Profile
        </button>
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
