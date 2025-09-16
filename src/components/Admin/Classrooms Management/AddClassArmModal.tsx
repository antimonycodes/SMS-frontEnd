import { useState } from "react";
import Modal from "../../../shared/Modals";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useQuery } from "@tanstack/react-query";
import {
  getClassLevelsQueryOption,
  useCreateClassArm,
} from "../../../hooks/queryOptions";
import { Loader2 } from "lucide-react";

type AddClassArmModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddClassArmModal = ({ isOpen, onClose }: AddClassArmModalProps) => {
  const [formData, setFormData] = useState({
    classLevelId: "",
    armName: "",
  });

  const { data: classLevels, isPending } = useQuery(
    getClassLevelsQueryOption()
  );

  const { mutate: createClassArm, isPending: isLoading } = useCreateClassArm();

  const handleAddClass = () => {
    if (!formData.armName.trim()) return;

    createClassArm(
      {
        classLevelId: formData.classLevelId,
        armName: formData.armName,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="text-black">
      <Modal
        size="md"
        title="Add Class Arm"
        isOpen={isOpen}
        onClose={onClose}
        position="center"
        closeOnOverlayClick={true}
        footer={
          <>
            <Button variant="primary" onClick={handleAddClass}>
              {isLoading ? (
                <Loader2 className=" animate-spin infinite" />
              ) : (
                "Add New Class"
              )}
            </Button>
          </>
        }
      >
        <div className=" space-y-6">
          {/*  */}
          <Input
            label="Class Arm Name"
            name="classArmName"
            value={formData.armName}
            placeholder="Enter class name"
            onChange={(e) =>
              setFormData({ ...formData, armName: e.target.value })
            }
          />
          <Select
            name="classArmSelect"
            label="Select Class Arm"
            value={formData.classLevelId}
            onChange={(e) =>
              setFormData({ ...formData, classLevelId: e.target.value })
            }
            options={
              classLevels?.map((level) => ({
                label: level.name,
                value: level.id,
              })) ?? []
            }
            placeholder="Choose a class level"
            loading={isPending}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddClassArmModal;
