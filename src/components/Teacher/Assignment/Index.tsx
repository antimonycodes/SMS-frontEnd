import PageHeader from "../../../shared/PageHeader";
import MyAssignments from "./MyAssignments";

const TeacherAssignmentPage = () => {
  return (
    <div className=" space-y-6">
      <PageHeader
        title="Assignment Management"
        buttonText="Create New Assignment"
      />
      {/* Assignment List */}
      <MyAssignments />
    </div>
  );
};

export default TeacherAssignmentPage;
