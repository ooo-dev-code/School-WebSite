import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./NavBar.css"; 

function NavBar() {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div>
      <nav className="">
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
          <div className="text-lg font-bold">
            {currentUser ? `Welcome, ${currentUser.username}` : "Welcome"}
          </div>

          <div className="flex items-center">
            <div className="text-sm">
              {currentUser ? `Role: ${currentUser.type}` : "Please log in"}
            </div>
            <div className="ml-4">
              <button
                onClick={() => {
                  if (currentUser) {
                    handleLogout();
                    window.location.reload();
                  } else {
                    window.location.href = `/`;
                  }
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {currentUser ? "Logout" : "Login"}
              </button>
            </div>
          </div>

          {currentUser && currentUser.type === "Teacher" ? (
            <>
              <a
                href={`/teacher-home/addhomework/${currentUser._id}`}
                className="text-white hover:text-gray-300 mx-2"
              >
                Add Homework
              </a>
              <a
                href={`/teacher-home/addgrade/${currentUser._id}`}
                className="text-white hover:text-gray-300 mx-2"
              >
                Add Grade
              </a>
            </>
          ) : null}
          {currentUser && currentUser.type == "Office" ? (
            <>
              <a
                href={`/office-home/addDays/${currentUser._id}`}
                className="text-white hover:text-gray-300 mx-2"
              >
                Add Days
              </a>
              <a
                href={`/register`}
                className="text-white hover:text-gray-300 mx-2"
              >
                Add Users
              </a>
            </>
          ) : null}

          <div>
            <a href="/" className="text-white hover:text-gray-300 mx-2">
              Log In
            </a>
            {currentUser && currentUser.type === "Teacher" && (
              <a
                href={"/teacher-home/" + currentUser._id}
                className="text-white hover:text-gray-300 mx-2"
              >
                Teacher Home
              </a>
            )}
            {currentUser && currentUser.type === "Student" && (
              <a
                href={"/home/" + currentUser._id}
                className="text-white hover:text-gray-300 mx-2"
              >
                Student Home
              </a>
            )}
            {currentUser && currentUser.type === "Office" && (
              <a
                href={"/profile/" + currentUser._id}
                className="text-white hover:text-gray-300 mx-2"
              >
                Profile
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
