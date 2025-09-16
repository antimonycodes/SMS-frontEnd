import {
  Edit3,
  Settings,
  Users,
  UserCheck,
  UserX,
  Calendar,
} from "lucide-react";
import StatsCard from "../../../shared/StatsCard";

const OverviewStats = ({ statsData }: any) => {
  console.log(statsData, "erg");
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData?.stats?.map((stat: any, index: number) => (
        <StatsCard
          index={index}
          title={stat.title}
          icon={getStatIcon(stat.title)}
          percentage={stat.percentage}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default OverviewStats;
