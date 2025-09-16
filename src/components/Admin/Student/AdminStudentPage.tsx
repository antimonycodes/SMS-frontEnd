import { useState, type ChangeEvent, type FormEvent } from "react";
import Modals from "../../../shared/Modals";
import PageHeader from "../../../shared/PageHeader";
import StudentList from "./StudentList";
import Input from "../../ui/Input";
import CreateStudent from "./CreateStudent";

const AdminStudentPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    age: "",
    gender: "",
    currentClass: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className=" space-y-5">
      <PageHeader
        title="Students Management"
        sub="Manage All Students"
        buttonText="Add Student"
        buttonClick={() => setModalOpen(true)}
      />
      <div>
        <StudentList />
      </div>
      {modalOpen && (
        <CreateStudent modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default AdminStudentPage;
