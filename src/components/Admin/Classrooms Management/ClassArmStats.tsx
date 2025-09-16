import { useQuery } from "@tanstack/react-query";
import Button from "../../ui/Button";
import {
  Edit3,
  Settings,
  Users,
  UserCheck,
  UserX,
  Calendar,
} from "lucide-react";
import { getClassArmStatsQuery } from "../../../hooks/useClass";
import StatsCard from "../../../shared/StatsCard";

const ClassArmStats = ({ id }: any) => {
  const { data: classData, isPending } = useQuery(getClassArmStatsQuery(id));

  // Icon mapping for different stat types
  const getStatIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "total students":
        return <Users className="h-6 w-6 text-blue-600" />;
      case "male students":
        return <UserCheck className="h-6 w-6 text-blue-600" />;
      case "female students":
        return <UserX className="h-6 w-6 text-blue-600" />;
      case "average age":
        return <Calendar className="h-6 w-6 text-blue-600" />;
      default:
        return <Users className="h-6 w-6 text-blue-600" />;
    }
  };

  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg text-white p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{classData?.classArm}</h1>
            <p className="text-blue-100 text-lg">
              Academic Session: {classData?.session} - {classData?.term}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white text-red-600 hover:bg-gray-50"
            >
              <Edit3 className="h-4 w-4" />
              Edit Class
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {classData?.stats?.map((stat: any, index: number) => (
          // <div
          //   key={index}
          //   className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          // >
          //   <div className="flex items-center justify-between mb-4">
          //     <div className="p-3 bg-blue-50 rounded-xl">
          //       {getStatIcon(stat.title)}
          //     </div>
          //     {stat.percentage && (
          //       <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          //         {stat.percentage}
          //       </span>
          //     )}
          //   </div>

          //   <div className="space-y-2">
          //     <div className="text-3xl font-bold text-gray-900">
          //       {stat.value}
          //     </div>
          //     <div className="text-sm font-medium text-gray-600">
          //       {stat.title}
          //     </div>
          //   </div>
          // </div>

          <StatsCard
            index={index}
            icon={getStatIcon(stat.title)}
            title={stat.title}
            percentage={stat.percentage}
            value={stat.value}
          />
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm">
            View Students
          </Button>
          <Button variant="outline" size="sm">
            Manage Subjects
          </Button>
          <Button variant="outline" size="sm">
            Attendance Report
          </Button>
          <Button variant="outline" size="sm">
            Performance Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassArmStats;
