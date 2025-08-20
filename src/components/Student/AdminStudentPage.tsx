import { useState, type ChangeEvent, type FormEvent } from "react";
import Modals from "../../shared/Modals";
import PageHeader from "../../shared/PageHeader";
import StudentList from "./StudentList";
import Input from "../ui/Input";

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
        <Modals
          title="Add Student"
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        >
          <Input
            label="First Name"
            name="firstName"
            placeholder="Student first name"
            value={formData.firstName}
            onChange={handleInputChange}
          />{" "}
          <Input
            label="Last Name"
            name="lastName"
            placeholder="Student last name"
            value={formData.lastName}
            onChange={handleInputChange}
          />{" "}
          <Input
            label="Email"
            name="email"
            placeholder="Student email address"
            value={formData.email}
            onChange={handleInputChange}
          />{" "}
          <Input
            label="Student ID"
            name="studentId"
            placeholder="Student Unique ID"
            value={formData.studentId}
            onChange={handleInputChange}
          />{" "}
          <Input
            label="Gender"
            name="gender"
            placeholder="M or F"
            value={formData.gender}
            onChange={handleInputChange}
          />
          <Input
            label="Age"
            name="age"
            placeholder="age"
            value={formData.age}
            type="number"
            onChange={handleInputChange}
          />{" "}
          <Input
            label="Current Class"
            name="currentClass"
            placeholder="Class"
            value={formData.currentClass}
            onChange={handleInputChange}
          />
        </Modals>
      )}
    </div>
  );
};

export default AdminStudentPage;
