// import React, { useState, useEffect } from "react";
import { Users, BookOpen, GraduationCap, UserCheck } from "lucide-react";
const QuickStats = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+5.2%",
      icon: Users,
      color: "bg-blue-500",
      details: "JSS: 687 • SSS: 560",
    },
    {
      title: "Teachers",
      value: "89",
      change: "+2.1%",
      icon: GraduationCap,
      color: "bg-green-500",
      details: "Active: 85 • On Leave: 4",
    },
    {
      title: "Classes/Sections",
      value: "36",
      change: "0%",
      icon: BookOpen,
      color: "bg-purple-500",
      details: "JSS: 18 • SSS: 18",
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      change: "+1.8%",
      icon: UserCheck,
      color: "bg-orange-500",
      details: "Today: 1,175 present",
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
                <p className="text-xs text-gray-500 mt-1">{stat.details}</p>
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

export default QuickStats;
