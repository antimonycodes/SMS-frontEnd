import { useQuery } from "@tanstack/react-query";
import {
  createTeacherQuery,
  getSubjectsQueryOptions,
} from "../../../hooks/queryOptions";
import Modal from "../../../shared/Modals";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  DollarSign,
} from "lucide-react";

interface Subject {
  id: string;
  name: string;
}

interface TeacherFormData {
  employee_id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone: string;
  address: string;
  qualification: string;
  hire_date: string;
  salary: string;
  is_active: boolean;
  primary_subjects: number[];
}

interface AddTeacherProps {
  setModalOpen: (open: boolean) => void;
  modalOpen: boolean;
}

const AddTeacher: React.FC<AddTeacherProps> = ({ setModalOpen, modalOpen }) => {
  const [formData, setFormData] = useState<TeacherFormData>({
    employee_id: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    hire_date: "",
    salary: "",
    is_active: true,
    primary_subjects: [],
  });

  const { mutate: createTeacher, isPending } = createTeacherQuery();
  const { data: subjects, isPending: isLoading } = useQuery(
    getSubjectsQueryOptions()
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  const handleSubjectSelection = useCallback((subjectId: number) => {
    setFormData((prev) => ({
      ...prev,
      primary_subjects: prev.primary_subjects.includes(subjectId)
        ? prev.primary_subjects.filter((id) => id !== subjectId)
        : [...prev.primary_subjects, subjectId],
    }));
  }, []);

  const validateForm = (): boolean => {
    const requiredFields = [
      "employee_id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "address",
      "qualification",
      "hire_date",
      "salary",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof TeacherFormData]?.toString().trim()) {
        toast.error(
          `${field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())} is required`
        );
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Phone validation (basic)
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    // Salary validation
    if (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      toast.error("Please enter a valid salary amount");
      return false;
    }

    if (formData.primary_subjects.length === 0) {
      toast.error("Please select at least one subject");
      return false;
    }

    return true;
  };

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;

    const payload = {
      ...formData,
      salary: Number(formData.salary),
    };

    createTeacher(payload, {
      onSuccess: () => {
        toast.success("Teacher added successfully");
        setModalOpen(false);
        // Reset form
        setFormData({
          employee_id: "",
          first_name: "",
          last_name: "",
          middle_name: "",
          email: "",
          phone: "",
          address: "",
          qualification: "",
          hire_date: "",
          salary: "",
          is_active: true,
          primary_subjects: [],
        });
      },
    });
  }, [formData, createTeacher, setModalOpen]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <Modal
      title="Add New Teacher"
      size="lg"
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      position="center"
      closeOnOverlayClick={true}
      footer={
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => setModalOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isPending}
            className="min-w-[120px]"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </div>
            ) : (
              "Add Teacher"
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <User className="w-5 h-5 text-brand-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Employee ID *"
              name="employee_id"
              value={formData.employee_id}
              placeholder="e.g., BAL004"
              onChange={handleInputChange}
              required
            />
            <Input
              label="First Name *"
              name="first_name"
              value={formData.first_name}
              placeholder="Enter first name"
              onChange={handleInputChange}
              required
            />
            <Input
              label="Last Name *"
              name="last_name"
              value={formData.last_name}
              placeholder="Enter last name"
              onChange={handleInputChange}
              required
            />
            <Input
              label="Middle Name"
              name="middle_name"
              value={formData.middle_name}
              placeholder="Enter middle name"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <Mail className="w-5 h-5 text-brand-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address *"
              name="email"
              type="email"
              value={formData.email}
              placeholder="teacher@school.com"
              onChange={handleInputChange}
              required
            />
            <Input
              label="Phone Number *"
              name="phone"
              type="tel"
              value={formData.phone}
              placeholder="09012345678"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-10 text-gray-400" />
              <Input
                label="Address *"
                name="address"
                value={formData.address}
                placeholder="Enter full address"
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <GraduationCap className="w-5 h-5 text-brand-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Professional Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Qualification *"
              name="qualification"
              value={formData.qualification}
              placeholder="e.g., BSc, MSc, PhD"
              onChange={handleInputChange}
              required
            />
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-10 text-gray-400" />
              <Input
                label="Hire Date *"
                name="hire_date"
                type="date"
                value={formatDate(formData.hire_date)}
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3 top-10 text-gray-400" />
              <Input
                label="Salary *"
                name="salary"
                type="number"
                value={formData.salary}
                placeholder="500000"
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 focus:ring-2"
              />
              <label
                htmlFor="is_active"
                className="text-sm font-medium text-gray-700"
              >
                Active Employee
              </label>
            </div>
          </div>
        </div>

        {/* Subject Assignment */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <GraduationCap className="w-5 h-5 text-brand-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Primary Subjects *
            </h3>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
              <span className="ml-2 text-sm text-gray-500">
                Loading subjects...
              </span>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-40 overflow-y-auto">
              {subjects && subjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subjects.map((subject: Subject) => {
                    const subjectId = Number(subject.id);
                    const isSelected =
                      formData.primary_subjects.includes(subjectId);
                    return (
                      <label
                        key={subject.id}
                        className={`
                          flex items-center p-3 rounded-md border-2 cursor-pointer transition-all
                          ${
                            isSelected
                              ? "border-brand-500 bg-brand-50 text-brand-700"
                              : "border-gray-200 bg-white hover:border-brand-300 hover:bg-brand-25"
                          }
                        `}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSubjectSelection(subjectId)}
                          className="sr-only"
                        />
                        <div
                          className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-colors
                          ${
                            isSelected
                              ? "border-brand-500 bg-brand-500"
                              : "border-gray-300 bg-white"
                          }
                        `}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {subject.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-sm">No subjects available</p>
                </div>
              )}
            </div>
          )}

          {/* Selection Summary */}
          {formData.primary_subjects.length > 0 && (
            <div className="text-xs text-brand-600 bg-brand-50 px-3 py-2 rounded-md">
              {formData.primary_subjects.length} subject
              {formData.primary_subjects.length === 1 ? "" : "s"} selected
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddTeacher;
