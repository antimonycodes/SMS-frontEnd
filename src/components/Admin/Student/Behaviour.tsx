import { BookOpen, CheckCircle, Target } from "lucide-react";

const Behaviour = ({ behavior }: any) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">Conduct</h4>
          <p className="text-xl font-bold text-green-600">{behavior.conduct}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">Punctuality</h4>
          <p className="text-xl font-bold text-blue-600">
            {behavior.punctuality}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-purple-900">Neatness</h4>
          <p className="text-xl font-bold text-purple-600">
            {behavior.neatness}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Teacher's Remarks</h3>
        <p className="text-gray-700 leading-relaxed">{behavior.remarks}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Disciplinary Record</h3>
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
            <p>No disciplinary issues recorded</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Extracurricular Activities
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
              <span>Mathematics Club</span>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <Target className="h-5 w-5 text-green-600 mr-3" />
              <span>Science Quiz Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Behaviour;
