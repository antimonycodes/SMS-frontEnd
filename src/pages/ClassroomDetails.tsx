import { useState } from "react";
import {
  Users,
  Star,
  Calendar,
  BookOpen,
  Trophy,
  AlertCircle,
  Edit3,
  UserCheck,
  GraduationCap,
  Clock,
  ChevronLeft,
  Settings,
} from "lucide-react";
import Button from "../components/ui/Button";

const ClassroomDetailPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  type Student = {
    id: number;
    name: string;
    admissionNo: string;
    gender: string;
    age: number;
    performance: string;
    attendance: string;
    position?: string;
  };

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showLeadershipModal, setShowLeadershipModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");

  // Sample data - replace with actual data from props or API
  const classData = {
    name: "JSS 2A",
    level: "Junior Secondary",
    students: 45,
    teachers: 8,
    classTeacher: "Mrs. Adunni Oladele",
    classCaptain: "Chioma Okwu",
    viceCaptain: "Abdullahi Musa",
    subjects: [
      "Mathematics",
      "English",
      "Biology",
      "Chemistry",
      "Physics",
      "Civic Education",
      "Computer Science",
      "Fine Arts",
    ],
    academicSession: "2024/2025",
    term: "First Term",
  };

  const students = [
    {
      id: 1,
      name: "Adebayo Olumide",
      admissionNo: "JSS/24/001",
      gender: "Male",
      age: 13,
      performance: "Excellent",
      attendance: "95%",
      position: "Captain",
    },
    {
      id: 2,
      name: "Chioma Okwu",
      admissionNo: "JSS/24/002",
      gender: "Female",
      age: 12,
      performance: "Very Good",
      attendance: "98%",
      position: "Captain",
    },
    {
      id: 3,
      name: "Abdullahi Musa",
      admissionNo: "JSS/24/003",
      gender: "Male",
      age: 13,
      performance: "Good",
      attendance: "92%",
      position: "Vice Captain",
    },
    {
      id: 4,
      name: "Funmilayo Akinola",
      admissionNo: "JSS/24/004",
      gender: "Female",
      age: 12,
      performance: "Excellent",
      attendance: "96%",
    },
    {
      id: 5,
      name: "Emmanuel Okafor",
      admissionNo: "JSS/24/005",
      gender: "Male",
      age: 13,
      performance: "Good",
      attendance: "89%",
    },
    {
      id: 6,
      name: "Hauwa Ibrahim",
      admissionNo: "JSS/24/006",
      gender: "Female",
      age: 12,
      performance: "Very Good",
      attendance: "94%",
    },
    // Add more students as needed
  ];

  const recentActivities = [
    {
      type: "attendance",
      message: "Morning attendance recorded - 43/45 students present",
      time: "Today, 8:30 AM",
    },
    {
      type: "assignment",
      message: "Mathematics assignment submitted by 38 students",
      time: "Yesterday, 2:15 PM",
    },
    {
      type: "announcement",
      message: "Parent-Teacher meeting scheduled for next Friday",
      time: "2 days ago",
    },
    {
      type: "exam",
      message: "First term examination timetable released",
      time: "3 days ago",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "leadership", label: "Leadership", icon: Star },
    { id: "activities", label: "Activities", icon: Calendar },
  ];

  const assignLeadership = (studentName: string, position: string) => {
    // Here you would update the class data
    console.log(`Assigning ${studentName} as ${position}`);
    setShowLeadershipModal(false);
  };

  const availablePositions = [
    "Class Captain",
    "Vice Captain",
    "Sports Captain",
    "Library Prefect",
    "Dining Hall Prefect",
    "Sanitation Prefect",
    "Assembly Prefect",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ChevronLeft className="h-5 w-5" />
            Back to Classes
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {classData.name}
                </h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {classData.level}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Academic Session: {classData.academicSession} - {classData.term}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {classData.students}
                  </div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {classData.teachers}
                  </div>
                  <div className="text-sm text-gray-600">Teachers</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {classData.subjects.length}
                  </div>
                  <div className="text-sm text-gray-600">Subjects</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">94%</div>
                  <div className="text-sm text-gray-600">Attendance</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600">
                <Edit3 className="h-4 w-4" />
                Edit Class
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300
                  ${
                    activeTab === tab.id
                      ? "bg-brand-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }
                `}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Class Leadership */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Class Leadership
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Class Captain
                    </div>
                    <div className="text-sm text-gray-600">
                      {classData.classCaptain}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Vice Captain
                    </div>
                    <div className="text-sm text-gray-600">
                      {classData.viceCaptain}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Class Teacher
                    </div>
                    <div className="text-sm text-gray-600">
                      {classData.classTeacher}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Subjects ({classData.subjects.length})
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {classData.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm text-center"
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Recent Activities
              </h3>

              <div className="space-y-3">
                {recentActivities.slice(0, 4).map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900 leading-relaxed">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Student List
                </h3>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
                    Add Student
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admission No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-brand-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-brand-600">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.admissionNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Good Standing
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.attendance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.position && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            {student.position}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "leadership" && (
          <div className="space-y-6">
            {/* Current Leadership */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Current Class Leadership
                </h3>
                <Button
                  onClick={() => setShowLeadershipModal(true)}
                  className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2"
                >
                  <Star className="h-4 w-4" />
                  Assign Position
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Class Captain
                      </h4>
                      <p className="text-sm text-gray-600">
                        {classData.classCaptain}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Responsibilities:
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Lead class activities</li>
                    <li>• Represent class in meetings</li>
                    <li>• Maintain class discipline</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Vice Captain
                      </h4>
                      <p className="text-sm text-gray-600">
                        {classData.viceCaptain}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Responsibilities:
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Assist class captain</li>
                    <li>• Monitor attendance</li>
                    <li>• Coordinate with teachers</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Sports Captain
                      </h4>
                      <p className="text-sm text-gray-600">Kelechi Obi</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Responsibilities:
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Organize sports activities</li>
                    <li>• Lead physical exercises</li>
                    <li>• Equipment management</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Library Prefect
                      </h4>
                      <p className="text-sm text-gray-600">Fatima Aliyu</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Responsibilities:
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Manage class library</li>
                    <li>• Organize reading activities</li>
                    <li>• Book distribution</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Sanitation Prefect
                      </h4>
                      <p className="text-sm text-gray-600">David Okoro</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Responsibilities:
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Maintain class cleanliness</li>
                    <li>• Organize cleaning duties</li>
                    <li>• Environmental awareness</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Assembly Prefect
                      </h4>
                      <p className="text-sm text-gray-600">Grace Adebayo</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Responsibilities:
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Coordinate morning assembly</li>
                    <li>• Manage announcements</li>
                    <li>• Lead prayers/devotion</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Leadership History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Leadership History
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Chioma Okwu appointed as Class Captain
                    </p>
                    <p className="text-sm text-gray-500">
                      September 15, 2024 • By Mrs. Adunni Oladele
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Abdullahi Musa appointed as Vice Captain
                    </p>
                    <p className="text-sm text-gray-500">
                      September 15, 2024 • By Mrs. Adunni Oladele
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Kelechi Obi appointed as Sports Captain
                    </p>
                    <p className="text-sm text-gray-500">
                      September 20, 2024 • By Mr. Johnson Eze
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leadership Assignment Modal */}
        {showLeadershipModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Assign Leadership Position
                  </h3>
                  <button
                    onClick={() => setShowLeadershipModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Position
                  </label>
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">Choose a position...</option>
                    {availablePositions.map((position, index) => (
                      <option key={index} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Student
                  </label>
                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                    {students.map((student) => (
                      <div
                        key={student.id}
                        onClick={() => setSelectedStudent(student)}
                        className={`p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                          selectedStudent?.id === student.id
                            ? "bg-brand-50 border-brand-200"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-brand-600">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {student.admissionNo}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowLeadershipModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      selectedStudent &&
                      selectedPosition &&
                      assignLeadership(selectedStudent.name, selectedPosition)
                    }
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                    disabled={!selectedStudent || !selectedPosition}
                  >
                    Assign Position
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activities" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Class Activities & Events
            </h3>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-brand-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassroomDetailPage;
