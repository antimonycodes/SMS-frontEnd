import { Loader2 } from "lucide-react";
import Modal from "../../shared/Modals";
import Button from "../ui/Button";
import Input from "../ui/Input";
import React, { useState } from "react";
import { createAnnouncementsQuery } from "../../hooks/queryOptions";

const CreateAnnouncement = ({ openModal, setOpenModal }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
  });

  const { mutate: createAnnouncement, isPending } = createAnnouncementsQuery();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    createAnnouncement(formData, {
      onSuccess: () => {
        console.log(formData);
        setOpenModal(false);
      },
    });
  };
  return (
    <div>
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
              variant="primary"
              onClick={handleCreate}
              disabled={isPending || !formData}
              className="min-w-[140px]"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Announcement"
              )}
            </Button>
          </div>
        }
      >
        <div className=" space-y-6">
          <Input
            label="Title*"
            name="title"
            value={formData.title}
            placeholder="Announce ment title "
            onChange={handleInputChange}
            required
          />
          <Input
            type="subject"
            label="Subject"
            name="subject"
            value={formData.subject}
            placeholder="Enter Announcement subject"
            onChange={handleInputChange}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateAnnouncement;
