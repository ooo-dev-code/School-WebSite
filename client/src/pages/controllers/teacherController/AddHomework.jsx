import React, { useState, useEffect, useContext } from "react";
import makeRequest from "../../../axios";
import { AuthContext } from "../../../context/authContext";
import AuthInputs from "../../../components/auth/AuthInputs";
import "./Add.css"

function AddHomework() {
  const { currentUser } = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [studentClass, setStudentClass] = useState("101");
  const [students, setStudents] = useState([]);

  const getAllStudents = async () => {
    try {
      const res = await makeRequest.get("/user", { withCredentials: true });
      const filtered = res.data.filter(
        (user) => user.type === "Student" && user.classes === studentClass
      );
      setStudents(filtered);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const getAllHomeworks = async () => {
    try {
      const res = await makeRequest.get("/homework/" + currentUser._id, { withCredentials: true });
      console.log("Homeworks fetched successfully:", res.data);
    } catch (error) {
      console.error("Error fetching homeworks:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.type === "Teacher") {
      getAllStudents();
      getAllHomeworks();
    }
  }, [studentClass]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const promises = students.map((student) =>
        makeRequest.post(
          "/homework",
          {
            teacher: currentUser._id,
            student: student._id,
            content,
            done: false,
          },
          { withCredentials: true }
        )
      );

      await Promise.all(promises);
      alert("Homework assigned to all students in class " + studentClass);
      setContent("");
    } catch (err) {
      console.error("Error assigning homework:", err);
    }
  };

  if (currentUser.type !== "Teacher") {
    return <p className="p-5">Only teachers can assign homework.</p>;
  }

  return (
    <div className=" grade-container max-w-lg mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Assign Homework</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Class</label>
        <select
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          className="p-2 border rounded"
        >
          {["101", "102", "103", "104", "105", "106"].map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <label>Homework Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          className="p-2 border rounded"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Assign to Class {studentClass}
        </button>
      </form>
    </div>
  );
}

export default AddHomework;
