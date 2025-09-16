import React from "react";

const StatsCard = ({ index, title, percentage, value, icon }: any) => {
  return (
    <div>
      <div
        key={index}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-50 rounded-xl">{icon}</div>
          {percentage && (
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {percentage}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-sm font-medium text-gray-600">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
