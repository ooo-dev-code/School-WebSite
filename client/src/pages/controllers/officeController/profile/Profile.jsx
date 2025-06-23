import React, { useEffect, useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/authContext";
import makeRequest from "../../../../axios";
import AuthInputs from "../../../../components/auth/AuthInputs";
import AuthSelections from "../../../../components/auth/AuthSelections";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  // Redirect non-Office users
  useEffect(() => {
    if (currentUser?.type !== "Office") {
      window.location.href = "/";
    }
  }, [currentUser]);

  const [users, setUsers] = useState([]);

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [classes, setClasses] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const circleRef = useRef(null);

  const getAllUsers = async () => {
    try {
      const res = await makeRequest.get("/user", { withCredentials: true });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      await makeRequest.delete(`/user/${userId}`, {
        withCredentials: true,
      });

      setUsers((prev) => prev.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: username,
      email,
      type,
      ...(type === "Teacher" && { subject }),
      ...(type === "Student" && { classes }),
    };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    try {
      const res = await makeRequest.put(`/user/${id}`, updatedUser, {
        withCredentials: true,
      });
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? res.data : user))
      );
      alert("User updated successfully!");
      setPassword("");
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCirclePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Group users by type
  const userTypes = ["Student", "Teacher", "Office"];
  const groupedUsers = userTypes.map((type) => ({
    type,
    list: users.filter((user) => user.type === type),
  }));

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">User Directory</h1>

      {groupedUsers.map((group) => (
        <div key={group.type} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{group.type}s</h2>
          {group.list.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.list.map((user) => (
                <div
                  key={user._id}
                  className="p-4 border rounded shadow bg-white dark:bg-[#1f1f1f]"
                >
                  <p>
                    <strong>Name:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.type}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setId(user._id);
                        setUsername(user.username);
                        setEmail(user.email);
                        setType(user.type);
                        setSubject(user.subject || "");
                        setClasses(user.classes || "");
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No {group.type.toLowerCase()}s found.
            </p>
          )}
        </div>
      ))}

      <h2 className="text-2xl font-semibold mb-4 mt-10">Update User</h2>
      <form onSubmit={handleUpdateUser}>
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

        <div className="form-group relative">
          <label htmlFor="password">
            Password (leave blank to keep current)
          </label>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full p-2.5 my-2.5 rounded border border-[#444] bg-[#252525] text-white text-[1.2rem] focus:shadow-sm focus:transition-all focus:duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
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
          UPDATE USER
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
      </form>
    </div>
  );
}

export default Profile;
