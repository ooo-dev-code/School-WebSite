import React, { useState, useRef } from "react";
import logo from "../../assets/logo/logo.png";
import "../login/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import AuthSelections from "../../components/auth/AuthSelections";
import AuthInputs from "../../components/auth/AuthInputs";

function Register() {
  // State variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [classes, setClasses] = useState("");

  const { currentUser, auth } = React.useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (type == "Teacher") {
      auth(
        { username, email, password, type, subject, classes: "106" },
        "register"
      );

    }
    else {
      
    auth(
      { username, email, password, type, subject, classes },
      "register"
    );
    }
    console.log("User registered in:", {
      username,
      email,
      password,
      type,
      subject,
      classes,
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const circleRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCirclePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div>
      <div className="login-container relative flex flex-col justify-center rounded-[10px] px-5 py-5 max-w-[40%] min-w-fit mt-[10vh] mx-auto animate-[rotate_5s_linear_infinite]">
        <div className="login-header">
          <div className="flex justify-center items-center mb-5 w-[150px] h-[150px] rounded-full bg-[#0b0048] logo-container">
            <img
              src={logo}
              alt="logo"
              className="w-20 h-20 object-cover object-center m-5 logo"
            />
          </div>
          <h1 className=" text-[4rem] font-extrabold text-[#dedede]">
            Register People
          </h1>
        </div>

        <form onSubmit={handleLogin}>
          <AuthInputs
            placeholder="Name Surname ex: John Dupont"
            name="username"
            variable={username}
            setVariable={setUsername}
          />

          <AuthInputs
            placeholder="name@schoolio.com"
            name="email"
            variable={email}
            setVariable={setEmail}
          />

          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              style={{ paddingRight: "40px" }}
              className="w-full p-2.5 my-2.5 rounded border border-[#444] bg-[#252525] text-white text-[1.2rem] focus:shadow-sm focus:transition-all focus:duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                transform: "translateY(170%)",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <AuthSelections
            name="type"
            variable={type}
            setVariable={setType}
            optionList={["Student", "Teacher", "Office"]}
          />
          {type === "Teacher" && (
            <AuthSelections
              name="subject"
              variable={subject}
              setVariable={setSubject}
              optionList={[
                "Math",
                "Science",
                "History",
                "English",
                "Art",
                "Physical Education",
              ]}
            />
          )}

          {type === "Student" && (
            <AuthSelections
              name="classes"
              variable={classes}
              setVariable={setClasses}
              optionList={["101", "102", "103", "104", "105", "106"]}
            />
          )}

          <button
            type="submit"
            className="submit relative overflow-hidden px-5 py-2.5 w-full h-[75px] rounded-full text-black text-[1.2rem] font-medium tracking-wide transition-all duration-300"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "10px 20px",
            }}
          >
            REGISTER USER
            <div
              className="mouse-login-submit"
              ref={circleRef}
              style={{
                position: "absolute",
                left: `${circlePos.x}px`,
                top: `${circlePos.y}px`,
                opacity: hovering ? 1 : 0,
              }}
            />
          </button>

          <div className="contact-login">
            <p className="relative flex justify-center">OR</p>
            <button type="button">
              Problem while registering ? Contact your school.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
