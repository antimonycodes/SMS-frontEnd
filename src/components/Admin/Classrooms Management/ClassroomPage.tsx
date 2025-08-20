import { useState } from "react";
import PageHeader from "../../../shared/PageHeader";
import ClassroomList from "./ClassroomList";
import ClassSubjects from "./ClassSubjects";
// import ClassroomList from "./ClassroomList";

const ClassroomPage = () => {
  const [_, setModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(0);

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
    </div>
  );
};

export default ClassroomPage;
