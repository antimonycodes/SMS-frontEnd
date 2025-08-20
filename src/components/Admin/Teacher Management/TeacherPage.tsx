import React, { useState, type ChangeEvent } from "react";
import PageHeader from "../../../shared/PageHeader";
import TeacherList from "./TeacherList";
import Modals from "../../../shared/Modals";
import Input from "../../ui/Input";

const TeacherPage = () => {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className=" space-y-6">
      <PageHeader
        title="Teachers Management"
        sub="Manage all teachers"
        buttonText="Add New Teacher"
        buttonClick={() => setModalOpen(true)}
      />
      {/*  */}
      <TeacherList />
      {modalOpen && (
        <Modals
          title="Add Teacher"
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
        >
          <div>
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
              value={formData.currentClass}
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
          </div>
        </Modals>
      )}
    </div>
  );
};

export default TeacherPage;
