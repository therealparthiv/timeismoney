import React, { useState } from "react";
import {
  faEnvelope,
  faLock,
  faIdBadge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../styling/SignInPage.css";

function SignUpPage() {
  const [signUpType, setSignUpType] = useState("admin");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {};
    if (signUpType === "admin") {
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      formData = { email, password, signUpType };
    } else {
      const teacherID = e.target.elements.teacherID.value;
      const teacherName = e.target.elements.teacherName.value;
      formData = { teacherID, teacherName, signUpType };
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Redirecting to Sign In...", {
          autoClose: 1500,
          onClose: () => navigate("/signin"),
        });
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error("An error occurred during signup.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <div className="buttons-container">
        <button
          className={`button ${signUpType === "admin" ? "active" : ""}`}
          onClick={() => setSignUpType("admin")}>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <span style={{ margin: "10px" }}>Admin</span>
        </button>
        <button
          className={`button ${signUpType === "teacher" ? "active" : ""}`}
          onClick={() => setSignUpType("teacher")}>
          <FontAwesomeIcon icon={faIdBadge} className="icon" />
          <span style={{ margin: "10px" }}>Teacher</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {signUpType === "admin" && (
          <>
            <div className="input-group">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input-field"
                required
              />
            </div>
          </>
        )}

        {signUpType === "teacher" && (
          <>
            <div className="input-group">
              <FontAwesomeIcon icon={faIdBadge} className="icon" />
              <input
                name="teacherID"
                type="text"
                placeholder="Teacher ID"
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                name="teacherName"
                type="text"
                placeholder="Teacher Name"
                className="input-field"
                required
              />
            </div>
          </>
        )}

        <button className="submit-button" type="submit">
          Sign Up
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default SignUpPage;
