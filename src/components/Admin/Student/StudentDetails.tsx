import { useLocation } from "react-router-dom";
import PageHeader from "../../../shared/PageHeader";
import InfoCard from "./InfoCard";
import StatsCards from "./StatsCards";
import StudentTabs from "./StudentTabs";

const StudentDetails = () => {
  const location = useLocation();
  const studentData = location.state.data;
  const { achievements } = studentData;
  console.log(studentData);
  console.log(achievements);
  return (
    <div className=" space-y-6">
      <PageHeader
        title="Back to students"
        editButton={true}
        deleteButton={true}
      />
      {/* Personal Information */}
      <InfoCard studentData={studentData} />
      {/* Stats */}
      <StatsCards studentData={studentData} />
      {/* Tabs */}
      <StudentTabs studentData={studentData} />
    </div>
  );
};

export default StudentDetails;
