import React, { useState, useRef } from "react";
import logo from "../../assets/logo/logo.png";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";
import AuthInputs from "../../components/auth/AuthInputs";
import { DarkModeContext } from "../../context/darkModeContext";

function Login() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, auth } = React.useContext(AuthContext);
  const { darkMode } = React.useContext(DarkModeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    auth({ email, password }, "login");
    console.log("User logged in:", email, password);
    if (currentUser.type === "Student") {
      window.location.href = `/home/${currentUser._id}`;
    } 
    else if (currentUser.type === "Teacher") {
      window.location.href = `/teacher-home/${currentUser._id}`;
    }
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
      <div className="login-container relative flex flex-col justify-center rounded-[10px] px-5 py-5 max-w-[40%] min-w-fit mt-[15vh] mx-auto animate-[rotate_5s_linear_infinite]">
        <div className="login-header">
          <div className={`flex justify-center items-center mb-5 w-[150px] h-[150px] rounded-full bg-[#0b0048] logo-container`}>
            <img
              src={logo}
              alt="logo"
              className="w-20 h-20 object-cover object-center m-5 logo"
            />
          </div>
          <h1 className=" text-[4rem] font-extrabold text-[#dedede]">
            Log In to SchoolIo
          </h1>
        </div>

        <form onSubmit={handleLogin}>
          
          <AuthInputs
            placeholder="Email"
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
            LOG IN
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
              Lost credentials ? Contact your school.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
