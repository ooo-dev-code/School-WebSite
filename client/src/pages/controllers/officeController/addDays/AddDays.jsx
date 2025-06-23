import React, { use } from "react";
import { useEffect } from "react";
import makeRequest from "../../../../axios";
import AuthSelections from "../../../../components/auth/AuthSelections";
import "../../teacherController/Add.css";
import { Days } from "../../../../components/days/Days";

function AddDays() {
  const [week, setWeek] = React.useState("");
  const [day, setDay] = React.useState("");
  const [studentClass, setStudentClass] = React.useState("");
  const [hour, setHour] = React.useState("");
  const [teacher, setTeacher] = React.useState("");

  const [names, setNames] = React.useState([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ]);

  const [users, setUsers] = React.useState([]);
  const [hours, setHours] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let date = String(hour) + " " + week + " " + day + " " + studentClass;
    let duplicate = true;
    try {
      hours.map((h) => {
        if (h.week == date) {
          duplicate = false;
        }
      });
      if (duplicate) {
        await makeRequest.post(
          "/hour",
          {
            week: date,
            hour,
            teacher,
          },
          { withCredentials: true }
        );
        window.location.reload();
      }
    } catch (error) {
      console.error("Error posting hour:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await makeRequest.get("/user", { withCredentials: true });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
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

  const deleteHour = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this hour?"
      );
      if (!confirm) return;

      await makeRequest.delete("/hour/" + id, { withCredentials: true });

      setHours((prev) => prev.filter((h) => h._id !== id));
      alert("Hour deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting hour:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getAllUsers();
    getHours();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grade-container flex flex-col gap-4 max-w-md mx-auto"
      >
        <label htmlFor="week">Week</label>
        <input
          type="number"
          id="week"
          name="week"
          placeholder="Enter week number"
          required
          value={week}
          onChange={(e) => setWeek(String(e.target.value))}
          min={1}
          max={42}
        />

        <AuthSelections
          name="class"
          optionList={["101", "102", "103", "104", "105", "106"]}
          variable={studentClass}
          setVariable={setStudentClass}
          required
        />

        <AuthSelections
          name="day"
          optionList={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
          variable={day}
          setVariable={setDay}
          required
        />

        <label htmlFor="hour">Hour</label>
        <input
          type="number"
          id="hour"
          name="hour"
          placeholder="Enter hour number"
          required
          value={hour}
          onChange={(e) => setHour(String(e.target.value))}
          min={1}
          max={7}
        />

        <label htmlFor="teacher">Teacher</label>
        <select
          id="teacher"
          name="teacher"
          className="color-gray-900 bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          required
        >
          <option value="">Select a teacher</option>
          {users.map(
            (user) =>
              user.type === "Teacher" && (
                <option key={user._id} value={user._id}>
                  {user.username || user.name || user.email}
                </option>
              )
          )}
        </select>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Day
        </button>
      </form>

      <div className="hour-container">
        <Days name="monday" hours={hours} deleteHour={deleteHour} />
        <Days name="tuesday" hours={hours} deleteHour={deleteHour} />
        <Days name="wednesday" hours={hours} deleteHour={deleteHour} />
        <Days name="thursday" hours={hours} deleteHour={deleteHour} />
        <Days name="friday" hours={hours} deleteHour={deleteHour} />
      </div>
    </div>
  );
}

export default AddDays;
