import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  GraduationCap,
  Award,
  Clock,
  FileText,
  Download,
  Printer,
  CheckCircle,
  AlertTriangle,
  Star,
  BookOpen,
  Target,
} from "lucide-react";

const StudentDetails = () => {
  //   const { id } = useParams();
  const location = useLocation();
  const studentDta = location;
  console.log(studentDta);

  const [activeTab, setActiveTab] = useState("overview");

  // Sample student data
  const student = {
    id: "STU001",
    name: "Adebayo Olumide",
    class: "JSS 1A",
    age: 12,
    gender: "Male",
    dateOfBirth: "2012-03-15",
    bloodGroup: "O+",
    address: "15 Allen Avenue, Ikeja, Lagos",
    phone: "08012345678",
    email: "olumide.adebayo@email.com",
    admissionDate: "2024-09-15",
    studentType: "Day Student",
    religion: "Christianity",
    stateOfOrigin: "Lagos",
    profileImage: "/api/placeholder/150/150",
    parent: {
      name: "Mr. Adebayo Tunde",
      relationship: "Father",
      phone: "08098765432",
      email: "tunde.adebayo@email.com",
      occupation: "Engineer",
      address: "15 Allen Avenue, Ikeja, Lagos",
    },
    fees: {
      total: 150000,
      paid: 100000,
      balance: 50000,
      lastPayment: "2024-01-15",
      paymentHistory: [
        {
          date: "2024-01-15",
          amount: 50000,
          term: "Second Term",
          method: "Bank Transfer",
        },
        {
          date: "2023-09-15",
          amount: 50000,
          term: "First Term",
          method: "Cash",
        },
      ],
    },
    grades: {
      Mathematics: { CA: 20, exam: 65, total: 85, grade: "A", position: 3 },
      "English Language": {
        CA: 18,
        exam: 62,
        total: 80,
        grade: "B+",
        position: 5,
      },
      "Basic Science": {
        CA: 19,
        exam: 71,
        total: 90,
        grade: "A+",
        position: 1,
      },
      "Social Studies": {
        CA: 16,
        exam: 59,
        total: 75,
        grade: "B",
        position: 8,
      },
      Hausa: { CA: 22, exam: 68, total: 90, grade: "A+", position: 2 },
      French: { CA: 15, exam: 55, total: 70, grade: "B-", position: 12 },
    },
    attendance: {
      total: 45,
      present: 42,
      absent: 2,
      late: 1,
      percentage: 93.3,
      recentRecord: [
        { date: "2024-02-15", status: "Present", timeIn: "7:45 AM" },
        { date: "2024-02-14", status: "Present", timeIn: "7:50 AM" },
        { date: "2024-02-13", status: "Late", timeIn: "8:15 AM" },
        { date: "2024-02-12", status: "Absent", timeIn: null },
        { date: "2024-02-11", status: "Present", timeIn: "7:40 AM" },
      ],
    },
    behavior: {
      conduct: "Excellent",
      punctuality: "Good",
      neatness: "Excellent",
      remarks:
        "Very attentive in class and shows great interest in Mathematics and Sciences.",
    },
    achievements: [
      { title: "Best in Mathematics", term: "First Term", year: "2024" },
      { title: "Perfect Attendance", term: "First Term", year: "2024" },
      { title: "Science Quiz Winner", term: "First Term", year: "2024" },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "fees", label: "Fees", icon: FileText },
    { id: "behavior", label: "Behavior", icon: Star },
  ];

  const getGradeColor = (grade: any) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-50";
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-50";
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const calculateOverallGrade = () => {
    const subjects = Object.values(student.grades);
    const average =
      subjects.reduce((sum, subject) => sum + subject.total, 0) /
      subjects.length;
    return average.toFixed(1);
  };

  const calculatePosition = () => {
    // Mock class position calculation
    const average = calculateOverallGrade();
    return average >= 85 ? "3rd" : average >= 80 ? "5th" : "8th";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Students
          </button>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Student Header Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-600">
            AO
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                ID: {student.id}
              </span>
              <span className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-1" />
                {student.class}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Age {student.age}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {student.stateOfOrigin} State
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                student.attendance.percentage >= 95
                  ? "bg-green-100 text-green-800"
                  : student.attendance.percentage >= 85
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {student.attendance.percentage}% Attendance
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                student.fees.balance === 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {student.fees.balance === 0
                ? "Fees Paid"
                : `₦${student.fees.balance.toLocaleString()} Due`}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Average</p>
              <p className="text-2xl font-bold text-green-600">
                {calculateOverallGrade()}%
              </p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Class Position</p>
              <p className="text-2xl font-bold text-blue-600">
                {calculatePosition()}
              </p>
            </div>
            <Award className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Subjects Passed</p>
              <p className="text-2xl font-bold text-purple-600">
                {
                  Object.values(student.grades).filter((g) => g.total >= 50)
                    .length
                }
                /{Object.keys(student.grades).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-orange-600">
                {student.achievements.length}
              </p>
            </div>
            <Star className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-medium">{student.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date of Birth:</span>
                      <span className="font-medium">{student.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium">{student.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Blood Group:</span>
                      <span className="font-medium">{student.bloodGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Religion:</span>
                      <span className="font-medium">{student.religion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student Type:</span>
                      <span className="font-medium">{student.studentType}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-gray-500" />
                      <span>{student.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-gray-500" />
                      <span>{student.email}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-3 text-gray-500 mt-1" />
                      <span>{student.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Parent/Guardian Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">
                          {student.parent.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Relationship:</span>
                        <span className="font-medium">
                          {student.parent.relationship}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Occupation:</span>
                        <span className="font-medium">
                          {student.parent.occupation}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-gray-500" />
                        <span>{student.parent.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3 text-gray-500" />
                        <span>{student.parent.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Recent Achievements
                  </h3>
                  <div className="space-y-3">
                    {student.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-yellow-50 rounded-lg"
                      >
                        <Award className="h-5 w-5 text-yellow-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {achievement.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {achievement.term} {achievement.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "academic" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Academic Performance</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report Card
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4">Subject</th>
                      <th className="text-center p-4">CA (30)</th>
                      <th className="text-center p-4">Exam (70)</th>
                      <th className="text-center p-4">Total (100)</th>
                      <th className="text-center p-4">Grade</th>
                      <th className="text-center p-4">Position</th>
                      <th className="text-center p-4">Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(student.grades).map(([subject, grade]) => (
                      <tr key={subject} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{subject}</td>
                        <td className="p-4 text-center">{grade.CA}</td>
                        <td className="p-4 text-center">{grade.exam}</td>
                        <td className="p-4 text-center font-bold">
                          {grade.total}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade.grade)}`}
                          >
                            {grade.grade}
                          </span>
                        </td>
                        <td className="p-4 text-center">{grade.position}</td>
                        <td className="p-4 text-center text-xs">
                          {grade.total >= 80
                            ? "Excellent"
                            : grade.total >= 70
                              ? "Very Good"
                              : grade.total >= 50
                                ? "Good"
                                : "Needs Improvement"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr className="font-semibold">
                      <td className="p-4">Overall Average</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">
                        {calculateOverallGrade()}%
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          A
                        </span>
                      </td>
                      <td className="p-4 text-center">{calculatePosition()}</td>
                      <td className="p-4 text-center text-xs">
                        Excellent Performance
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900">Total Days</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {student.attendance.total}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900">Present</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {student.attendance.present}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-medium text-red-900">Absent</h4>
                  <p className="text-2xl font-bold text-red-600">
                    {student.attendance.absent}
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900">Late</h4>
                  <p className="text-2xl font-bold text-yellow-600">
                    {student.attendance.late}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Recent Attendance Record
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3">Date</th>
                        <th className="text-center p-3">Status</th>
                        <th className="text-center p-3">Time In</th>
                        <th className="text-center p-3">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.attendance.recentRecord.map((record, index) => (
                        <tr key={index} className="border-b">
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
                          <td className="p-3 text-center">
                            {record.timeIn || "-"}
                          </td>
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
          )}

          {activeTab === "fees" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900">Total Fees</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    ₦{student.fees.total.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900">Amount Paid</h4>
                  <p className="text-2xl font-bold text-green-600">
                    ₦{student.fees.paid.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`rounded-lg p-4 ${student.fees.balance > 0 ? "bg-red-50" : "bg-green-50"}`}
                >
                  <h4
                    className={`font-medium ${student.fees.balance > 0 ? "text-red-900" : "text-green-900"}`}
                  >
                    Balance
                  </h4>
                  <p
                    className={`text-2xl font-bold ${student.fees.balance > 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    ₦{student.fees.balance.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Term</th>
                        <th className="text-right p-3">Amount</th>
                        <th className="text-center p-3">Method</th>
                        <th className="text-center p-3">Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.fees.paymentHistory.map((payment, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3">{payment.date}</td>
                          <td className="p-3">{payment.term}</td>
                          <td className="p-3 text-right font-medium">
                            ₦{payment.amount.toLocaleString()}
                          </td>
                          <td className="p-3 text-center">{payment.method}</td>
                          <td className="p-3 text-center">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Download className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {student.fees.balance > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-red-900">
                        Outstanding Balance
                      </h4>
                      <p className="text-sm text-red-700">
                        Please clear the outstanding balance of ₦
                        {student.fees.balance.toLocaleString()} to avoid any
                        inconvenience.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "behavior" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900">Conduct</h4>
                  <p className="text-xl font-bold text-green-600">
                    {student.behavior.conduct}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900">Punctuality</h4>
                  <p className="text-xl font-bold text-blue-600">
                    {student.behavior.punctuality}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900">Neatness</h4>
                  <p className="text-xl font-bold text-purple-600">
                    {student.behavior.neatness}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Teacher's Remarks
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {student.behavior.remarks}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Disciplinary Record
                  </h3>
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                    <p>No disciplinary issues recorded</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Extracurricular Activities
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                      <span>Mathematics Club</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Target className="h-5 w-5 text-green-600 mr-3" />
                      <span>Science Quiz Team</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
