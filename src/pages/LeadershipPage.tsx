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

const LeadershipPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "leadership", label: "Leadership", icon: Star },
    { id: "activities", label: "Activities", icon: Calendar },
  ];
  return (
    <div>
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
    </div>
  );
};

export default LeadershipPage;
