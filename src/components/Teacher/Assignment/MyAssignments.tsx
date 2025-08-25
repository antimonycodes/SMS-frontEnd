//@ts-nocheck
import { assignmentList } from "../../../data";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  BookOpen,
  Users,
  Eye,
  Trash2,
  FileText,
  Clock,
} from "lucide-react";
import Button from "../../ui/Button";
import { useState } from "react";

const MyAssignments = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [status, setStatus] = useState("");

  const tabs = [
    {
      id: "All",
      label: "All",
      icon: BookOpen,
      color: "text-orange-600",
    },
    {
      id: "Due",
      label: "Due",
      icon: Clock,
      color: "text-blue-600",
    },
    { id: "Active", label: "Active", icon: FileText, color: "text-green-600" },
  ];

  const filteredAssignments = assignmentList.filter(
    (filtered) => filtered.status === activeTab
  );

  const handleSubmissionClick = (ass) => {
    navigate(`/dashboard/assignment/${ass.id}/submissions`, {
      state: { ass },
    });
  };

  const handlePreview = (ass) => {
    // Add preview functionality here
    console.log("Preview assignment:", ass);
  };

  const handleDelete = (ass) => {
    // Add delete confirmation and functionality here
    if (window.confirm(`Are you sure you want to delete "${ass.title}"?`)) {
      console.log("Delete assignment:", ass);
    }
  };

  const getSubmissionCount = (ass) => {
    return ass.submissionList ? ass.submissionList.length : 0;
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0)
      return { text: "Overdue", color: "text-red-600", bgColor: "bg-red-100" };
    if (diffDays === 0)
      return {
        text: "Due Today",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
      };
    if (diffDays <= 3)
      return {
        text: `${diffDays} days left`,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };

    return {
      text: `${diffDays} days left`,
      color: "text-green-600",
      bgColor: "bg-green-100",
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
      {/* Header */}
      {/* <div className="mb-8">
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span>Total: {assignmentList.length} assignments</span>
          <span>•</span>
          <span>
            {
              assignmentList.filter(
                (ass) => getDaysUntilDue(ass.dueDate).text === "Overdue"
              ).length
            }{" "}
            overdue
          </span>
        </div>
      </div> */}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-gray-50/50 p-6">
        <div className="flex flex-wrap gap-2 md:gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const tabCount = assignmentList.filter(
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

      {/* Assignment Grid */}
      {assignmentList.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No assignments yet
          </h3>
          <p className="text-gray-500">
            Create your first assignment to get started.
          </p>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssignments.map((ass) => {
            const dueStatus = getDaysUntilDue(ass.dueDate);
            const submissionCount = getSubmissionCount(ass);

            return (
              <div
                key={ass.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {ass.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${dueStatus.bgColor} ${dueStatus.color}`}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {dueStatus.text}
                      </span>
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

                  {/* Submission Stats */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {submissionCount}
                      </div>
                      <div className="text-xs text-gray-500">Submissions</div>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {submissionCount}
                      </div>
                      <div className="text-xs text-gray-500">
                        Pending Review
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6">
                  <div className="flex gap-2 mb-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(ass)}
                      className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 border-gray-200 hover:border-gray-300"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                    <Button
                      variant="delete"
                      size="sm"
                      onClick={() => handleDelete(ass)}
                      className="flex items-center justify-center p-2 text-red-600 hover:text-red-800 border-red-200 hover:border-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => handleSubmissionClick(ass)}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-2.5 flex items-center justify-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    View Submissions ({submissionCount})
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAssignments;
