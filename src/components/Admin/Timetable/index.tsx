import { classrooms, teachers } from "../../../data";
import PageHeader from "../../../shared/PageHeader";

const TimetablePage = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [
    "8:00-8:40",
    "8:40-9:20",
    "9:20-10:00",
    "10:20-11:00",
    "11:00-11:40",
    "11:40-12:20",
    "1:20-2:00",
    "2:00-2:40",
  ];
  return (
    <div className="space-y-6">
      <PageHeader
        title="Timetable Management"
        sub="Manage the timetable for each class"
        buttonText="Create Period Interval"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
            {classrooms
              .flatMap((level) => level.classroom)
              .map((section, index) => (
                <option key={index} value={index}>
                  {section.name}
                </option>
              ))}
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Save Timetable
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-medium">Time</th>
                {days.map((day) => (
                  <th key={day} className="text-left p-3 font-medium">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((period, periodIndex) => (
                <tr key={period} className="border-b">
                  <td className="p-3 font-medium bg-gray-50">{period}</td>
                  {days.map((day, dayIndex) => (
                    <td key={day} className="p-2">
                      {periodIndex === 2 && dayIndex === 0 ? (
                        <div className="bg-orange-100 p-2 rounded text-center">
                          <div className="font-medium text-orange-800">
                            BREAK
                          </div>
                          <div className="text-xs text-orange-600">20 mins</div>
                        </div>
                      ) : periodIndex === 5 && dayIndex === 0 ? (
                        <div className="bg-blue-100 p-2 rounded text-center">
                          <div className="font-medium text-blue-800">LUNCH</div>
                          <div className="text-xs text-blue-600">60 mins</div>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-200 p-2 rounded min-h-16 hover:border-green-300 cursor-pointer">
                          <select className="w-full text-xs border-0 focus:ring-0">
                            <option value="">Select Subject</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="English">English</option>
                            <option value="Science">Science</option>
                            <option value="Social Studies">
                              Social Studies
                            </option>
                          </select>
                          <select className="w-full text-xs border-0 focus:ring-0 mt-1">
                            <option value="">Select Teacher</option>
                            {teachers.map((teacher) => (
                              <option key={teacher.id} value={teacher.id}>
                                {`${teacher.firstName} ${teacher.lastName}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
