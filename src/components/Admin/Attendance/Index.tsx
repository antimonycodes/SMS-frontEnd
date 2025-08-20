import PageHeader from "../../../shared/PageHeader";
import AttendanceList from "./AttendanceList";

const AttendancePage = () => {
  return (
    <div className=" space-y-6">
      <PageHeader
        title="Attendance Management"
        sub="Manage student attendance records"
        buttonText="Mark Attendance"
      />
      {/*  */}
      <AttendanceList />
    </div>
  );
};

export default AttendancePage;
