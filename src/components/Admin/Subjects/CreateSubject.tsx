import { Loader2, Check } from "lucide-react";
import Modal from "../../../shared/Modals";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useQuery } from "@tanstack/react-query";
import {
  createSchoolSubjectsQuery,
  getClassLevelsQueryOption,
} from "../../../hooks/queryOptions";
import React, { useState, useCallback } from "react";
import { toast } from "sonner";

interface FormData {
  name: string;
  subject_code: string;
  category: string;
}

interface CreateSubjectProps {
  setOpenModal: (open: boolean) => void;
  openModal: boolean;
}

const CreateSubject: React.FC<CreateSubjectProps> = ({
  setOpenModal,
  openModal,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    subject_code: "",
    category: "",
  });
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);

  const { data: classLevels, isPending } = useQuery(
    getClassLevelsQueryOption()
  );
  const { mutate: createSubject, isPending: isLoading } =
    createSchoolSubjectsQuery();

  const handleClassSelection = useCallback((classId: number) => {
    setSelectedClasses((prev) => {
      const isSelected = prev.includes(classId);
      if (isSelected) {
        return prev.filter((id) => id !== classId);
      } else {
        return [...prev, classId];
      }
    });
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectAll = useCallback(() => {
    if (!classLevels) return;

    const allClassIds = classLevels.map((classLevel: any) =>
      Number(classLevel.id)
    );
    const allSelected = allClassIds.every((id) => selectedClasses.includes(id));

    if (allSelected) {
      setSelectedClasses([]);
    } else {
      setSelectedClasses(allClassIds);
    }
  }, [classLevels, selectedClasses]);

  const handleCreateSubject = useCallback(async () => {
    // Form validation
    if (!formData.name.trim()) {
      toast.error("Subject name is required");
      return;
    }

    if (selectedClasses.length === 0) {
      toast.error("Please select at least one class");
      return;
    }

    const payload = {
      ...formData,
      class_subjects: selectedClasses,
    };

    createSubject(payload, {
      onSuccess: () => {
        toast.success("Subject created successfully");
        setOpenModal(false);
        // Reset form
        setFormData({
          name: "",
          subject_code: "",
          category: "",
        });
        setSelectedClasses([]);
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to create subject");
      },
    });
  }, [formData, selectedClasses, createSubject, setOpenModal]);

  const allClassIds =
    classLevels?.map((classLevel: any) => Number(classLevel.id)) || [];
  const allSelected =
    allClassIds.length > 0 &&
    allClassIds.every((id) => selectedClasses.includes(id));
  const someSelected = selectedClasses.length > 0;

  return (
    <Modal
      size="md"
      title="Create New Subject"
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      position="center"
      closeOnOverlayClick={true}
      footer={
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => setOpenModal(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateSubject}
            disabled={
              isLoading || !formData.name.trim() || selectedClasses.length === 0
            }
            className="min-w-[140px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </div>
            ) : (
              "Create Subject"
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Subject Information */}
        <div className="space-y-4">
          <Input
            label="Subject Name *"
            name="name"
            value={formData.name}
            placeholder="Enter subject name (e.g., Mathematics)"
            onChange={handleInputChange}
            required
          />
          <Input
            label="Subject Code"
            name="subject_code"
            value={formData.subject_code}
            placeholder="Enter subject code (e.g., MATH, ENG)"
            onChange={handleInputChange}
          />
        </div>

        {/* Class Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Select Classes *
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              disabled={isPending}
              className="text-xs"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </Button>
          </div>

          {isPending ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
              <span className="ml-2 text-sm text-gray-500">
                Loading classes...
              </span>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto">
              {classLevels && classLevels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {classLevels.map((classLevel: any) => {
                    const classId = Number(classLevel.id);
                    const isSelected = selectedClasses.includes(classId);
                    return (
                      <label
                        key={classId}
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
                          onChange={() => handleClassSelection(classId)}
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
                          {classLevel.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-sm">No classes available</p>
                </div>
              )}
            </div>
          )}

          {/* Selection Summary */}
          {someSelected && (
            <div className="text-xs text-brand-600 bg-brand-50 px-3 py-2 rounded-md">
              {selectedClasses.length} class
              {selectedClasses.length === 1 ? "" : "es"} selected
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateSubject;
