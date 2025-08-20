import { useState } from "react";
import { classrooms, studentsList } from "../../../data";

const AttendanceList = () => {
  const [, setSelectedClassroom] = useState("");
  const stats = [
    { label: "Total Students", value: 100 },
    { label: "Present ", value: 80 },
    { label: "Absent ", value: 20 },
    { label: "Late ", value: 5 },
  ];
  const statsTextColor = [
    "text-blue-600",
    "text-green-600",
    "text-red-600",
    "text-yellow-600",
  ];

  return (
    <div className="card space-y-6">
      {/* filter */}
      <div className=" flex gap-4">
        {/* filter by classroom */}
        <div>
          <select className="px-4 py-2.5 border border-brand-500 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500">
            {classrooms.flatMap((data) =>
              data.classroom.map((item, index) => (
                <option
                  key={index}
                  value={item.name}
                  onClick={() => setSelectedClassroom(item.name)}
                >
                  {item.name}
                </option>
              ))
            )}
          </select>
        </div>
        {/* filter by date */}
        <div>
          <input
            type="date"
            className="px-4 py-2 border border-brand-500 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>
      </div>
      {/* Attendance stats */}
      <div className="grid grid-cols-4 gap-6 justify-between">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex  rounded-lg border p-6 flex-col  items-center justify-between "
          >
            <span className={`text-2xl font-bold ${statsTextColor[index]}`}>
              {stat.value}
            </span>
            <span className="text-gray-600 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
      {/* Attendance List */}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3">Student ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Time In</th>
              <th className="text-left p-3">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-3 font-mono">{student.id}</td>
                <td className="p-3 font-medium">{`${student.lastName} ${student.lastName}`}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`attendance_${student.id}`}
                        value="present"
                        className="mr-1"
                      />
                      <span className="text-green-600">Present</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`attendance_${student.id}`}
                        value="absent"
                        className="mr-1"
                      />
                      <span className="text-red-600">Absent</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`attendance_${student.id}`}
                        value="late"
                        className="mr-1"
                      />
                      <span className="text-yellow-600">Late</span>
                    </label>
                  </div>
                </td>
                <td className="p-3">
                  <input
                    type="time"
                    className="px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-green-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Optional remarks..."
                    className="w-full px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-green-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;
