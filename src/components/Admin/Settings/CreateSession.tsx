import { Loader2, Plus } from "lucide-react";
import Modal from "../../../shared/Modals";
import { createNewSessionQuery } from "../../../hooks/queryOptions";
import { useState } from "react";

type CreateSessionProps = {
  setShowSessionModal: (show: boolean) => void;
  showSessionModal: boolean;
  editMode: boolean;
};

const CreateSession = ({
  setShowSessionModal,
  showSessionModal,
  editMode,
}: CreateSessionProps) => {
  const [formData, setFormData] = useState({
    sessionName: "",
    startDate: "",
    endDate: "",
  });
  const { mutate: createSession, isPending } = createNewSessionQuery();

  console.log(editMode);

  const handleCreateSession = () => {
    console.log(formData);
    createSession(formData, {
      onSuccess: () => {
        setShowSessionModal(false);
        setFormData({
          sessionName: "",
          startDate: "",
          endDate: "",
        });
        console.log("Session created");
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Modal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        title={editMode ? "Edit Session Details" : "Create New Session"}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Enter details for the new academic session:
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Name
            </label>
            <input
              type="text"
              name="sessionName"
              value={formData.sessionName}
              onChange={handleInputChange}
              placeholder="e.g., 2025/2026"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              name="startDate"
              onChange={handleInputChange}
              placeholder="e.g., 2025/2026"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              placeholder="e.g., 2025/2026"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => setShowSessionModal(false)}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateSession}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              disabled={!formData || isPending}
            >
              {isPending ? (
                <Loader2 className=" animate-spin" />
              ) : (
                <span>Create Session</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateSession;
