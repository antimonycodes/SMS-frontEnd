import { Calendar, Edit3, Loader2, Plus } from "lucide-react";
import { getActiveSchoolSessionsQueryOption } from "../../../hooks/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const SessionsSettings = ({
  setShowEditSessionModal,
  setShowSessionModal,
  setEditMode,
}: any) => {
  const { data: activeSession, isPending } = useQuery(
    getActiveSchoolSessionsQueryOption()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Calendar className="h-6 w-6 text-blue-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">Current Session</h3>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600 font-medium">Active Session</p>
            <p className="text-2xl font-bold text-blue-900">
              {isPending ? (
                <Loader2 className=" animate-spin" />
              ) : (
                activeSession?.session_name
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => {
            setShowSessionModal(true);
            setEditMode(true);
          }}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2 transition-colors"
        >
          <Edit3 size={16} />
          <span>Edit</span>
        </button>
        <button
          onClick={() => {
            setShowSessionModal(true);
            setEditMode(false);
          }}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus size={16} />
          <span>New Session</span>
        </button>
      </div>
    </div>
  );
};

export default SessionsSettings;
