import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import makeRequest from "../../../axios";
import { Days } from "../../../components/days/Days";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [homeworks, setHomeworks] = useState([]);
  const [grades, setGrades] = useState([]);
  const [teacher, setTeach] = useState([]);
  const [hours, setHours] = useState([])

  const fetchData = async () => {
    try {
      const hwRes = await makeRequest.get(`/homework`, {
        withCredentials: true,
      });
      const gradeRes = await makeRequest.get(`/grade`, {
        withCredentials: true,
      });
      const teachRes = await makeRequest.get(`/user`, {
        withCredentials: true,
      });

      setHomeworks(hwRes.data);
      setGrades(gradeRes.data);
      setTeach(teachRes.data);

      console.log(hwRes.data);
      console.log(gradeRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const getHours = async () => {
    try {
      const res = await makeRequest.get("/hour", { withCredentials: true });
      setHours(res.data);
      console.log("Hours fetched successfully:", res.data);
    } catch (error) {
      console.error("Error fetching hours:", error);
    }
  };

  useEffect(() => {
    fetchData();
    getHours()
  }, [currentUser]);

  if (!currentUser)
    return <p className="text-white text-center">Loading user info...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white px-4">
      <div className="w-full max-w-3xl p-6 bg-[#1f1f1f] rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Welcome, {currentUser.username}
        </h1>

        <div className="space-y-2 text-lg">
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Role:</strong> {currentUser.type}
          </p>
          {currentUser.subject && (
            <p>
              <strong>Subject:</strong> {currentUser.subject}
            </p>
          )}
          {currentUser.classes && (
            <p>
              <strong>Class:</strong> {currentUser.classes}
            </p>
          )}
          <p>
            <strong>User ID:</strong> {currentUser._id}
          </p>
        </div>

        {currentUser.type === "Student" && (
          <>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Assigned Homeworks
              </h2>
              {homeworks.length > 0 ? (
                <ul className="list-disc pl-6 space-y-1 text-base">
                  {homeworks.map((hw) => (
                    <div>
                      {hw.student == currentUser._id ? (
                        <li key={hw._id}>
                          <span className="font-medium">From:</span>
                          {teacher.map((t) => {
                            if (t._id == hw.teacher) {
                              return " " + t.username + "   " + t.subject;
                            }
                          })}{" "}
                          — <span className="italic">{hw.content}</span>
                        </li>
                      ) : null}
                    </div>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No homeworks assigned yet.</p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Given Grades</h2>
              {grades.length > 0 ? (
                <ul className="list-disc pl-6 space-y-1 text-base">
                  {grades.map((grade) => (
                    <div>
                      {grade.student == currentUser._id ? (
                        <li key={grade._id}>
                          <span className="font-medium">From:</span>
                          {teacher.map((t) => {
                            if (t._id == grade.teacher) {
                              return " " + t.username + "   " + t.subject;
                            }
                          })}{" "}
                          <span className="font-medium">Grade:</span>{" "}
                          {grade.grade}/{grade.maxGrade} ======{" "}
                          {grade.description}
                        </li>
                      ) : null}
                    </div>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No grades assigned yet.</p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="hour-container">
        <Days name="monday" hours={hours} users={teacher} />
        <Days name="tuesday" hours={hours}  users={teacher} />
        <Days name="wednesday" hours={hours} users={teacher}  />
        <Days name="thursday" hours={hours}  users={teacher} />
        <Days name="friday" hours={hours} users={teacher}  />
      </div>
    </div>
  );
}

export default Home;
