//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Bell,
  Menu,
  X,
  GraduationCap,
  ClipboardList,
  DollarSign,
  UserCheck,
  ChevronRight,
  Plus,
  Edit,
  Save,
  ArrowUp,
  FileText,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Award,
  BarChart3,
  CreditCard,
  Receipt,
  Calculator,
  BookMarked,
  Settings2,
} from "lucide-react";

const SchoolManagementSystem = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [selectedClass, setSelectedClass] = useState("all");
  const [selectedTerm, setSelectedTerm] = useState("2");
  //   const [selectedSession, setSelectedSession] = useState("2024/2025");

  // Mock Data
  const [students] = useState([
    {
      id: "STU001",
      name: "Adebayo Olumide",
      class: "JSS 1A",
      age: 12,
      gender: "Male",
      address: "15 Allen Avenue, Ikeja, Lagos",
      phone: "08012345678",
      email: "olumide.adebayo@email.com",
      parentName: "Mr. Adebayo Tunde",
      parentPhone: "08098765432",
      admissionDate: "2024-09-15",
      fees: { total: 150000, paid: 100000, balance: 50000 },
      grades: {
        Mathematics: { CA: 20, exam: 65, total: 85, grade: "A" },
        English: { CA: 18, exam: 62, total: 80, grade: "B+" },
        Science: { CA: 19, exam: 71, total: 90, grade: "A+" },
      },
    },
    {
      id: "STU002",
      name: "Chioma Nwosu",
      class: "JSS 1A",
      age: 11,
      gender: "Female",
      address: "23 Victoria Island, Lagos",
      phone: "08023456789",
      email: "chioma.nwosu@email.com",
      parentName: "Mrs. Nwosu Ada",
      parentPhone: "08087654321",
      admissionDate: "2024-09-15",
      fees: { total: 150000, paid: 150000, balance: 0 },
      grades: {
        Mathematics: { CA: 22, exam: 68, total: 90, grade: "A+" },
        English: { CA: 20, exam: 65, total: 85, grade: "A" },
        Science: { CA: 18, exam: 67, total: 85, grade: "A" },
      },
    },
    {
      id: "STU003",
      name: "Emeka Okafor",
      class: "SSS 2B",
      age: 16,
      gender: "Male",
      address: "45 Surulere, Lagos",
      phone: "08034567890",
      email: "emeka.okafor@email.com",
      parentName: "Dr. Okafor Chidi",
      parentPhone: "08076543210",
      admissionDate: "2022-09-15",
      fees: { total: 200000, paid: 120000, balance: 80000 },
      grades: {
        Mathematics: { CA: 25, exam: 70, total: 95, grade: "A+" },
        Physics: { CA: 23, exam: 67, total: 90, grade: "A+" },
        Chemistry: { CA: 22, exam: 68, total: 90, grade: "A+" },
        Biology: { CA: 20, exam: 65, total: 85, grade: "A" },
      },
    },
  ]);

  const [teachers] = useState([
    {
      id: "TCH001",
      name: "Mr. Okafor Samuel",
      subjects: ["Mathematics", "Further Mathematics"],
      classes: ["JSS 1A", "JSS 1B", "JSS 2A", "SSS 1A"],
      phone: "08011111111",
      email: "samuel.okafor@school.com",
      address: "12 Teacher Quarters, School Premises",
      qualification: "B.Sc Mathematics, NCE",
      experience: "8 years",
      salary: 80000,
      status: "Active",
    },
    {
      id: "TCH002",
      name: "Mrs. Adebisi Folake",
      subjects: ["English Language", "Literature"],
      classes: ["JSS 1A", "JSS 1C", "JSS 2B", "JSS 3A"],
      phone: "08022222222",
      email: "folake.adebisi@school.com",
      address: "8 Victoria Street, Ikeja",
      qualification: "B.A English, M.Ed",
      experience: "12 years",
      salary: 95000,
      status: "Active",
    },
    {
      id: "TCH003",
      name: "Dr. Emeka Nwankwo",
      subjects: ["Physics", "Chemistry"],
      classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],
      phone: "08033333333",
      email: "emeka.nwankwo@school.com",
      address: "25 Science Close, Yaba",
      qualification: "Ph.D Physics",
      experience: "15 years",
      salary: 120000,
      status: "Active",
    },
  ]);

  const classStructure = [
    {
      level: "JSS 1",
      sections: ["JSS 1A", "JSS 1B", "JSS 1C"],
      students: 195,
      teachers: 12,
    },
    {
      level: "JSS 2",
      sections: ["JSS 2A", "JSS 2B", "JSS 2C"],
      students: 189,
      teachers: 11,
    },
    {
      level: "JSS 3",
      sections: ["JSS 3A", "JSS 3B", "JSS 3C"],
      students: 203,
      teachers: 13,
    },
    {
      level: "SSS 1",
      sections: ["SSS 1A", "SSS 1B", "SSS 1C"],
      students: 178,
      teachers: 14,
    },
    {
      level: "SSS 2",
      sections: ["SSS 2A", "SSS 2B", "SSS 2C"],
      students: 192,
      teachers: 15,
    },
    {
      level: "SSS 3",
      sections: ["SSS 3A", "SSS 3B", "SSS 3C"],
      students: 190,
      teachers: 16,
    },
  ];

  const subjects = {
    JSS: [
      "Mathematics",
      "English Language",
      "Basic Science",
      "Basic Technology",
      "Social Studies",
      "CRS/IRS",
      "French",
      "Hausa",
      "Igbo",
      "Yoruba",
      "Physical Education",
      "Fine Arts",
      "Music",
    ],
    SSS: [
      "Mathematics",
      "English Language",
      "Physics",
      "Chemistry",
      "Biology",
      "Geography",
      "Economics",
      "Government",
      "Literature",
      "History",
      "Fine Arts",
      "Music",
      "Physical Education",
    ],
  };

  const menuItems = [
    { name: "Dashboard", icon: TrendingUp, key: "dashboard" },
    { name: "Students", icon: Users, key: "students" },
    { name: "Teachers", icon: GraduationCap, key: "teachers" },
    { name: "Classes", icon: BookOpen, key: "classes" },
    { name: "Attendance", icon: UserCheck, key: "attendance" },
    { name: "Grades", icon: ClipboardList, key: "grades" },
    { name: "Promotion", icon: ArrowUp, key: "promotion" },
    { name: "Fees", icon: DollarSign, key: "fees" },
    { name: "Timetable", icon: Calendar, key: "timetable" },
    { name: "Reports", icon: FileText, key: "reports" },
    { name: "Settings", icon: Settings2, key: "settings" },
  ];

  // Settings Component
  const Settings = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">System Settings</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">School Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  defaultValue="Government Secondary School, Ikeja"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  defaultValue="123 Education Avenue, Ikeja, Lagos State, Nigeria"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+234-803-123-4567"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="info@gsschool.edu.ng"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">Academic Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Session
                </label>
                <input
                  type="text"
                  defaultValue="2024/2025"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Term
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
                  <option>First Term</option>
                  <option defaultSelected>Second Term</option>
                  <option>Third Term</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grading System
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
                  <option>A-F Grading (90-100=A, 80-89=B, etc.)</option>
                  <option>1st Class, 2nd Class, etc.</option>
                  <option>Excellent, Very Good, Good, etc.</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pass Mark
                </label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">Fee Structure</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  JSS Fee (per term)
                </label>
                <input
                  type="number"
                  defaultValue="150000"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SSS Fee (per term)
                </label>
                <input
                  type="number"
                  defaultValue="200000"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Late Payment Penalty (%)
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">System Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Send SMS Notifications
                </span>
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  defaultChecked
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Email Reports
                </span>
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  defaultChecked
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Auto-backup Data
                </span>
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  defaultChecked
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Parent Portal Access
                </span>
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Save All Settings
          </button>
        </div>
      </div>
    );
  };

  // Dashboard Component
  const Dashboard = () => {
    const stats = [
      {
        title: "Total Students",
        value: "1,247",
        change: "+5.2%",
        icon: Users,
        color: "bg-blue-500",
        details: "JSS: 687 • SSS: 560",
      },
      {
        title: "Teachers",
        value: "89",
        change: "+2.1%",
        icon: GraduationCap,
        color: "bg-green-500",
        details: "Active: 85 • On Leave: 4",
      },
      {
        title: "Classes/Sections",
        value: "36",
        change: "0%",
        icon: BookOpen,
        color: "bg-purple-500",
        details: "JSS: 18 • SSS: 18",
      },
      {
        title: "Attendance Rate",
        value: "94.2%",
        change: "+1.8%",
        icon: UserCheck,
        color: "bg-orange-500",
        details: "Today: 1,175 present",
      },
    ];

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-gray-500"}`}
                  >
                    {stat.change} from last month
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.details}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Class Structure Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classStructure.map((classLevel, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {classLevel.level}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Sections: {classLevel.sections.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Students: {classLevel.students} | Teachers:{" "}
                    {classLevel.teachers}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Students Management Component
  //   const StudentsManagement = () => {
  //     const [selectedStudent, setSelectedStudent] = useState(null);
  //     const [showAddStudent, setShowAddStudent] = useState(false);

  //     const filteredStudents = students.filter(
  //       (student) =>
  //         student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //         (selectedClass === "all" || student.class === selectedClass)
  //     );

  //     if (selectedStudent) {
  //       return (
  //         <div className="space-y-6">
  //           <div className="flex items-center justify-between">
  //             <button
  //               onClick={() => setSelectedStudent(null)}
  //               className="flex items-center text-green-600 hover:text-green-700"
  //             >
  //               ← Back to Students List
  //             </button>
  //             <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
  //               Edit Student
  //             </button>
  //           </div>

  //           <div className="bg-white rounded-lg shadow">
  //             <div className="p-6 border-b">
  //               <h2 className="text-xl font-semibold">
  //                 Student Profile: {selectedStudent.name}
  //               </h2>
  //             </div>
  //             <div className="p-6">
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                 <div>
  //                   <h3 className="font-semibold mb-4">Personal Information</h3>
  //                   <div className="space-y-3">
  //                     <div>
  //                       <span className="font-medium">Student ID:</span>{" "}
  //                       {selectedStudent.id}
  //                     </div>
  //                     <div>
  //                       <span className="font-medium">Name:</span>{" "}
  //                       {selectedStudent.name}
  //                     </div>
  //                     <div>
  //                       <span className="font-medium">Class:</span>{" "}
  //                       {selectedStudent.class}
  //                     </div>
  //                     <div>
  //                       <span className="font-medium">Age:</span>{" "}
  //                       {selectedStudent.age}
  //                     </div>
  //                     <div>
  //                       <span className="font-medium">Gender:</span>{" "}
  //                       {selectedStudent.gender}
  //                     </div>
  //                     <div>
  //                       <span className="font-medium">Admission Date:</span>{" "}
  //                       {selectedStudent.admissionDate}
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <div>
  //                   <h3 className="font-semibold mb-4">Contact Information</h3>
  //                   <div className="space-y-3">
  //                     <div>
  //                       <span className="font-medium">Address:</span>{" "}
  //                       {selectedStudent.address}
  //                     </div>
  //                     <div>
  //                       <span className="font-medium">Phone:</span>{" "}
  //                       {selectedStudent.phone}
  //                     </div>
  //                     <div>
  //                       <span className="font-medium">Email:</span>{" "}
  //                       {selectedStudent.email}
  //                     </div>
  //                     <div>
  //                       <span className="font-medium">Parent/Guardian:</span>{" "}
  //                       {selectedStudent.parentName}
  //                     </div>
  //                     <div>
  //                       <span className="font-medium">Parent Phone:</span>{" "}
  //                       {selectedStudent.parentPhone}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className="mt-8">
  //                 <h3 className="font-semibold mb-4">Current Grades</h3>
  //                 <div className="overflow-x-auto">
  //                   <table className="w-full text-sm">
  //                     <thead>
  //                       <tr className="bg-gray-50">
  //                         <th className="text-left p-3">Subject</th>
  //                         <th className="text-left p-3">CA (30)</th>
  //                         <th className="text-left p-3">Exam (70)</th>
  //                         <th className="text-left p-3">Total (100)</th>
  //                         <th className="text-left p-3">Grade</th>
  //                       </tr>
  //                     </thead>
  //                     <tbody>
  //                       {Object.entries(selectedStudent.grades).map(
  //                         ([subject, grade]) => (
  //                           <tr key={subject} className="border-b">
  //                             <td className="p-3 font-medium">{subject}</td>
  //                             <td className="p-3">{grade.CA}</td>
  //                             <td className="p-3">{grade.exam}</td>
  //                             <td className="p-3 font-bold">{grade.total}</td>
  //                             <td className="p-3">
  //                               <span
  //                                 className={`px-2 py-1 rounded text-xs font-medium ${
  //                                   grade.grade.startsWith("A")
  //                                     ? "bg-green-100 text-green-800"
  //                                     : grade.grade.startsWith("B")
  //                                       ? "bg-blue-100 text-blue-800"
  //                                       : grade.grade.startsWith("C")
  //                                         ? "bg-yellow-100 text-yellow-800"
  //                                         : "bg-red-100 text-red-800"
  //                                 }`}
  //                               >
  //                                 {grade.grade}
  //                               </span>
  //                             </td>
  //                           </tr>
  //                         )
  //                       )}
  //                     </tbody>
  //                   </table>
  //                 </div>
  //               </div>

  //               <div className="mt-8">
  //                 <h3 className="font-semibold mb-4">Fee Status</h3>
  //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //                   <div className="bg-blue-50 p-4 rounded-lg">
  //                     <p className="text-sm text-gray-600">Total Fees</p>
  //                     <p className="text-xl font-bold text-blue-600">
  //                       ₦{selectedStudent.fees.total.toLocaleString()}
  //                     </p>
  //                   </div>
  //                   <div className="bg-green-50 p-4 rounded-lg">
  //                     <p className="text-sm text-gray-600">Amount Paid</p>
  //                     <p className="text-xl font-bold text-green-600">
  //                       ₦{selectedStudent.fees.paid.toLocaleString()}
  //                     </p>
  //                   </div>
  //                   <div
  //                     className={`p-4 rounded-lg ${selectedStudent.fees.balance > 0 ? "bg-red-50" : "bg-green-50"}`}
  //                   >
  //                     <p className="text-sm text-gray-600">Balance</p>
  //                     <p
  //                       className={`text-xl font-bold ${selectedStudent.fees.balance > 0 ? "text-red-600" : "text-green-600"}`}
  //                     >
  //                       ₦{selectedStudent.fees.balance.toLocaleString()}
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     }

  //     return (
  //       <div className="space-y-6">
  //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  //           <h2 className="text-2xl font-bold">Students Management</h2>
  //           <button
  //             onClick={() => setShowAddStudent(true)}
  //             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
  //           >
  //             <UserPlus className="h-4 w-4 mr-2" />
  //             Add New Student
  //           </button>
  //         </div>

  //         <div className="bg-white rounded-lg shadow p-6">
  //           <div className="flex flex-col md:flex-row gap-4 mb-6">
  //             <div className="flex-1">
  //               <input
  //                 type="text"
  //                 placeholder="Search students by name..."
  //                 value={searchTerm}
  //                 onChange={(e) => setSearchTerm(e.target.value)}
  //                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
  //               />
  //             </div>
  //             <select
  //               value={selectedClass}
  //               onChange={(e) => setSelectedClass(e.target.value)}
  //               className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
  //             >
  //               <option value="all">All Classes</option>
  //               {classStructure
  //                 .flatMap((level) => level.sections)
  //                 .map((section) => (
  //                   <option key={section} value={section}>
  //                     {section}
  //                   </option>
  //                 ))}
  //             </select>
  //           </div>

  //           <div className="overflow-x-auto">
  //             <table className="w-full text-sm">
  //               <thead>
  //                 <tr className="bg-gray-50">
  //                   <th className="text-left p-3">Student ID</th>
  //                   <th className="text-left p-3">Name</th>
  //                   <th className="text-left p-3">Class</th>
  //                   <th className="text-left p-3">Age</th>
  //                   <th className="text-left p-3">Fee Status</th>
  //                   <th className="text-left p-3">Actions</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {filteredStudents.map((student) => (
  //                   <tr key={student.id} className="border-b hover:bg-gray-50">
  //                     <td className="p-3 font-mono">{student.id}</td>
  //                     <td className="p-3 font-medium">{student.name}</td>
  //                     <td className="p-3">{student.class}</td>
  //                     <td className="p-3">{student.age}</td>
  //                     <td className="p-3">
  //                       <span
  //                         className={`px-2 py-1 rounded text-xs font-medium ${
  //                           student.fees.balance === 0
  //                             ? "bg-green-100 text-green-800"
  //                             : "bg-red-100 text-red-800"
  //                         }`}
  //                       >
  //                         {student.fees.balance === 0
  //                           ? "Paid"
  //                           : `₦${student.fees.balance.toLocaleString()} Due`}
  //                       </span>
  //                     </td>
  //                     <td className="p-3">
  //                       <button
  //                         onClick={() => setSelectedStudent(student)}
  //                         className="text-green-600 hover:text-green-700 mr-2"
  //                       >
  //                         <Eye className="h-4 w-4" />
  //                       </button>
  //                       <button className="text-blue-600 hover:text-blue-700 mr-2">
  //                         <Edit className="h-4 w-4" />
  //                       </button>
  //                       <button className="text-red-600 hover:text-red-700">
  //                         <Trash2 className="h-4 w-4" />
  //                       </button>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   };

  // Teachers Management Component
  const TeachersManagement = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Teachers Management</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New Teacher
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{teacher.name}</h3>
                  <p className="text-sm text-gray-600">{teacher.id}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    teacher.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {teacher.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Subjects:</p>
                  <p className="text-sm text-gray-600">
                    {teacher.subjects.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Classes Assigned:
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {teacher.classes.map((cls, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Experience:
                  </p>
                  <p className="text-sm text-gray-600">{teacher.experience}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Qualification:
                  </p>
                  <p className="text-sm text-gray-600">
                    {teacher.qualification}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Salary:</p>
                  <p className="text-sm text-gray-600">
                    ₦{teacher.salary.toLocaleString()}/month
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded text-sm hover:bg-green-100">
                  View Details
                </button>
                <button className="bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm hover:bg-blue-100">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Grades Management Component
  const GradesManagement = () => {
    const [selectedGradeClass, setSelectedGradeClass] = useState("JSS 1A");
    const [selectedSubject, setSelectedSubject] = useState("Mathematics");

    const classStudents = students.filter(
      (student) => student.class === selectedGradeClass
    );
    const isJSS = selectedGradeClass.startsWith("JSS");
    const availableSubjects = subjects[isJSS ? "JSS" : "SSS"];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Grades Management</h2>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Import Grades
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              value={selectedGradeClass}
              onChange={(e) => setSelectedGradeClass(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {classStructure
                .flatMap((level) => level.sections)
                .map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
            </select>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {availableSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="1">First Term</option>
              <option value="2">Second Term</option>
              <option value="3">Third Term</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3">Student ID</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">CA (30)</th>
                  <th className="text-left p-3">Exam (70)</th>
                  <th className="text-left p-3">Total (100)</th>
                  <th className="text-left p-3">Grade</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classStudents.map((student) => {
                  const grade = student.grades[selectedSubject] || {
                    CA: 0,
                    exam: 0,
                    total: 0,
                    grade: "F",
                  };
                  return (
                    <tr key={student.id} className="border-b">
                      <td className="p-3 font-mono">{student.id}</td>
                      <td className="p-3 font-medium">{student.name}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          max="30"
                          min="0"
                          defaultValue={grade.CA}
                          className="w-16 px-2 py-1 border rounded text-center focus:ring-1 focus:ring-green-500"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          max="70"
                          min="0"
                          defaultValue={grade.exam}
                          className="w-16 px-2 py-1 border rounded text-center focus:ring-1 focus:ring-green-500"
                        />
                      </td>
                      <td className="p-3 font-bold">{grade.total}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            grade.grade.startsWith("A")
                              ? "bg-green-100 text-green-800"
                              : grade.grade.startsWith("B")
                                ? "bg-blue-100 text-blue-800"
                                : grade.grade.startsWith("C")
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {grade.grade}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700">
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing grades for {selectedSubject} - {selectedGradeClass} - Term{" "}
              {selectedTerm}
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Save All Grades
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Promotion Management Component
  const PromotionManagement = () => {
    const [promotionClass, setPromotionClass] = useState("JSS 3A");
    const [promotionCriteria, setPromotionCriteria] = useState({
      passMark: 50,
      minSubjects: 5,
      compulsorySubjects: ["Mathematics", "English Language"],
    });

    const getPromotionStatus = (student: any) => {
      const grades = Object.values(student.grades);
      const passedSubjects = grades.filter(
        (grade: any) => grade.total >= promotionCriteria.passMark
      ).length;
      const compulsoryPassed = promotionCriteria.compulsorySubjects.every(
        (subject) =>
          student.grades[subject] &&
          student.grades[subject].total >= promotionCriteria.passMark
      );

      if (compulsoryPassed && passedSubjects >= promotionCriteria.minSubjects) {
        return "Promoted";
      } else if (passedSubjects >= 3) {
        return "Trial";
      } else {
        return "Repeat";
      }
    };

    const getNextClass = (currentClass: any) => {
      const classMap = {
        "JSS 1A": "JSS 2A",
        "JSS 1B": "JSS 2B",
        "JSS 1C": "JSS 2C",
        "JSS 2A": "JSS 3A",
        "JSS 2B": "JSS 3B",
        "JSS 2C": "JSS 3C",
        "JSS 3A": "SSS 1A",
        "JSS 3B": "SSS 1B",
        "JSS 3C": "SSS 1C",
        "SSS 1A": "SSS 2A",
        "SSS 1B": "SSS 2B",
        "SSS 1C": "SSS 2C",
        "SSS 2A": "SSS 3A",
        "SSS 2B": "SSS 3B",
        "SSS 2C": "SSS 3C",
        "SSS 3A": "Graduated",
        "SSS 3B": "Graduated",
        "SSS 3C": "Graduated",
      };
      return classMap[currentClass] || "Unknown";
    };

    const classStudents = students.filter(
      (student) => student.class === promotionClass
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Student Promotion</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <ArrowUp className="h-4 w-4 mr-2" />
            Process Promotion
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">Promotion Criteria</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pass Mark
                </label>
                <input
                  type="number"
                  value={promotionCriteria.passMark}
                  onChange={(e) =>
                    setPromotionCriteria({
                      ...promotionCriteria,
                      passMark: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Subjects to Pass
                </label>
                <input
                  type="number"
                  value={promotionCriteria.minSubjects}
                  onChange={(e) =>
                    setPromotionCriteria({
                      ...promotionCriteria,
                      minSubjects: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Class
                </label>
                <select
                  value={promotionClass}
                  onChange={(e) => setPromotionClass(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {classStructure
                    .flatMap((level) => level.sections)
                    .map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">
              Promotion Summary for {promotionClass}
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">
                  {
                    classStudents.filter(
                      (s) => getPromotionStatus(s) === "Promoted"
                    ).length
                  }
                </p>
                <p className="text-sm text-gray-600">Promoted</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {
                    classStudents.filter(
                      (s) => getPromotionStatus(s) === "Trial"
                    ).length
                  }
                </p>
                <p className="text-sm text-gray-600">On Trial</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">
                  {
                    classStudents.filter(
                      (s) => getPromotionStatus(s) === "Repeat"
                    ).length
                  }
                </p>
                <p className="text-sm text-gray-600">Repeat</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3">Student</th>
                    <th className="text-left p-3">Current Class</th>
                    <th className="text-left p-3">Subjects Passed</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Next Class</th>
                  </tr>
                </thead>
                <tbody>
                  {classStudents.map((student) => {
                    const status = getPromotionStatus(student);
                    const passedSubjects = Object.values(student.grades).filter(
                      (grade) => grade.total >= promotionCriteria.passMark
                    ).length;

                    return (
                      <tr key={student.id} className="border-b">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-gray-500">
                              {student.id}
                            </p>
                          </div>
                        </td>
                        <td className="p-3">{student.class}</td>
                        <td className="p-3">
                          {passedSubjects}/{Object.keys(student.grades).length}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              status === "Promoted"
                                ? "bg-green-100 text-green-800"
                                : status === "Trial"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="p-3">
                          {status === "Promoted"
                            ? getNextClass(student.class)
                            : status === "Trial"
                              ? getNextClass(student.class) + " (Trial)"
                              : student.class + " (Repeat)"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fees Management Component
  const FeesManagement = () => {
    const [feeClass, setFeeClass] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const filteredFeeStudents = students.filter((student) => {
      const classMatch = feeClass === "all" || student.class === feeClass;
      const paymentMatch =
        paymentFilter === "all" ||
        (paymentFilter === "paid" && student.fees.balance === 0) ||
        (paymentFilter === "pending" && student.fees.balance > 0);
      return classMatch && paymentMatch;
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Fee Management</h2>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Receipt className="h-4 w-4 mr-2" />
              Generate Invoice
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-centers">
              <CreditCard className="h-4 w-4 mr-2" />
              Record Payment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fees</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦
                  {students
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
                  {students
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
                  {students
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
                    (students.reduce((acc, s) => acc + s.fees.paid, 0) /
                      students.reduce((acc, s) => acc + s.fees.total, 0)) *
                      100
                  )}
                  %
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              value={feeClass}
              onChange={(e) => setFeeClass(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Classes</option>
              {classStructure
                .flatMap((level) => level.sections)
                .map((section) => (
                  <option key={section} value={section}>
                    {section}
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
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.id}</p>
                      </div>
                    </td>
                    <td className="p-3">{student.class}</td>
                    <td className="p-3">
                      ₦{student.fees.total.toLocaleString()}
                    </td>
                    <td className="p-3">
                      ₦{student.fees.paid.toLocaleString()}
                    </td>
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

  // Attendance Management Component
  const AttendanceManagement = () => {
    const [attendanceClass, setAttendanceClass] = useState("JSS 1A");
    const [attendanceDate, setAttendanceDate] = useState(
      new Date().toISOString().split("T")[0]
    );

    const classStudents = students.filter(
      (student) => student.class === attendanceClass
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Attendance Management</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Save Attendance
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              value={attendanceClass}
              onChange={(e) => setAttendanceClass(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {classStructure
                .flatMap((level) => level.sections)
                .map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
            </select>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">
                {classStudents.length}
              </p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600">Present</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-red-600">0</p>
              <p className="text-sm text-gray-600">Absent</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-yellow-600">0</p>
              <p className="text-sm text-gray-600">Late</p>
            </div>
          </div>

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
                {classStudents.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-3 font-mono">{student.id}</td>
                    <td className="p-3 font-medium">{student.name}</td>
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
      </div>
    );
  };

  // Timetable Component
  const TimetableManagement = () => {
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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Timetable Management</h2>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              {classStructure
                .flatMap((level) => level.sections)
                .map((section) => (
                  <option key={section} value={section}>
                    {section}
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
                            <div className="text-xs text-orange-600">
                              20 mins
                            </div>
                          </div>
                        ) : periodIndex === 5 && dayIndex === 0 ? (
                          <div className="bg-blue-100 p-2 rounded text-center">
                            <div className="font-medium text-blue-800">
                              LUNCH
                            </div>
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
                                  {teacher.name}
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

  // Reports Component
  const Reports = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Academic Report</h3>
              <BookMarked className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Class performance, grade distribution, and subject analysis
            </p>
            <button className="w-full bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
              Generate Report
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Attendance Report</h3>
              <UserCheck className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Daily, weekly, and monthly attendance statistics
            </p>
            <button className="w-full bg-green-50 text-green-600 px-4 py-2 rounded hover:bg-green-100">
              Generate Report
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Financial Report</h3>
              <DollarSign className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Fee collection, outstanding balances, and revenue analysis
            </p>
            <button className="w-full bg-purple-50 text-purple-600 px-4 py-2 rounded hover:bg-purple-100">
              Generate Report
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Student Report Cards</h3>
              <Award className="h-6 w-6 text-orange-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Individual student performance and progress reports
            </p>
            <button className="w-full bg-orange-50 text-orange-600 px-4 py-2 rounded hover:bg-orange-100">
              Generate Report
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Teacher Report</h3>
              <GraduationCap className="h-6 w-6 text-indigo-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Teacher performance, workload, and class assignments
            </p>
            <button className="w-full bg-indigo-50 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100">
              Generate Report
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Promotion Analysis</h3>
              <TrendingUp className="h-6 w-6 text-pink-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Student promotion statistics and academic progression
            </p>
            <button className="w-full bg-pink-50 text-pink-600 px-4 py-2 rounded hover:bg-pink-100">
              Generate Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">Quick Report Generator</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Select Report Type</option>
              <option>Academic Performance</option>
              <option>Attendance Summary</option>
              <option>Fee Collection</option>
              <option>Class Analysis</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Select Class</option>
              {classStructure
                .flatMap((level) => level.sections)
                .map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
            </select>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Select Term</option>
              <option>First Term</option>
              <option>Second Term</option>
              <option>Third Term</option>
            </select>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Generate Custom Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  // // Settings Component
  // const Settings = () => {
  //   return (
  //     <div className="space-y-6">
  //       <h2 className="text-2xl font-bold">System Settings</h2>

  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  //         <div className="bg-white rounded-lg shadow p-6">
  //           <h3 className="font-semibold mb-4">School Information</h3>
  //           <div className="space-y-4">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 School Name
  //               </label>
  //               <input
  //                 type="text"
  //                 defaultValue="Government Secondary School, Ikeja"
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Address
  //               </label>
  //               <textarea
  //                 defaultValue="123 Education Avenue, Ikeja, Lagos State, Nigeria"
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
  //                 rows="3"
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Contact Phone
  //               </label>
  //               <input
  //                 type="tel"
  //                 defaultValue="+234-803-123-4567"
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Email
  //               </label>
  //               <input
  //                 type="email"
  //                 defaultValue="info@gsschool.edu.ng"
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
  //               />
  //             </div>
  //           </div>
  //         </div>

  //         <div className="bg-white rounded-lg shadow p-6">
  //           <h3 className="font-semibold mb-4">Academic Settings</h3>
  //           <div className="space-y-4">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Current Session
  //               </label>
  //               <input
  //                 type="text"
  //                 defaultValue="2024/2025"
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Current Term
  //               </label>
  //               <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
  //                 <option>First Term</option>
  //                 <option selected>Second Term</option>
  //                 <option>Third Term</option>
  //               </select>
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Grading System
  //               </label>
  //               <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
  //                 <option>A-F Grading (90-100=A, 80-89=B, etc.)</option>
  //                 <option>1st Class, 2nd Class, etc.</option>
  //                 <option>Excellent, Very Good, Good, etc.</option>
  //               </select>
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Pass Mark
  //               </label>
  //               <input
  //                 type="number"
  //                 defaultValue="50"
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
  //               />
  //             </div>
  //           </div>
  //         </div>

  //         <div className="bg-white rounded-lg shadow p-6">
  //           <h3 className="font-semibold mb-4">Fee Structure</h3>
  //           <div className="space-y-4">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 JSS Fee (per term)
  //               </label>
  //               <input
  //                 type="number"
  //                 defaultValue="150000"
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 SSS Fee (per term)
  //               </label>
  //               <input
  //                 type="number"
  //                 defaultValue="200000"
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Late Payment Penalty (%)
  //               </label>
  //               <input
  //                 type="number"
  //                 defaultValue="5"
  //                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
  //               />
  //             </div>
  //           </div>
  //         </div>

  //         <div className="bg-white rounded-lg shadow p-6">
  //           <h3 className="font-semibold mb-4">System Preferences</h3>
  //           <div className="space-y-4">
  //             <div className="flex items-center justify-between">
  //               <span className="text-sm font-medium text-gray-700">
  //                 Send SMS Notifications
  //               </span>
  //               <input
  //                 type="checkbox"
  //                 className="rounded border-gray-300 text-green-600 focus:ring-green-500"
  //                 defaultChecked
  //               />
  //             </div>
  //             <div className="flex items-center justify-between">
  //               <span className="text-sm font-medium text-gray-700">
  //                 Email Reports
  //               </span>
  //               <input
  //                 type="checkbox"
  //                 className="rounded border-gray-300 text-green-600 focus:ring-green-500"
  //                 defaultChecked
  //               />
  //             </div>
  //             <div className="flex items-center justify-between">
  //               <span className="text-sm font-medium text-gray-700">
  //                 Auto-backup Data
  //               </span>
  //               <input
  //                 type="checkbox"
  //                 className="rounded border-gray-300 text-green-600 focus:ring-green-500"
  //                 defaultChecked
  //               />
  //             </div>
  //             <div className="flex items-center justify-between">
  //               <span className="text-sm font-medium text-gray-700">
  //                 Parent Portal Access
  //               </span>
  //               <input
  //                 type="checkbox"
  //                 className="rounded border-gray-300 text-green-600 focus:ring-green-500"
  //                 defaultChecked
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="flex justify-end">
  //         <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
  //           Save All Settings
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  // Classes Management Component
  //   const ClassesManagement = () => {
  //     const [selectedClassLevel, setSelectedClassLevel] = useState("JSS 1");

  //     const getClassSections = (level) => {
  //       const classData = classStructure.find((c) => c.level === level);
  //       return classData ? classData.sections : [];
  //     };

  //     return (
  //       <div className="space-y-6">
  //         <div className="flex items-center justify-between">
  //           <h2 className="text-2xl font-bold">Class Management</h2>
  //           <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
  //             <Plus className="h-4 w-4 mr-2" />
  //             Add New Section
  //           </button>
  //         </div>

  //         <div className="bg-white rounded-lg shadow p-6">
  //           <div className="flex flex-wrap gap-2 mb-6">
  //             {classStructure.map((level) => (
  //               <button
  //                 key={level.level}
  //                 onClick={() => setSelectedClassLevel(level.level)}
  //                 className={`px-4 py-2 rounded-lg font-medium ${
  //                   selectedClassLevel === level.level
  //                     ? "bg-green-600 text-white"
  //                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  //                 }`}
  //               >
  //                 {level.level}
  //               </button>
  //             ))}
  //           </div>

  //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //             {getClassSections(selectedClassLevel).map((section) => {
  //               const sectionStudents = students.filter(
  //                 (s) => s.class === section
  //               );
  //               const sectionTeachers = teachers.filter((t) =>
  //                 t.classes.includes(section)
  //               );

  //               return (
  //                 <div
  //                   key={section}
  //                   className="border rounded-lg p-4 hover:shadow-md transition-shadow"
  //                 >
  //                   <div className="flex items-center justify-between mb-3">
  //                     <h3 className="font-semibold text-lg">{section}</h3>
  //                     <button className="text-green-600 hover:text-green-700">
  //                       <Edit className="h-4 w-4" />
  //                     </button>
  //                   </div>

  //                   <div className="space-y-2 text-sm">
  //                     <div className="flex justify-between">
  //                       <span className="text-gray-600">Students:</span>
  //                       <span className="font-medium">
  //                         {sectionStudents.length}
  //                       </span>
  //                     </div>
  //                     <div className="flex justify-between">
  //                       <span className="text-gray-600">Teachers:</span>
  //                       <span className="font-medium">
  //                         {sectionTeachers.length}
  //                       </span>
  //                     </div>
  //                     <div className="flex justify-between">
  //                       <span className="text-gray-600">Class Teacher:</span>
  //                       <span className="font-medium">
  //                         {sectionTeachers.length > 0
  //                           ? sectionTeachers[0].name
  //                           : "Not Assigned"}
  //                       </span>
  //                     </div>
  //                   </div>

  //                   <div className="mt-4 pt-4 border-t">
  //                     <div className="text-xs text-gray-500 mb-2">
  //                       Recent Activity:
  //                     </div>
  //                     <div className="text-xs text-gray-600">
  //                       • Last attendance: Today
  //                       <br />
  //                       • Recent grade entry: Mathematics
  //                       <br />• Fee payment: 85% collected
  //                     </div>
  //                   </div>

  //                   <div className="mt-4 flex gap-2">
  //                     <button
  //                       onClick={() => setActiveSection("students")}
  //                       className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm hover:bg-blue-100"
  //                     >
  //                       View Students
  //                     </button>
  //                     <button
  //                       onClick={() => setActiveSection("timetable")}
  //                       className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded text-sm hover:bg-green-100"
  //                     >
  //                       Timetable
  //                     </button>
  //                   </div>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         </div>

  //         <div className="bg-white rounded-lg shadow p-6">
  //           <h3 className="font-semibold mb-4">
  //             Subject Distribution for {selectedClassLevel}
  //           </h3>
  //           <div className="overflow-x-auto">
  //             <table className="w-full text-sm">
  //               <thead>
  //                 <tr className="bg-gray-50">
  //                   <th className="text-left p-3">Subject</th>
  //                   <th className="text-left p-3">Assigned Teacher</th>
  //                   <th className="text-left p-3">Sections</th>
  //                   <th className="text-left p-3">Weekly Periods</th>
  //                   <th className="text-left p-3">Actions</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {(selectedClassLevel.startsWith("JSS")
  //                   ? subjects.JSS
  //                   : subjects.SSS
  //                 )
  //                   .slice(0, 5)
  //                   .map((subject) => {
  //                     const teacher = teachers.find((t) =>
  //                       t.subjects.includes(subject)
  //                     );
  //                     return (
  //                       <tr key={subject} className="border-b">
  //                         <td className="p-3 font-medium">{subject}</td>
  //                         <td className="p-3">
  //                           {teacher ? teacher.name : "Not Assigned"}
  //                         </td>
  //                         <td className="p-3">
  //                           {getClassSections(selectedClassLevel).join(", ")}
  //                         </td>
  //                         <td className="p-3">5 periods</td>
  //                         <td className="p-3">
  //                           <button className="text-blue-600 hover:text-blue-700 mr-2">
  //                             <Edit className="h-4 w-4" />
  //                           </button>
  //                           <button className="text-green-600 hover:text-green-700">
  //                             <Eye className="h-4 w-4" />
  //                           </button>
  //                         </td>
  //                       </tr>
  //                     );
  //                   })}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   };

  // Render active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      //   case "students":
      //     return <StudentsManagement />;
      case "teachers":
        return <TeachersManagement />;
      //   case "classes":
      //     return <ClassesManagement />;
      case "attendance":
        return <AttendanceManagement />;
      case "grades":
        return <GradesManagement />;
      case "promotion":
        return <PromotionManagement />;
      case "fees":
        return <FeesManagement />;
      case "timetable":
        return <TimetableManagement />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-green-600">
          <h1 className="text-xl font-bold text-white">SchoolHub NG</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center px-6 py-3 text-left text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors ${
                activeSection === item.key
                  ? "bg-green-50 text-green-600 border-r-2 border-green-600"
                  : ""
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
              <ChevronRight className="h-4 w-4 ml-auto" />
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="lg:ml-0 ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Good Morning, Principal Adebisi
                </h2>
                <p className="text-sm text-gray-600">
                  {/* {selectedSession} Academic Session • Term {selectedTerm} •{" "} */}
                  {activeSection.charAt(0).toUpperCase() +
                    activeSection.slice(1)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">{renderActiveSection()}</main>
      </div>
    </div>
  );
};

export default SchoolManagementSystem;
