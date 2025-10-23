import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../../../shared/Modals";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { getStudentsQuery } from "../../../hooks/useStudent";
import { getLeadershipRolesQuery } from "../../../hooks/leadership";
import {
  assignSingleLeadershipRole,
  assignStudentLeadershipRole,
} from "../../../api/leadership";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

interface AppointmentData {
  student_id: number;
  role_id: number;
  class_arm_id: number;
}

const AppointLeadershipModal = ({ openModal, closeModal }: any) => {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data } = useQuery(getStudentsQuery(1, 10000));
  const { data: rolesData } = useQuery(getLeadershipRolesQuery());

  const students: Student[] = data?.data?.students || [];
  const roles: Role[] = rolesData || [];

  // Filter students based on search term
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    return students.filter(
      (student) =>
        `${student.first_name} ${student.middle_name} ${student.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.admission_number
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.current_class.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const mutation = useMutation({
    mutationFn: assignSingleLeadershipRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["StudentLeadership"] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });

  const handleStudentSelect = (studentId: number) => {
    if (mode === "single") {
      setSelectedStudent(studentId);
    } else {
      setSelectedStudents((prev) =>
        prev.includes(studentId)
          ? prev.filter((id) => id !== studentId)
          : [...prev, studentId]
      );
    }
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    if (mode === "single" && !selectedStudent) {
      toast.error("Please select a student");
      return;
    }

    if (mode === "bulk" && selectedStudents.length === 0) {
      toast.error("Please select at least one student");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "single") {
        const student = students.find((s) => s.id === selectedStudent);
        if (student) {
          await mutation.mutateAsync({
            student_id: selectedStudent ?? 0,
            role_id: selectedRole,
            class_arm_id: student.class_arm_id,
          });
        }
      } else {
        // Bulk assignment
        const promises = selectedStudents.map((studentId) => {
          const student = students.find((s) => s.id === studentId);
          if (student) {
            return mutation.mutateAsync({
              student_id: studentId,
              role_id: selectedRole,
              class_arm_id: student.class_arm_id,
            });
          }
        });

        await Promise.all(promises.filter(Boolean));
      }

      // Reset form
      setSelectedRole(null);
      setSelectedStudent(null);
      setSelectedStudents([]);
      setSearchTerm("");
      closeModal();

      toast.success(
        `Successfully appointed ${mode === "single" ? "1 student" : selectedStudents.length + " students"} to leadership role!`
      );
    } catch (error: any) {
      console.error("Error appointing leadership:", error);
      // toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModeChange = (newMode: "single" | "bulk") => {
    setMode(newMode);
    setSelectedStudent(null);
    setSelectedStudents([]);
  };

  const getSelectedStudentsInfo = () => {
    if (mode === "single") {
      const student = students.find((s) => s.id === selectedStudent);
      return student
        ? `${student.first_name} ${student.last_name} (${student.admission_number})`
        : "None selected";
    } else {
      return `${selectedStudents.length} student${selectedStudents.length !== 1 ? "s" : ""} selected`;
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onClose={closeModal}
      title="Appoint Leadership Role"
      footer={
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={closeModal}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !selectedRole ||
              (mode === "single"
                ? !selectedStudent
                : selectedStudents.length === 0)
            }
          >
            {isSubmitting
              ? "Appointing..."
              : `Appoint ${mode === "single" ? "Student" : "Students"}`}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 overflow-y-scroll">
        {/* Mode Selection */}
        <div className="flex gap-4">
          <Button
            variant={mode === "single" ? "primary" : "secondary"}
            onClick={() => handleModeChange("single")}
            className="flex-1"
          >
            Single Assignment
          </Button>
          <Button
            variant={mode === "bulk" ? "primary" : "secondary"}
            // onClick={() => handleModeChange("bulk")}
            onClick={() => navigate("/dashboard/leadership/assign")}
            className="flex-1"
          >
            Bulk Assignment
          </Button>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Leadership Role *
          </label>
          <select
            value={selectedRole || ""}
            onChange={(e) => setSelectedRole(Number(e.target.value) || null)}
            className="w-full rounded border border-gray-300 p-3 outline-none font-medium text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary"
          >
            <option value="">Choose a role...</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Students */}
        <Input
          label="Search Students"
          placeholder="Search by name, admission number, or class..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Selected Students Summary */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700">
            Selected: {getSelectedStudentsInfo()}
          </p>
        </div>

        {/* Students List */}
        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
          {filteredStudents.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No students found
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const isSelected =
                  mode === "single"
                    ? selectedStudent === student.id
                    : selectedStudents.includes(student.id);

                return (
                  <div
                    key={student.id}
                    onClick={() => handleStudentSelect(student.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      isSelected
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {mode === "bulk" && (
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleStudentSelect(student.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {student.first_name} {student.middle_name}{" "}
                              {student.last_name}
                            </h4>
                            <div className="text-sm text-gray-500 space-x-4">
                              <span>ID: {student.admission_number}</span>
                              <span>Class: {student.current_class}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {mode === "single" && isSelected && (
                        <div className="text-blue-600 font-medium">
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          {mode === "single"
            ? "Click on a student to select them for the leadership role."
            : "Check the boxes to select multiple students for bulk assignment."}
        </div>
      </div>
    </Modal>
  );
};

export default AppointLeadershipModal;
