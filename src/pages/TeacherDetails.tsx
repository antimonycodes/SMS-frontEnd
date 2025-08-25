import { useState } from "react";
import {
  User,
  BookOpen,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  Award,
  ChevronLeft,
  Edit3,
  FileText,
  TrendingUp,
  Star,
  Target,
  CheckCircle,
} from "lucide-react";
import Button from "../components/ui/Button";

const TeacherDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample teacher data - replace with actual data from props or API
  const teacherData = {
    id: "TCH/001/2024",
    name: "Mrs. Adunni Oladele",
    title: "Senior Mathematics Teacher",
    department: "Mathematics Department",
    employeeId: "EMP/MTH/001",
    email: "adunni.oladele@school.edu.ng",
    phone: "+234 803 456 7890",
    address: "15 Ikeja Street, Lagos, Nigeria",
    dateJoined: "September 2020",
    qualification: "B.Ed Mathematics, M.Ed Educational Management",
    experience: "8 years",
    profileImage: null,
    specialization: ["Pure Mathematics", "Further Mathematics", "Statistics"],
  };

  const subjectsTaught = [
    {
      subject: "Mathematics",
      classes: ["JSS 1A", "JSS 1B", "JSS 2A"],
      hours: 18,
      students: 135,
    },
    {
      subject: "Further Mathematics",
      classes: ["SS 2", "SS 3"],
      hours: 12,
      students: 48,
    },
    { subject: "Statistics", classes: ["SS 3A"], hours: 6, students: 25 },
  ];

  const classesManaged = [
    {
      className: "JSS 2A",
      role: "Class Teacher",
      students: 45,
      subjects: 8,
      performance: "Excellent",
      attendance: "94%",
    },
    {
      className: "Mathematics Club",
      role: "Club Coordinator",
      students: 32,
      subjects: 1,
      performance: "Outstanding",
      attendance: "98%",
    },
  ];

  const achievements = [
    {
      title: "Best Teacher Award",
      year: "2023",
      category: "Academic Excellence",
    },
    {
      title: "Outstanding Class Management",
      year: "2022",
      category: "Leadership",
    },
    { title: "Innovation in Teaching", year: "2021", category: "Methodology" },
  ];

  const weeklySchedule = [
    {
      day: "Monday",
      periods: [
        "JSS 1A (8:00-8:40)",
        "JSS 2A (9:00-9:40)",
        "SS 2 (11:00-11:40)",
        "Free (2:00-2:40)",
      ],
    },
    {
      day: "Tuesday",
      periods: [
        "JSS 1B (8:00-8:40)",
        "JSS 2A (10:00-10:40)",
        "SS 3 (1:00-1:40)",
        "Club (3:00-3:40)",
      ],
    },
    {
      day: "Wednesday",
      periods: [
        "JSS 1A (9:00-9:40)",
        "SS 2 (10:00-10:40)",
        "JSS 2A (12:00-12:40)",
        "Free (2:00-2:40)",
      ],
    },
    {
      day: "Thursday",
      periods: [
        "JSS 1B (8:00-8:40)",
        "SS 3A (9:00-9:40)",
        "JSS 2A (11:00-11:40)",
        "Prep (4:00-5:00)",
      ],
    },
    {
      day: "Friday",
      periods: [
        "JSS 1A (8:00-8:40)",
        "JSS 1B (10:00-10:40)",
        "SS 2 (1:00-1:40)",
        "Staff Meeting (3:00-4:00)",
      ],
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "subjects", label: "Subjects & Classes", icon: BookOpen },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "performance", label: "Performance", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ChevronLeft className="h-5 w-5" />
            Back to Teachers
          </button>
        </div>

        {/* Teacher Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {teacherData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            {/* Teacher Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {teacherData.name}
                  </h1>
                  <p className="text-lg text-brand-600 font-medium mb-1">
                    {teacherData.title}
                  </p>
                  <p className="text-gray-600 mb-3">{teacherData.department}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {teacherData.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600">
                    <FileText className="h-4 w-4" />
                    View Full Report
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{teacherData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{teacherData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {teacherData.dateJoined}</span>
                </div>
              </div>
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
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Teaching Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Students</span>
                  <span className="text-2xl font-bold text-brand-600">208</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Classes Taught</span>
                  <span className="text-2xl font-bold text-green-600">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weekly Hours</span>
                  <span className="text-2xl font-bold text-purple-600">36</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Experience</span>
                  <span className="text-2xl font-bold text-orange-600">
                    8yr
                  </span>
                </div>
              </div>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                Qualifications
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-gray-900">B.Ed Mathematics</p>
                  <p className="text-sm text-gray-600">University of Lagos</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-gray-900">
                    M.Ed Educational Management
                  </p>
                  <p className="text-sm text-gray-600">University of Ibadan</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="font-medium text-gray-900">
                    Teaching Certification
                  </p>
                  <p className="text-sm text-gray-600">
                    Teachers Registration Council
                  </p>
                </div>
              </div>
            </div>

            {/* Awards & Recognition */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Awards & Recognition
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {achievement.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {achievement.year} • {achievement.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "subjects" && (
          <div className="space-y-6">
            {/* Subjects Taught */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Subjects Taught
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Classes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Weekly Hours
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subjectsTaught.map((subject, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {subject.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {subject.classes.map((cls, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                              >
                                {cls}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {subject.hours} hrs/week
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {subject.students} students
                        </td>
                        <td className="px-6 py-4">
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

            {/* Classes Managed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Classes & Responsibilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classesManaged.map((classInfo, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {classInfo.className}
                      </h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        {classInfo.role}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          {classInfo.students}
                        </div>
                        <div className="text-xs text-gray-600">Students</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">
                          {classInfo.attendance}
                        </div>
                        <div className="text-xs text-gray-600">Attendance</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Performance:
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        {classInfo.performance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Weekly Schedule
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-900 w-24">
                      Day
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      8:00-8:40
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      9:00-9:40
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      10:00-10:40
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      11:00-11:40
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      12:00-12:40
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      1:00-1:40
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      2:00-2:40
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      3:00-4:00
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {weeklySchedule.map((day, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {day.day}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {day.periods[0]?.includes("JSS 1A") && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            JSS 1A
                          </span>
                        )}
                        {day.periods[0]?.includes("JSS 1B") && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            JSS 1B
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {day.periods[1]?.includes("JSS 2A") && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                            JSS 2A
                          </span>
                        )}
                        {day.periods[1]?.includes("JSS 1A") && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            JSS 1A
                          </span>
                        )}
                        {day.periods[1]?.includes("SS 3A") && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            SS 3A
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {day.periods[2]?.includes("SS 2") && (
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                            SS 2
                          </span>
                        )}
                        {day.periods[2]?.includes("JSS 2A") && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                            JSS 2A
                          </span>
                        )}
                        {day.periods[2]?.includes("JSS 1B") && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            JSS 1B
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {day.periods[2]?.includes("SS 2") && (
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                            SS 2
                          </span>
                        )}
                        {day.periods[2]?.includes("JSS 2A") && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                            JSS 2A
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="text-gray-400 text-xs">
                          Lunch Break
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {day.periods[2]?.includes("SS 3") && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            SS 3
                          </span>
                        )}
                        {day.periods[2]?.includes("SS 2") && (
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                            SS 2
                          </span>
                        )}
                        {day.periods[2]?.includes("JSS 1B") && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            JSS 1B
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {day.periods[3]?.includes("Free") && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            Free Period
                          </span>
                        )}
                        {day.periods[3]?.includes("Prep") && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            Prep Time
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {day.periods[3]?.includes("Club") && (
                          <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">
                            Math Club
                          </span>
                        )}
                        {day.periods[3]?.includes("Staff Meeting") && (
                          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                            Staff Meeting
                          </span>
                        )}
                        {day.periods[3]?.includes("Prep") && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            Prep Time
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Teaching Performance Metrics
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Student Satisfaction
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      4.8/5.0
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Class Performance
                    </span>
                    <span className="text-sm font-bold text-blue-600">89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "89%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Attendance Rate
                    </span>
                    <span className="text-sm font-bold text-purple-600">
                      94%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: "94%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Assignment Completion
                    </span>
                    <span className="text-sm font-bold text-orange-600">
                      92%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">100% Pass Rate</p>
                    <p className="text-sm text-gray-600">
                      JSS 2A Mathematics - First Term
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Target className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Top Class Performance
                    </p>
                    <p className="text-sm text-gray-600">
                      JSS 2A ranked #1 in grade level
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Excellence in Innovation
                    </p>
                    <p className="text-sm text-gray-600">
                      Introduced digital learning tools
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDetailsPage;
