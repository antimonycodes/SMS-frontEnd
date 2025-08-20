import { BarChart3, Calculator, CheckCircle, XCircle } from "lucide-react";
import { classrooms, studentsList } from "../../../data";
import { useState } from "react";

const FeesStats = () => {
  const [feeClass, setFeeClass] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const filteredFeeStudents = studentsList.filter((student) => {
    const classMatch = feeClass === "all" || student.class === feeClass;
    const paymentMatch =
      paymentFilter === "all" ||
      (paymentFilter === "paid" && student.fees.balance === 0) ||
      (paymentFilter === "pending" && student.fees.balance > 0);
    return classMatch && paymentMatch;
  });
  return (
    <div className=" space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Fees</p>
              <p className="text-2xl font-bold text-gray-900">
                ₦
                {studentsList
                  .reduce((acc, s) => acc + s.fees.total, 0)
                  .toLocaleString()}
              </p>
            </div>
            <Calculator className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collected</p>
              <p className="text-2xl font-bold text-green-600">
                ₦
                {studentsList
                  .reduce((acc, s) => acc + s.fees.paid, 0)
                  .toLocaleString()}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-red-600">
                ₦
                {studentsList
                  .reduce((acc, s) => acc + s.fees.balance, 0)
                  .toLocaleString()}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Collection Rate
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(
                  (studentsList.reduce((acc, s) => acc + s.fees.paid, 0) /
                    studentsList.reduce((acc, s) => acc + s.fees.total, 0)) *
                    100
                )}
                %
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            value={feeClass}
            onChange={(e) => setFeeClass(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Classes</option>
            {classrooms
              .flatMap((level) => level.classroom)
              .map((section) => (
                <option key={section.name} value={section.name}>
                  {section.name}
                </option>
              ))}
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Students</option>
            <option value="paid">Fully Paid</option>
            <option value="pending">Outstanding Balance</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3">Student</th>
                <th className="text-left p-3">Class</th>
                <th className="text-left p-3">Total Fees</th>
                <th className="text-left p-3">Amount Paid</th>
                <th className="text-left p-3">Balance</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeeStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{`${student.lastName} ${student.firstName}`}</p>
                      {/* <p className="text-xs text-gray-500">{student.id}</p> */}
                    </div>
                  </td>
                  <td className="p-3">{student.class}</td>
                  <td className="p-3">
                    ₦{student.fees.total.toLocaleString()}
                  </td>
                  <td className="p-3">₦{student.fees.paid.toLocaleString()}</td>
                  <td className="p-3">
                    ₦{student.fees.balance.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        student.fees.balance === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.fees.balance === 0 ? "Paid" : "Outstanding"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700">
                        Pay
                      </button>
                      <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">
                        Invoice
                      </button>
                    </div>
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

export default FeesStats;
