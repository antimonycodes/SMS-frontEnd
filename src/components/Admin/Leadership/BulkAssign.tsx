import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Users,
  // Award,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { getStudentsQuery } from "../../../hooks/useStudent";
import { getLeadershipRolesQuery } from "../../../hooks/leadership";
import { assignStudentLeadershipRole } from "../../../api/leadership";

interface Student {
  id: number;
  admission_number: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  current_class: string;
  class_arm_id: number;
  email: string;
}

interface Role {
  id: number;
  name: string;
  description?: string;
}

interface Assignment {
  studentId: number;
  roleId: number;
  status: "pending" | "success" | "error";
  error?: string;
}

const LeadershipAssignmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "assign" | "review" | "complete"
  >("assign");

  const queryClient = useQueryClient();

  const { data, isLoading: studentsLoading } = useQuery(
    getStudentsQuery(1, 10000)
  );
  const { data: rolesData, isLoading: rolesLoading } = useQuery(
    getLeadershipRolesQuery()
  );

  const students: Student[] = data?.data?.students || [];
  const roles: Role[] = rolesData || [];

  // Get unique classes
  const classes = useMemo(() => {
    return [...new Set(students.map((s) => s.current_class))].sort();
  }, [students]);

  // Filter students based on search and class
  const filteredStudents = useMemo(() => {
    let filtered = students;

    if (selectedClass) {
      filtered = filtered.filter((s) => s.current_class === selectedClass);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          `${student.first_name} ${student.middle_name} ${student.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.admission_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [students, searchTerm, selectedClass]);

  // Get assigned role IDs to prevent duplicates
  const assignedRoleIds = useMemo(() => {
    return new Set(assignments.map((a) => a.roleId));
  }, [assignments]);

  // Get available roles (not yet assigned)
  const availableRoles = useMemo(() => {
    return roles.filter((role) => !assignedRoleIds.has(role.id));
  }, [roles, assignedRoleIds]);

  const addAssignment = (studentId: number, roleId?: number) => {
    // Check if student already has an assignment
    const existingIndex = assignments.findIndex(
      (a) => a.studentId === studentId
    );

    if (existingIndex >= 0) {
      if (roleId) {
        // Update existing assignment with new role
        const updated = [...assignments];
        updated[existingIndex] = { studentId, roleId, status: "pending" };
        setAssignments(updated);
      }
    } else {
      // Add new assignment (initially without role)
      setAssignments((prev) => [
        ...prev,
        { studentId, roleId: roleId || 0, status: "pending" },
      ]);
    }
  };

  const selectStudent = (studentId: number) => {
    const hasAssignment = assignments.some((a) => a.studentId === studentId);

    if (hasAssignment) {
      removeAssignment(studentId);
    } else {
      addAssignment(studentId);
    }
  };

  const removeAssignment = (studentId: number) => {
    setAssignments((prev) => prev.filter((a) => a.studentId !== studentId));
  };

  const mutation = useMutation({
    mutationFn: assignStudentLeadershipRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["StudentLeadership"] });
    },
  });

  const handleSubmitAssignments = async () => {
    setIsSubmitting(true);
    setCurrentStep("review");

    // Filter assignments that have both student and role
    const validAssignments = assignments.filter((a) => a.studentId && a.roleId);

    if (validAssignments.length === 0) {
      setIsSubmitting(false);
      setCurrentStep("assign");
      return;
    }

    // Prepare payload for bulk assignment
    const payload = validAssignments.map((assignment) => {
      const student = students.find((s) => s.id === assignment.studentId);
      return {
        student_id: assignment.studentId,
        role_id: assignment.roleId,
        class_arm_id: student?.class_arm_id || 0,
      };
    });

    try {
      const response = await mutation.mutateAsync(payload);

      // Update assignments based on response
      const updatedAssignments = [...assignments];

      if (response.data) {
        const { successful, failed } = response.data;

        // Mark successful assignments
        successful?.forEach((success: any) => {
          const index = updatedAssignments.findIndex(
            (a) =>
              a.studentId === success.student_id && a.roleId === success.role_id
          );
          if (index >= 0) {
            updatedAssignments[index].status = "success";
          }
        });

        // Mark failed assignments with specific error messages
        failed?.forEach((failure: any) => {
          const index = updatedAssignments.findIndex(
            (a) =>
              a.studentId === failure.student_id && a.roleId === failure.role_id
          );
          if (index >= 0) {
            updatedAssignments[index].status = "error";
            updatedAssignments[index].error = failure.error;
          }
        });
      } else {
        // If all successful (no multi-status response)
        updatedAssignments.forEach((assignment) => {
          if (assignment.roleId) {
            assignment.status = "success";
          }
        });
      }

      setAssignments(updatedAssignments);
    } catch (error: any) {
      console.error("Error in bulk assignment:", error);

      // Handle different error scenarios
      if (error.response?.status === 207) {
        // Multi-status response - some succeeded, some failed
        const { successful, failed } = error.response.data.data;
        const updatedAssignments = [...assignments];

        successful?.forEach((success: any) => {
          const index = updatedAssignments.findIndex(
            (a) =>
              a.studentId === success.student_id && a.roleId === success.role_id
          );
          if (index >= 0) {
            updatedAssignments[index].status = "success";
          }
        });

        failed?.forEach((failure: any) => {
          const index = updatedAssignments.findIndex(
            (a) =>
              a.studentId === failure.student_id && a.roleId === failure.role_id
          );
          if (index >= 0) {
            updatedAssignments[index].status = "error";
            updatedAssignments[index].error = failure.error;
          }
        });

        setAssignments(updatedAssignments);
      } else if (error.response?.status === 400 && error.response?.data?.data) {
        // All assignments failed - extract specific error messages
        const { failed } = error.response.data.data;
        const updatedAssignments = [...assignments];

        failed?.forEach((failure: any) => {
          const index = updatedAssignments.findIndex(
            (a) =>
              a.studentId === failure.student_id && a.roleId === failure.role_id
          );
          if (index >= 0) {
            updatedAssignments[index].status = "error";
            updatedAssignments[index].error = failure.error;
          }
        });

        setAssignments(updatedAssignments);
      } else {
        // Complete failure - use generic error message
        const updatedAssignments = assignments.map((assignment) => ({
          ...assignment,
          status: "error" as const,
          error:
            error.response?.data?.message ||
            error.message ||
            "Assignment failed",
        }));
        setAssignments(updatedAssignments);
      }
    }

    setIsSubmitting(false);
    setCurrentStep("complete");
  };

  const getStudentName = (studentId: number) => {
    const student = students.find((s) => s.id === studentId);
    return student
      ? `${student.first_name} ${student.last_name}`
      : "Unknown Student";
  };

  const getRoleName = (roleId: number) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : "Unknown Role";
  };

  const resetAssignments = () => {
    setAssignments([]);
    setCurrentStep("assign");
  };

  const successCount = assignments.filter((a) => a.status === "success").length;
  const errorCount = assignments.filter((a) => a.status === "error").length;

  // Loading state
  if (studentsLoading || rolesLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">
            Loading students and roles...
          </span>
        </div>
      </div>
    );
  }

  if (currentStep === "complete") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center mb-6">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Assignment Complete
            </h2>
            <p className="text-gray-600">
              Leadership roles have been processed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium text-green-900">
                  {successCount} Successful Assignments
                </span>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="font-medium text-red-900">
                  {errorCount} Failed Assignments
                </span>
              </div>
            </div>
          </div>

          {errorCount > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Failed Assignments:
              </h3>
              <div className="space-y-2">
                {assignments
                  .filter((a) => a.status === "error")
                  .map((assignment, index) => (
                    <div
                      key={index}
                      className="p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-red-900">
                            {getStudentName(assignment.studentId)} →{" "}
                            {getRoleName(assignment.roleId)}
                          </div>
                          <div className="text-sm text-red-700 mt-1">
                            {assignment.error}
                          </div>
                        </div>
                        <XCircle className="h-5 w-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {successCount > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Successful Assignments:
              </h3>
              <div className="space-y-2">
                {assignments
                  .filter((a) => a.status === "success")
                  .map((assignment, index) => (
                    <div
                      key={index}
                      className="p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-green-900">
                          {getStudentName(assignment.studentId)} →{" "}
                          {getRoleName(assignment.roleId)}
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetAssignments}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Assign More Roles
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "review") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              {isSubmitting
                ? "Processing Assignments..."
                : "Assignment Results"}
            </h2>
          </div>

          {isSubmitting && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
                <span className="text-blue-700">
                  Processing {assignments.filter((a) => a.roleId).length}{" "}
                  assignments in bulk...
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {assignments
              .filter((a) => a.roleId)
              .map((assignment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <span className="font-medium">
                      {getStudentName(assignment.studentId)} →{" "}
                      {getRoleName(assignment.roleId)}
                    </span>
                    {assignment.error && (
                      <p className="text-sm text-red-600 mt-1">
                        {assignment.error}
                      </p>
                    )}
                  </div>
                  <div className="ml-4">
                    {assignment.status === "pending" && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    )}
                    {assignment.status === "success" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {assignment.status === "error" && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Leadership Assignment
        </h1>
        <p className="text-gray-600">
          Assign leadership roles to students. Each role can only be assigned to
          one student.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Students */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold mb-4">Select Students</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full rounded border border-gray-300 p-3 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full rounded border border-gray-300 p-3 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Classes</option>
                  {classes.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {filteredStudents.map((student) => {
                  const hasAssignment = assignments.some(
                    (a) => a.studentId === student.id
                  );
                  const assignedRole = hasAssignment
                    ? getRoleName(
                        assignments.find((a) => a.studentId === student.id)
                          ?.roleId || 0
                      )
                    : null;

                  return (
                    <div
                      key={student.id}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        hasAssignment
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => selectStudent(student.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {student.first_name} {student.last_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {student.admission_number} • {student.current_class}
                          </p>
                          {assignedRole && (
                            <p className="text-sm text-blue-600 font-medium">
                              Assigned: {assignedRole}
                            </p>
                          )}
                        </div>
                        {hasAssignment && (
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Roles & Assignments */}
        <div className="space-y-6">
          {/* Available Roles */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Available Roles</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {availableRoles.map((role) => (
                  <div
                    key={role.id}
                    className="p-3 border border-dashed border-gray-300 rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900">{role.name}</h3>
                    {role.description && (
                      <p className="text-sm text-gray-500">
                        {role.description}
                      </p>
                    )}
                  </div>
                ))}
                {availableRoles.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    All roles have been assigned
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Role Assignment Interface */}
          {assignments.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Assign Roles</h2>
              </div>
              <div className="p-4 space-y-3">
                {assignments.map((assignment, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">
                        {getStudentName(assignment.studentId)}
                      </span>
                      <button
                        onClick={() => removeAssignment(assignment.studentId)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <select
                      value={assignment.roleId || ""}
                      onChange={(e) =>
                        addAssignment(
                          assignment.studentId,
                          Number(e.target.value) || 0
                        )
                      }
                      className="w-full text-sm rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select role...</option>
                      {roles
                        .filter(
                          (role) =>
                            role.id === assignment.roleId ||
                            !assignedRoleIds.has(role.id)
                        )
                        .map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                    </select>
                  </div>
                ))}

                <button
                  onClick={handleSubmitAssignments}
                  disabled={
                    isSubmitting ||
                    assignments.length === 0 ||
                    assignments.some((a) => !a.roleId)
                  }
                  className="w-full mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting
                    ? "Processing..."
                    : `Assign ${assignments.filter((a) => a.roleId).length} Role${assignments.filter((a) => a.roleId).length !== 1 ? "s" : ""}`}
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Users className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">How to assign roles:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Click on students to select/deselect them</li>
                  <li>Choose a role for each selected student</li>
                  <li>Click "Assign Roles" to process all assignments</li>
                </ol>
                <p className="mt-2 text-xs text-blue-600">
                  💡 Tip: Selected students will appear in blue with a checkmark
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipAssignmentPage;
