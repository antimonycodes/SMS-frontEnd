import { classrooms } from "../../../data";
import { Edit2Icon } from "lucide-react";

const ClassroomList = ({ selectedLevel, setSelectedLevel }: any) => {
  console.log(classrooms[selectedLevel]);
  return (
    <div className="card space-y-4">
      {/* LEVEL */}
      <div className=" flex items-center gap-3">
        {classrooms.map((level, index) => (
          <div
            key={index}
            className={` text-gray-2W00 p-2 rounded-lg transition-colors duration-500 ${selectedLevel === index ? "bg-brand-500 font-semibold text-white" : "bg-gray-400"}`}
            onClick={() => setSelectedLevel(index)}
          >
            {level.category}
          </div>
        ))}
      </div>
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classrooms[selectedLevel].classroom.map((classData, index) => (
          <div
            key={index}
            className=" border rounded-lg p-4 hover:shadow-md transition-shadow space-y-4"
          >
            <div className=" flex items-center justify-between">
              <h1>{classData.name}</h1>
              <span>
                <Edit2Icon className="size-4" />
              </span>
            </div>
            {/*  */}
            <div className=" fcb">
              <span className="text-gray-600">Students:</span>
              <span>{classData.students}</span>
            </div>
            <div className=" fcb">
              <span className="text-gray-600">Teachers:</span>
              <span>{classData.teachers}</span>
            </div>{" "}
            <div className=" fcb">
              <span className="text-gray-600">Class Teacher:</span>
              <span>{classData.classTeacher}</span>
            </div>
            {/*Activities  */}
            {/* <hr /> */}
            <div className="mt-4 pt-4 border-t">
              <div className="text-xs text-gray-500 mb-2">Recent Activity:</div>
              <div className="text-xs text-gray-600">
                • Last attendance: Today
                <br />
                • Recent grade entry: Mathematics
                <br />• Fee payment: 85% collected
              </div>
            </div>
            {/* CTA */}
            <div className="mt-4 flex gap-2">
              <button
                // onClick={() => setActiveSection("students")}
                className="flex-1 bg-blue-50 text-red-600 px-3 py-2 rounded text-sm hover:bg-blue-100"
              >
                Delete
              </button>
              <button
                // onClick={() => setActiveSection("timetable")}
                className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded text-sm hover:bg-green-100"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
      {/*  */}
    </div>
  );
};

export default ClassroomList;
