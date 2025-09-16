import { useQuery } from "@tanstack/react-query";
import { Edit2Icon } from "lucide-react";
import {
  getClassArmsQueryOption,
  getClassLevelsQueryOption,
} from "../../../hooks/queryOptions";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";

const ClassroomList = ({ selectedLevel, setSelectedLevel }: any) => {
  const navigate = useNavigate();

  const { data: classLevels, isPending } = useQuery(
    getClassLevelsQueryOption()
  );

  const { data: classArms, isPending: isLoading } = useQuery(
    getClassArmsQueryOption()
  );

  if (isPending || isLoading) return <Loader />;

  // ✅ Initialize selectedLevel only if there's data
  if (!selectedLevel && classArms && classArms.length > 0) {
    setSelectedLevel(classArms[0].class_level_id);
  }

  const filteredClassArms =
    classArms?.filter((arm) => arm.class_level_id === selectedLevel) ?? [];

  const handleViewMore = (classId: string) => {
    navigate(`/dashboard/class/${classId}`);
  };

  return (
    <div className="card space-y-4">
      {/* LEVELS */}
      <div className="flex items-center gap-3">
        {classLevels?.length > 0 ? (
          classLevels.map((level) => (
            <div
              key={level.id}
              className={`text-gray-200 p-2 cursor-pointer rounded-lg transition-colors duration-500 ${
                selectedLevel === level.id
                  ? "bg-brand-500 font-semibold text-white"
                  : "bg-gray-400"
              }`}
              onClick={() => setSelectedLevel(level.id)}
            >
              {level.name}
            </div>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No levels available</span>
        )}
      </div>

      {/* CLASS ARMS */}
      {filteredClassArms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredClassArms.map((classData) => (
            <div
              key={classData.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex items-center justify-between">
                <h1>{classData.name}</h1>
                <span>
                  <Edit2Icon className="size-4" />
                </span>
              </div>

              {/* Recent activity */}
              <div className="mt-4 pt-4 border-t">
                <div className="text-xs text-gray-500 mb-2">
                  Recent Activity:
                </div>
                <div className="text-xs text-gray-600">
                  • Last attendance: Today
                  <br />
                  • Recent grade entry: Mathematics
                  <br />• Fee payment: 85% collected
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-blue-50 text-red-600 px-3 py-2 rounded text-sm hover:bg-blue-100">
                  Delete
                </button>
                <button
                  onClick={() => handleViewMore(classData.id)}
                  className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded text-sm hover:bg-green-100"
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10 border rounded-lg">
          No classes available for this level
        </div>
      )}
    </div>
  );
};

export default ClassroomList;
