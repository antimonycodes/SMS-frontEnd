import { useState } from "react";
import TermsSettings from "./TermsSettings";
import SessionsSettings from "./SessionsSettings";

import CreateSession from "./CreateSession";
import ChangeTerm from "./ChangeTerm";
import { Calendar, GraduationCap } from "lucide-react";
import RolesSetup from "./RolesSetup";

const SettingsPage = () => {
  // Mock data - replace with real API data
  const [activeSessionData, setActiveSessionData] = useState<any>("");
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("academics");

  // Modal states
  const [showTermModal, setShowTermModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showEditSessionModal, setShowEditSessionModal] = useState(false);

  // Form states
  const [editSessionName, setEditSessionName] = useState(
    activeSessionData?.name
  );

  const tabs = [
    { id: "academics", label: "Academics", icon: Calendar },
    { id: "roles", label: "Roles", icon: GraduationCap },
  ];

  const handleEditSession = () => {
    if (editSessionName.trim()) {
      // setActiveSession((prev) => ({ ...prev, name: editSessionName }));
      setShowEditSessionModal(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Academic Settings
        </h2>
        <p className="text-gray-600">
          Manage your school's current session and active term
        </p>
      </div>
      {/*  */}
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

      {activeTab === "academics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Session Card */}
          <SessionsSettings
            activeSession={activeSessionData}
            setShowEditSessionModal={setShowEditSessionModal}
            setShowSessionModal={setShowSessionModal}
            setEditMode={setEditMode}
          />

          {/* Active Term Card */}
          <TermsSettings setShowTermModal={setShowTermModal} />
        </div>
      )}

      {activeTab === "roles" && (
        <div>
          <RolesSetup />
        </div>
      )}

      {/* Change Term Modal */}
      <ChangeTerm
        showTermModal={showTermModal}
        setShowTermModal={setShowTermModal}
      />

      {/* Create New Session Modal */}
      <CreateSession
        setShowSessionModal={setShowSessionModal}
        showSessionModal={showSessionModal}
        editMode={editMode}
      />
    </div>
  );
};

export default SettingsPage;
