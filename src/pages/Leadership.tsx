import { useState } from "react";
import {
  Crown,
  Star,
  Trophy,
  Shield,
  BookOpen,
  Users,
  Mic,
  Heart,
  Award,
  Plus,
  Search,
  Filter,
  Edit3,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Button from "../components/ui/Button";

const SchoolLeadershipPage = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [showAppointModal, setShowAppointModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  type Student = {
    id: number;
    name: string;
    class: string;
    gender: string;
    leadership: string;
  };
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // School leadership positions with Nigerian context
  const currentLeadership = [
    {
      position: "Head Boy",
      student: "Chinedu Okwu",
      class: "SS 3A",
      appointedDate: "September 2024",
      icon: Crown,
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      responsibilities: [
        "Lead school assemblies",
        "Represent students in meetings",
        "Coordinate with administration",
        "Mentor junior students",
      ],
      achievements: [
        "Organized successful inter-house sports",
        "Led anti-bullying campaign",
        "Improved student-teacher relations",
      ],
    },
    {
      position: "Head Girl",
      student: "Fatima Aliyu",
      class: "SS 3B",
      appointedDate: "September 2024",
      icon: Crown,
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-800",
      responsibilities: [
        "Lead girls' welfare programs",
        "Coordinate female student activities",
        "Represent girls in meetings",
        "Health and hygiene advocacy",
      ],
      achievements: [
        "Started girls' mentorship program",
        "Organized health awareness week",
        "Led period poverty campaign",
      ],
    },
    {
      position: "Senior Prefect",
      student: "Adebayo Ogundimu",
      class: "SS 2A",
      appointedDate: "October 2024",
      icon: Shield,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      responsibilities: [
        "Maintain school discipline",
        "Supervise junior prefects",
        "Report to teachers",
        "Hall monitoring",
      ],
      achievements: [
        "Reduced late-coming by 40%",
        "Implemented peer mediation",
        "Improved dining hall order",
      ],
    },
    {
      position: "Library Prefect",
      student: "Blessing Adeyemi",
      class: "SS 2B",
      appointedDate: "September 2024",
      icon: BookOpen,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-800",
      responsibilities: [
        "Manage library operations",
        "Organize reading programs",
        "Maintain book inventory",
        "Assist librarian",
      ],
      achievements: [
        "Increased library usage by 60%",
        "Started book club",
        "Digitized library records",
      ],
    },
    {
      position: "Sports Prefect",
      student: "Kelechi Okafor",
      class: "SS 1A",
      appointedDate: "October 2024",
      icon: Trophy,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      responsibilities: [
        "Organize sports activities",
        "Manage sports equipment",
        "Lead inter-house competitions",
        "Fitness programs",
      ],
      achievements: [
        "Won inter-school football trophy",
        "Organized successful sports week",
        "Improved sports participation",
      ],
    },
    {
      position: "Social Prefect",
      student: "Amaka Nwankwo",
      class: "SS 2A",
      appointedDate: "September 2024",
      icon: Heart,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      responsibilities: [
        "Plan social events",
        "Organize cultural activities",
        "Student welfare",
        "Entertainment programs",
      ],
      achievements: [
        "Organized cultural week",
        "Started talent show",
        "Improved school social atmosphere",
      ],
    },
    {
      position: "Chapel/Assembly Prefect",
      student: "Emmanuel Osei",
      class: "SS 1B",
      appointedDate: "September 2024",
      icon: Mic,
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-800",
      responsibilities: [
        "Coordinate morning devotions",
        "Manage assemblies",
        "Lead prayers",
        "Organize religious activities",
      ],
      achievements: [
        "Improved assembly attendance",
        "Started student choir",
        "Enhanced devotional programs",
      ],
    },
    {
      position: "Health Prefect",
      student: "Hauwa Ibrahim",
      class: "JSS 3A",
      appointedDate: "October 2024",
      icon: Heart,
      color: "from-teal-400 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-800",
      responsibilities: [
        "Health education",
        "First aid coordination",
        "Sanitation monitoring",
        "Wellness programs",
      ],
      achievements: [
        "Reduced illness reports",
        "Started health education program",
        "Improved sanitation standards",
      ],
    },
  ];

  // Available students for appointment
  const availableStudents = [
    {
      id: 1,
      name: "Olumide Adebayo",
      class: "SS 3A",
      gender: "Male",
      leadership: "Former Class Captain",
    },
    {
      id: 2,
      name: "Chioma Okonkwo",
      class: "SS 3B",
      gender: "Female",
      leadership: "Current Vice Captain",
    },
    {
      id: 3,
      name: "Ibrahim Musa",
      class: "SS 2A",
      gender: "Male",
      leadership: "Sports Captain",
    },
    {
      id: 4,
      name: "Grace Effiong",
      class: "SS 2B",
      gender: "Female",
      leadership: "Library Monitor",
    },
    {
      id: 5,
      name: "Tunde Balogun",
      class: "SS 1A",
      gender: "Male",
      leadership: "Class Representative",
    },
    {
      id: 6,
      name: "Zainab Yusuf",
      class: "JSS 3A",
      gender: "Female",
      leadership: "Dining Hall Monitor",
    },
    {
      id: 7,
      name: "Daniel Okoro",
      class: "JSS 3B",
      gender: "Male",
      leadership: "Assembly Monitor",
    },
    {
      id: 8,
      name: "Funmi Adesanya",
      class: "JSS 2A",
      gender: "Female",
      leadership: "Class Secretary",
    },
  ];

  const appointmentHistory = [
    {
      date: "September 15, 2024",
      action: "Appointed",
      student: "Chinedu Okwu",
      position: "Head Boy",
      by: "Principal",
    },
    {
      date: "September 15, 2024",
      action: "Appointed",
      student: "Fatima Aliyu",
      position: "Head Girl",
      by: "Principal",
    },
    {
      date: "October 1, 2024",
      action: "Appointed",
      student: "Adebayo Ogundimu",
      position: "Senior Prefect",
      by: "Vice Principal",
    },
    {
      date: "October 5, 2024",
      action: "Resigned",
      student: "Previous Sports Prefect",
      position: "Sports Prefect",
      by: "Student Request",
    },
    {
      date: "October 8, 2024",
      action: "Appointed",
      student: "Kelechi Okafor",
      position: "Sports Prefect",
      by: "Sports Master",
    },
  ];

  const tabs = [
    { id: "current", label: "Current Leadership", icon: Users },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "history", label: "History", icon: Award },
  ];

  const positionTypes = [
    "Head Boy",
    "Head Girl",
    "Senior Prefect",
    "Library Prefect",
    "Sports Prefect",
    "Social Prefect",
    "Chapel/Assembly Prefect",
    "Health Prefect",
    "Dining Hall Prefect",
    "Sanitation Prefect",
  ];

  const appointStudent = () => {
    if (selectedStudent && selectedPosition) {
      setShowAppointModal(false);
      setSelectedStudent(null);
      setSelectedPosition("");
    }
  };

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                School Leadership & Prefects
              </h1>
              <p className="text-gray-600 mb-4">
                Manage student leadership positions and prefect system
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {currentLeadership.length}
                  </div>
                  <div className="text-sm text-gray-600">Current Prefects</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-gray-600">Head Students</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {availableStudents.length}
                  </div>
                  <div className="text-sm text-gray-600">Eligible Students</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">6</div>
                  <div className="text-sm text-gray-600">Departments</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => console.log("Generate report")}
              >
                <Award className="h-4 w-4" />
                Generate Report
              </Button>
              <Button
                className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600"
                onClick={() => setShowAppointModal(true)}
              >
                <Plus className="h-4 w-4" />
                New Appointment
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
        {activeTab === "current" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentLeadership.map((leader, index) => {
              const IconComponent = leader.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Card Header */}
                  <div
                    className={`bg-gradient-to-r ${leader.color} p-4 text-white`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {leader.position}
                          </h3>
                          <p className="text-white/80 text-sm">
                            Since {leader.appointedDate}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() => console.log(`Edit ${leader.position}`)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-brand-600">
                          {leader.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {leader.student}
                        </h4>
                        <p className="text-gray-600">{leader.class}</p>
                        <span
                          className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${leader.bgColor} ${leader.textColor}`}
                        >
                          {leader.position}
                        </span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Key Responsibilities:
                      </h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {leader.responsibilities
                          .slice(0, 3)
                          .map((resp, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Recent Achievements */}
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Recent Achievements:
                      </h5>
                      <div className="space-y-1">
                        {leader.achievements
                          .slice(0, 2)
                          .map((achievement, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-gray-600 bg-gray-50 p-2 rounded flex items-center gap-2"
                            >
                              <Star className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                              {achievement}
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Performance
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Available Students for Leadership
                </h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
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
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student: any) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-brand-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-brand-600">
                              {student.name
                                .split(" ")
                                .map((n: string) => n[0])
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {student.leadership}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button
                            size="sm"
                            className="bg-brand-500 hover:bg-brand-600"
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowAppointModal(true);
                            }}
                          >
                            Appoint
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Leadership Appointment History
            </h3>
            <div className="space-y-4">
              {appointmentHistory.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {entry.action === "Appointed" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {entry.action === "Appointed"
                        ? "Appointed"
                        : "Position Vacated"}
                      : {entry.student} as {entry.position}
                    </p>
                    <p className="text-xs text-gray-600">
                      {entry.date} • By {entry.by}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Appointment Modal */}
      {showAppointModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Appoint New Prefect
                </h3>
                <button
                  onClick={() => {
                    setShowAppointModal(false);
                    setSelectedStudent(null);
                    setSelectedPosition("");
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {selectedStudent && (
                <div className="p-4 bg-brand-50 rounded-lg border border-brand-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-brand-600">
                        {selectedStudent.name
                          .split(" ")
                          .map((n: any) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {selectedStudent.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedStudent.class} • {selectedStudent.gender}
                      </div>
                      <div className="text-xs text-brand-600">
                        {selectedStudent.leadership}
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
                  {positionTypes.map((position, index) => (
                    <option key={index} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              {!selectedStudent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Student
                  </label>
                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                    {availableStudents.map((student) => (
                      <div
                        key={student.id}
                        onClick={() => setSelectedStudent(student as Student)}
                        className={`p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                          (selectedStudent as Student | null)?.id === student.id
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
                              {student.class} • {student.leadership}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAppointModal(false);
                    setSelectedStudent(null);
                    setSelectedPosition("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={appointStudent}
                  className="flex-1 bg-brand-500 hover:bg-brand-600"
                  disabled={!selectedStudent || !selectedPosition}
                >
                  Confirm Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolLeadershipPage;
