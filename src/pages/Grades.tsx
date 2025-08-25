import { useEffect, type JSX } from "react";
import { useRole } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import GradesPage from "../components/Admin/Grades/Index";
import StudentGrades from "../components/Student/Grades/Index";

const roleComponents: Record<string, JSX.Element> = {
  admin: <GradesPage />,
  // teacher: <TeacherOverview />,
  student: <StudentGrades />,
};
const Grades = () => {
  const navigate = useNavigate();
  const role = useRole();
  useEffect(() => {
    if (!role) {
      navigate("/signin");
    }
  }, [role, navigate]);

  return role ? roleComponents[role] || null : null;
};

export default Grades;
