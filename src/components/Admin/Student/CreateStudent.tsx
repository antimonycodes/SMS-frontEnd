import { useQuery } from "@tanstack/react-query";
import Modal from "../../../shared/Modals";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Loader2,
  User,
  Mail,
  // Phone,
  MapPin,
  Calendar,
  Users,
  FileImage,
  GraduationCap,
} from "lucide-react";
import { getClassArmsQueryOption } from "../../../hooks/queryOptions";
import Select from "../../ui/Select";
import type { StudentFormData } from "../../../types";
import { createStudentQuery } from "../../../hooks/useStudent";

interface CreateStudentProps {
  setModalOpen: (open: boolean) => void;
  modalOpen: boolean;
}

const CreateStudent: React.FC<CreateStudentProps> = ({
  setModalOpen,
  modalOpen,
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    admission_number: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
    state_of_origin: "",
    lga: "",
    nationality: "Nigerian",
    religion: "",
    guardian_name: "",
    guardian_phone: "",
    guardian_email: "",
    guardian_address: "",
    guardian_relationship: "",
    admission_date: "",
    class_arm_id: "",
    passport_url: "",
    is_active: true,
  });

  const { mutate: createStudent, isPending } = createStudentQuery();

  const { data: classArms, isPending: isLoading } = useQuery(
    getClassArmsQueryOption()
  );

  console.log(classArms);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type, checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  const validateForm = (): boolean => {
    const requiredFields = [
      "admission_number",
      "first_name",
      "last_name",
      "email",
      "phone",
      "date_of_birth",
      "gender",
      "address",
      "state_of_origin",
      "lga",
      "nationality",
      "religion",
      "guardian_name",
      "guardian_phone",
      "guardian_email",
      "guardian_relationship",
      "admission_date",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof StudentFormData]?.toString().trim()) {
        toast.error(
          `${field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} is required`
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

    // Guardian email validation
    if (!emailRegex.test(formData.guardian_email)) {
      toast.error("Please enter a valid guardian email address");
      return false;
    }

    // Phone validation (basic)
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    // Guardian phone validation
    if (formData.guardian_phone.length < 10) {
      toast.error("Please enter a valid guardian phone number");
      return false;
    }

    // Age validation (assuming minimum age of 5 for school)
    const birthDate = new Date(formData.date_of_birth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 5 || age > 25) {
      toast.error("Please enter a valid date of birth (age between 5-25)");
      return false;
    }

    return true;
  };

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;
    console.log(formData);
    if (!formData.class_arm_id.trim()) return;

    createStudent(formData, {
      onSuccess: () => {
        toast.success("Student added successfully");
        setModalOpen(false);
        // Reset form
        setFormData({
          admission_number: "",
          first_name: "",
          last_name: "",
          middle_name: "",
          email: "",
          phone: "",
          date_of_birth: "",
          gender: "",
          address: "",
          state_of_origin: "",
          lga: "",
          nationality: "Nigerian",
          religion: "",
          guardian_name: "",
          guardian_phone: "",
          guardian_email: "",
          guardian_address: "",
          guardian_relationship: "",
          admission_date: "",
          class_arm_id: "",
          passport_url: "",
          is_active: true,
        });
      },
    });
  }, [formData, createStudent, setModalOpen]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const genderOptions = ["Male", "Female", "Other"];
  const relationshipOptions = [
    "Father",
    "Mother",
    "Guardian",
    "Uncle",
    "Aunt",
    "Grandfather",
    "Grandmother",
    "Other",
  ];
  const religionOptions = ["Christianity", "Islam", "Traditional", "Other"];

  return (
    <Modal
      title="Add New Student"
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
            // disabled={isPending}
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
              "Add Student"
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
              label="Admission Number *"
              name="admission_number"
              value={formData.admission_number}
              placeholder="e.g., ADM2025-002"
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
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-10 text-gray-400" />
              <Input
                label="Date of Birth *"
                name="date_of_birth"
                type="date"
                value={formatDate(formData.date_of_birth)}
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                required
              >
                <option value="">Select gender</option>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
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
              placeholder="student@school.com"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="State of Origin *"
              name="state_of_origin"
              value={formData.state_of_origin}
              placeholder="e.g., Lagos"
              onChange={handleInputChange}
              required
            />
            <Input
              label="LGA *"
              name="lga"
              value={formData.lga}
              placeholder="e.g., Ikeja"
              onChange={handleInputChange}
              required
            />
            <Input
              label="Nationality *"
              name="nationality"
              value={formData.nationality}
              placeholder="e.g., Nigerian"
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Religion *
            </label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              required
            >
              <option value="">Select religion</option>
              {religionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Guardian Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <Users className="w-5 h-5 text-brand-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Guardian Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Guardian Name *"
              name="guardian_name"
              value={formData.guardian_name}
              placeholder="Enter guardian's full name"
              onChange={handleInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship *
              </label>
              <select
                name="guardian_relationship"
                value={formData.guardian_relationship}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                required
              >
                <option value="">Select relationship</option>
                {relationshipOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Guardian Phone *"
              name="guardian_phone"
              type="tel"
              value={formData.guardian_phone}
              placeholder="+2348023345567"
              onChange={handleInputChange}
              required
            />
            <Input
              label="Guardian Email *"
              name="guardian_email"
              type="email"
              value={formData.guardian_email}
              placeholder="guardian@example.com"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-10 text-gray-400" />
              <Input
                label="Guardian Address *"
                name="guardian_address"
                value={formData.guardian_address}
                placeholder="Enter guardian's full address"
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        {/* School Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <GraduationCap className="w-5 h-5 text-brand-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              School Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-10 text-gray-400" />
              <Input
                label="Admission Date *"
                name="admission_date"
                type="date"
                value={formatDate(formData.admission_date)}
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
            {/*  */}
            <div>
              <Select
                name="class_arm_id"
                label="Current Class"
                value={formData.class_arm_id}
                onChange={handleInputChange}
                options={
                  classArms?.map((arm) => ({
                    label: arm.name,
                    value: arm.id,
                  })) ?? []
                }
                placeholder="Select current class"
                loading={isLoading}
              />
            </div>
            {/*  */}
            <div className="relative">
              <FileImage className="w-4 h-4 absolute left-3 top-10 text-gray-400" />
              <Input
                label="Passport Photo URL"
                name="passport_url"
                type="url"
                value={formData.passport_url}
                placeholder="https://example.com/photo.jpg"
                onChange={handleInputChange}
                className="pl-10"
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
                Active Student
              </label>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateStudent;
