import { useState } from "react";
import PageHeader from "../../../shared/PageHeader";
import ClassroomList from "./ClassroomList";
import ClassSubjects from "./ClassSubjects";
import AddClassArmModal from "./AddClassArmModal";
// import ClassroomList from "./ClassroomList";

const ClassroomPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(0);

  const [openModal, setModalOpen] = useState(false);

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   studentId: "",
  //   age: "",
  //   gender: "",
  //   currentClass: "",
  // });
  return (
    <div className=" space-y-6">
      <PageHeader
        title="Classrooms"
        sub="Manage all class"
        buttonText="Add Clas"
        buttonClick={() => setModalOpen(true)}
      />
      {/*  */}
      <ClassroomList
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
      />
      <ClassSubjects
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
      />

      {openModal && (
        <AddClassArmModal
          isOpen={openModal}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ClassroomPage;
