import { useState } from "react";
import PageHeader from "../../../shared/PageHeader";
import { BookOpen, Clock, FileText } from "lucide-react";
import { assignmentList } from "../../../data";
import InfoCard from "../../ui/InfoCard";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const StudentAssignmentPage = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const navigate = useNavigate();
  const studentName = "Akin Maleek";
  const tabs = [
    { id: "Pending", label: "Pending", icon: BookOpen },
    { id: "Submitted", label: "Submitted", icon: Clock },
    { id: "Graded", label: "Graded", icon: FileText },
  ];

  const studentAssignments = assignmentList.flatMap((assignment) => {
    return assignment.submissionList.filter(
      (ass) => ass.studentName === studentName
    );
  });

  console.log(studentAssignments);
  const filteredAssignments = studentAssignments.filter(
    (filtered) => filtered.status === activeTab
  );

  const handleSubmitClick = (ass): any => {
    navigate(`/dashboard/assignment/${ass.id}/submissions`, {
      state: ass,
    });
  };

  console.log(filteredAssignments);
  return (
    <div className=" space-y-6">
      <PageHeader title="Your Assignments" button={false} />
      {/* Tabs */}
      <div className=" card space-y-6">
        <div className=" flex items-center gap-6">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer flex items-center gap-1 text-gray-700 text-sm p-2 rounded-lg transition-colors duration-500 ${activeTab === tab.id ? "bg-brand-500 font-semibold text-white" : "bg-gray-400"}`}
            >
              <tab.icon className="h-4 w-4 mr-2" />

              <h1>{tab.label}</h1>
            </div>
          ))}
        </div>
        {/* list */}
        <div className=" space-y-4">
          {filteredAssignments.map((ass) => (
            <div className=" border border-brand-500 p-4 rounded-l-lg space-y-4">
              <div className="fcb">
                <h2>{ass.title}</h2>
                <div>{ass.dueDate}</div>
              </div>
              <InfoCard label="Subject" data={ass.subject} />
              <InfoCard label="By" data={ass.teacherName} />
              <p>{ass.description}</p>
              {/* CTA */}
              <div className="fcb">
                <div className=" space-y-1">
                  <Button>Preview</Button>
                  <Button>Download</Button>
                </div>
                <Button onClick={() => handleSubmitClick(ass)}>
                  Submit Your Work
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentPage;
