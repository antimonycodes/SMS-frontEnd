import { BookOpen, Clock, FileText, Star } from "lucide-react";
import { useState } from "react";
import Academics from "./Academics";
import Attendance from "./Attendance";
import Fees from "./Fees";
import Behaviour from "./Behaviour";

const StudentTabs = ({ studentData }: any) => {
  const [activeTab, setActiveTab] = useState("academic");
  const { attendance, grades, fees, behavior } = studentData;
  console.log(studentData);

  const tabs = [
    // { id: "overview", label: "Overview", icon: User },
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "fees", label: "Fees", icon: FileText },
    { id: "behavior", label: "Behavior", icon: Star },
  ];

  const renderTabContent = (activeTab: any) => {
    switch (activeTab) {
      case "academic":
        return <Academics grades={grades} />;
      case "attendance":
        return <Attendance attendances={attendance} />;
      case "fees":
        return <Fees fees={fees} />;
      case "behavior":
        return <Behaviour behavior={behavior} />;
      default:
        <Academics />;
        break;
    }
  };

  return (
    <div className="card space-y-4">
      {/* tab control */}
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
      {/* tab content */}
      <div>{renderTabContent(activeTab)}</div>
    </div>
  );
};

export default StudentTabs;
