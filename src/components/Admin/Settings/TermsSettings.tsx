import { useQuery } from "@tanstack/react-query";
import { Calendar, Edit3, Loader2 } from "lucide-react";
import { getActiveSchoolTermQueryOption } from "../../../hooks/queryOptions";

const TermsSettings = ({
  setShowTermModal,
}: {
  setShowTermModal: (value: boolean) => void;
}) => {
  const { data: schoolTerms, isPending } = useQuery(
    getActiveSchoolTermQueryOption()
  );

  console.log(schoolTerms);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Calendar className="h-6 w-6 text-green-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">Current Term</h3>
      </div>

      <div className="bg-green-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-600 font-medium">Active Term</p>
            <p className="text-2xl font-bold text-green-900">
              {isPending ? (
                <Loader2 className=" animate-spin" />
              ) : (
                schoolTerms?.name
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

      <button
        onClick={() => setShowTermModal(true)}
        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 transition-colors"
      >
        <Edit3 size={16} />
        <span>Change Active Term</span>
      </button>
    </div>
  );
};

export default TermsSettings;
