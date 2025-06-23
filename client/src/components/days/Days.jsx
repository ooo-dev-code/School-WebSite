import React from "react";

export function Days({ name, hours, deleteHour, users }) {
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const capitalizedDayName = capitalizeFirstLetter(name);

  const filteredAndSortedHours = hours
    .filter((h) => h.week.split(" ")[2] === capitalizedDayName)
    .sort((a, b) => {
      const aOrder = parseInt(a.week.split(" ")[0]);
      const bOrder = parseInt(b.week.split(" ")[0]);
      return aOrder - bOrder;
    });

  return (
    <div className="day mx-[200px] my-4 bg-blue-200 p-6 rounded-xl" style={{ color: "black" }}>
      <h1 className="text-2xl font-bold mb-4">{capitalizedDayName}</h1>

      {filteredAndSortedHours.map((h) => {
        const teacher = users.find((user) => {user._id === h.teacher; console.log(h.teacher)});

        return (
          <div key={h._id} className="hour bg-blue-50 p-4 mb-4 rounded-lg shadow">
            <div className="text-lg font-medium">
              {teacher ? teacher.username : "Unknown"}
            </div>
            {deleteHour && (
              <button
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-inner hover:bg-red-700"
                onClick={() => deleteHour(h._id)}
              >
                Delete
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
