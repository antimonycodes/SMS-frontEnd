import AttendancePage from "../components/Admin/Attendance/Index";
import { useEffect, type JSX } from "react";
import { useRole } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import StudentAttendance from "../components/Student/Attendance/Index";

const roleComponents: Record<string, JSX.Element> = {
  admin: <AttendancePage />,
  // teacher: <TeacherOverview />,
  student: <StudentAttendance />,
};

const Attendance = () => {
  const navigate = useNavigate();
  const role = useRole();
  useEffect(() => {
    if (!role) {
      navigate("/signin");
    }
  }, [role, navigate]);

  return role ? roleComponents[role] || null : null;
};

export default Attendance;
