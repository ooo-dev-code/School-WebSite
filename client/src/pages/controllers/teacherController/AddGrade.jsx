import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import makeRequest from "../../../axios";
import "./Add.css"

function AddGrade() {
  const { currentUser } = useContext(AuthContext);

  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [maxGrade, setMaxGrade] = useState("20");

  useEffect(() => {
    if (currentUser?.type === "Teacher") {
      fetchStudents();
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await makeRequest.get("/user", { withCredentials: true });
      const studentUsers = res.data.filter((u) => u.type === "Student");
      setStudents(studentUsers);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !description || grade === "") {
      alert("Please fill all fields.");
      return;
    }

    try {
      await makeRequest.post(
        "/grade",
        {
          student: studentId,
          teacher: currentUser._id,
          description,
          grade: parseFloat(grade),
          maxGrade: parseFloat(maxGrade),
        },
        { withCredentials: true }
      );
      alert("Grade submitted successfully.");
      // reset form
      setDescription("");
      setGrade("");
      setMaxGrade("20");
    } catch (err) {
      console.error("Error submitting grade:", err);
      alert("Error submitting grade.");
    }
  };

  if (currentUser?.type !== "Teacher") {
    return <p className="p-5">Only teachers can assign grades.</p>;
  }

  return (
    <div className="grade-container p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Assign Grade to a Student</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Select Student</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Student --</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <input
            type="text"
            placeholder="e.g. History Quiz"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Grade</label>
            <input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g. 17"
              min={0}
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Max Grade</label>
            <input
              type="number"
              value={maxGrade}
              onChange={(e) => setMaxGrade(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g. 20"
              min={1}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Grade
        </button>
      </form>
    </div>
  );
}

export default AddGrade;
