import { useEffect, type JSX } from "react";
import { useRole } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import AdminOverview from "../components/Admin/Overview/AdminOverview";
import TeacherOverview from "../components/Teacher/Overview/TeacherOverview";
import StudentOverview from "../components/Student/Overview/StudentOverview";

const roleComponents: Record<string, JSX.Element> = {
  admin: <AdminOverview />,
  teacher: <TeacherOverview />,
  student: <StudentOverview />,
};
const Overview = () => {
  const navigate = useNavigate();
  const role = useRole();
  useEffect(() => {
    if (!role) {
      navigate("/signin");
    }
  }, [role, navigate]);

  return role ? roleComponents[role] || null : null;
};

export default Overview;
