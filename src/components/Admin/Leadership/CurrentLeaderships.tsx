import { CheckCircle, Edit3, User, Users } from "lucide-react";

const CurrentLeaderships = ({ leadershipData }: any) => {
  const currentLeaderships = leadershipData?.filter(
    (currentLeadership: any) =>
      currentLeadership.role_category === "school_role"
  );

  // Generate consistent color from role name
  const getRoleColor = (roleName: string) => {
    if (!roleName) return "bg-gray-100 text-gray-700";

    const colors = [
      "bg-blue-50 text-blue-700 border-blue-200",
      "bg-green-50 text-green-700 border-green-200",
      "bg-purple-50 text-purple-700 border-purple-200",
      "bg-orange-50 text-orange-700 border-orange-200",
      "bg-pink-50 text-pink-700 border-pink-200",
      "bg-indigo-50 text-indigo-700 border-indigo-200",
      "bg-emerald-50 text-emerald-700 border-emerald-200",
      "bg-rose-50 text-rose-700 border-rose-200",
    ];

    // Simple hash function to get consistent color for same role
    let hash = 0;
    for (let i = 0; i < roleName.length; i++) {
      hash = roleName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (!currentLeaderships || currentLeaderships.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Leadership Roles
        </h3>
        <p className="text-gray-500">
          No students are currently assigned to leadership positions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Simple Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Student Leadership
          </h2>
          <p className="text-gray-600 mt-1">
            {currentLeaderships[0]?.session_name} Academic Session
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {currentLeaderships.length} Active{" "}
          {currentLeaderships.length === 1 ? "Role" : "Roles"}
        </div>
      </div>

      {/* Clean Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentLeaderships.map((leader: any, index: number) => {
          const roleColor = getRoleColor(leader.role_name);

          return (
            <div
              key={leader.id || index}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              {/* Role Badge */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border ${roleColor}`}
                >
                  {leader.role_name}
                </span>
                <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                  <Edit3 className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              {/* Student Profile */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100">
                    {leader.passport_url ? (
                      <img
                        src={leader.passport_url}
                        alt={`${leader.first_name} ${leader.last_name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {leader.first_name} {leader.last_name}
                  </h4>
                  {leader.middle_name && (
                    <p className="text-sm text-gray-500 truncate">
                      {leader.middle_name}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    {leader.class_arm_name}
                  </p>
                </div>
              </div>

              {/* Student Details */}
              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Student ID</span>
                  <span className="text-sm font-medium text-gray-900">
                    #{leader.student_id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Term</span>
                  <span className="text-sm font-medium text-gray-900">
                    {leader.term_name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple Summary */}
      {currentLeaderships.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-semibold text-gray-900">
                {currentLeaderships.length}
              </div>
              <div className="text-sm text-gray-600">Active Leaders</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">
                {currentLeaderships[0]?.session_name}
              </div>
              <div className="text-sm text-gray-600">Session</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">
                {currentLeaderships[0]?.term_name}
              </div>
              <div className="text-sm text-gray-600">Term</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">
                {
                  new Set(currentLeaderships.map((l: any) => l.class_arm_name))
                    .size
                }
              </div>
              <div className="text-sm text-gray-600">Classes</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentLeaderships;
