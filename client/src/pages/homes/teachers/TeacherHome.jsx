import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

function TeacherHome() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <p className="text-white text-center">Loading user info...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white px-4">
      <div className="w-full max-w-2xl p-6 bg-[#1f1f1f] rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome, {currentUser.username}
        </h1>

        <div className="space-y-2 text-lg">
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Role:</strong> {currentUser.type}</p>
          {currentUser.subject && <p><strong>Subject:</strong> {currentUser.subject}</p>}
          {currentUser.classes && <p><strong>Class:</strong> {currentUser.classes}</p>}
          <p><strong>User ID:</strong> {currentUser._id}</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;
