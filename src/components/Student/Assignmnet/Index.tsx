//@ts-nocheck
import { useState } from "react";
import PageHeader from "../../../shared/PageHeader";
import {
  BookOpen,
  Clock,
  FileText,
  Calendar,
  User,
  Download,
  Eye,
  Users,
  User2Icon,
} from "lucide-react";
import { assignmentList } from "../../../data";
import InfoCard from "../../ui/InfoCard";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const StudentAssignmentPage = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const navigate = useNavigate();
  const studentName = "Akin Maleek";

  const tabs = [
    {
      id: "Pending",
      label: "Pending",
      icon: BookOpen,
      color: "text-orange-600",
    },
    {
      id: "Submitted",
      label: "Submitted",
      icon: Clock,
      color: "text-blue-600",
    },
    { id: "Graded", label: "Graded", icon: FileText, color: "text-green-600" },
  ];

  const studentAssignments = assignmentList.flatMap((assignment) => {
    return assignment.submissionList.filter(
      (ass) => ass.studentName === studentName
    );
  });

  const filteredAssignments = studentAssignments.filter(
    (filtered) => filtered.status === activeTab
  );

  const handleSubmitClick = (ass) => {
    navigate(`/dashboard/assignment/${ass.id}/submissions`, {
      state: ass,
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        border: "border-orange-200",
      },
      Submitted: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      },
      Graded: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.border} border`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-6">
      <PageHeader title="Your Assignments" button={false} />

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50/50 p-6">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const tabCount = studentAssignments.filter(
                (ass) => ass.status === tab.id
              ).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300
                    ${
                      isActive
                        ? "bg-brand-500 text-white shadow-md transform scale-105"
                        : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200"
                    }
                  `}
                >
                  <tab.icon
                    className={`h-4 w-4 ${isActive ? "text-white" : tab.color}`}
                  />
                  <span>{tab.label}</span>
                  <span
                    className={`
                    ml-1 px-2 py-0.5 rounded-full text-xs
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                  >
                    {tabCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Assignment List */}
        <div className="">
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No assignments found
              </h3>
              <p className="text-gray-500">
                You don't have any {activeTab.toLowerCase()} assignments at the
                moment.
              </p>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {filteredAssignments.map((ass, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                >
                  {/* Assignment Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-col  gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {ass.title}
                        </h2>
                        <span className={`inline-`}>
                          {/* <Clock className="h-3 w-3 mr-1" /> */}
                          {getStatusBadge(ass.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Assignment Meta */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Due:</span>
                      <span className="ml-1">{ass.dueDate}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Subject:</span>
                      <span className="ml-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs">
                        {ass.subject}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <User2Icon className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">By:</span>
                      <span className="ml-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs">
                        {ass.teacherName}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Class:</span>
                      <span className="ml-1 bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md text-xs">
                        {ass.classArm}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {ass.description && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 bg-gray-50 p-3 rounded-lg">
                        {ass.description}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className=" pt-4 border-t border-gray-100">
                    <div className="flex pb-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 flex  items-center gap-2 text-gray-600 hover:text-gray-800"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    {ass.status === "Pending" && (
                      <Button
                        onClick={() => handleSubmitClick(ass)}
                        className="w-full bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 font-medium"
                      >
                        Submit Your Work
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentPage;
