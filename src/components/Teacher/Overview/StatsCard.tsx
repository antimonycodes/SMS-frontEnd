import { Users, BookOpen, GraduationCap, UserCheck } from "lucide-react";

const StatsCard = () => {
  const stats = [
    {
      title: "Total Student",
      value: "100%",
      change: "+5.2%",
      icon: Users,
      color: "bg-blue-500",
      details: "JSS: 687 • SSS: 560",
    },
    {
      title: "Total Assignments",
      value: "3",
      change: "+2.1%",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      title: "Submitted Assignments",
      value: "14",
      change: "0%",
      icon: BookOpen,
      color: "bg-purple-500",
    },
    {
      title: "Total Announcements",
      value: "12",
      change: "+1.8%",
      icon: UserCheck,
      color: "bg-orange-500",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p
                  className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-gray-500"}`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
