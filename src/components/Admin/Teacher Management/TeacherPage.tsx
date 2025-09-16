import React, { useState, type ChangeEvent } from "react";
import PageHeader from "../../../shared/PageHeader";
import TeacherList from "./TeacherList";

import AddTeacher from "./AddTeacher";

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
        <AddTeacher setModalOpen={setModalOpen} modalOpen={modalOpen} />
      )}
    </div>
  );
};

export default TeacherPage;
