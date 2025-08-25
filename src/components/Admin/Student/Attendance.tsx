const attendances = ({ attendances }: any) => {
  console.log(attendances);
  return (
    <div className=" space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">Total Days</h4>
          <p className="text-2xl font-bold text-blue-600">
            {attendances.total}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">Present</h4>
          <p className="text-2xl font-bold text-green-600">
            {attendances.present}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-medium text-red-900">Absent</h4>
          <p className="text-2xl font-bold text-red-600">
            {attendances.absent}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900">Late</h4>
          <p className="text-2xl font-bold text-yellow-600">
            {attendances.late}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Recent attendances Record
        </h3>
        <div className="overflow-x-auto border border-[#EAECF0]">
          <table className="w-full text-sm  divide-y divide-[#EAECF0]">
            <thead className="bg-[#F9FAFB]">
              <tr className="bg-gray-50">
                <th className="text-left p-3">Date</th>
                <th className="text-center p-3">Status</th>
                <th className="text-center p-3">Time In</th>
                <th className="text-center p-3">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {attendances.recentRecord.map((record: any, index: any) => (
                <tr
                  key={index}
                  className="border-b border-[#EAECF0] hover:bg-gray-50"
                >
                  <td className="p-3">{record.date}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : record.status === "Late"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">{record.timeIn || "-"}</td>
                  <td className="p-3 text-center">
                    {record.status === "Late"
                      ? "Arrived 15 mins late"
                      : record.status === "Absent"
                        ? "No excuse provided"
                        : "On time"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default attendances;
