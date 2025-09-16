import { useState } from "react";
import { Users, Award, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { allStudentLeadership, useLeadershipStats } from "../hooks/leadership";
import PageHeader from "../shared/PageHeader";
import OverviewStats from "../components/Admin/Leadership/OverviewStats";
import CurrentLeaderships from "../components/Admin/Leadership/CurrentLeaderships";
import AppointLeadershipModal from "../components/Admin/Leadership/AppointLeadershipModal";

const SchoolLeadershipPage = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [showAppointModal, setShowAppointModal] = useState(false);

  const { data: statsData, isPending } = useQuery(useLeadershipStats());
  console.log(statsData?.stats[0]);

  const { data: leadershipData } = useQuery(allStudentLeadership());
  console.log(leadershipData);

  const openModal = () => {
    setShowAppointModal(true);
  };
  const closeModal = () => {
    setShowAppointModal(false);
  };
  const tabs = [
    { id: "current", label: "Current Leadership", icon: Users },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "history", label: "History", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-8">
      {/* Header */}

      <PageHeader
        title="School Leadership & Prefects"
        sub=" Manage student leadership positions and prefect system"
        button
        buttonText="New Appointment"
        buttonClick={() => setShowAppointModal(true)}
      />
      <OverviewStats statsData={statsData} />

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
          <CurrentLeaderships leadershipData={leadershipData} />
        )}
      </div>

      {/* Appointment Modal */}
      {showAppointModal && (
        <AppointLeadershipModal openModal={openModal} closeModal={closeModal} />
      )}
    </div>
  );
};

export default SchoolLeadershipPage;
