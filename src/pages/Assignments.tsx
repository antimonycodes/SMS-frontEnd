import { useEffect, type JSX } from "react";
import { useRole } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import TeacherAssignmentPage from "../components/Teacher/Assignment/Index";
import StudentAssignmentPage from "../components/Student/Assignmnet/Index";

const roleComponents: Record<string, JSX.Element> = {
  teacher: <TeacherAssignmentPage />,
  student: <StudentAssignmentPage />,
};
const Assignments = () => {
  const navigate = useNavigate();
  const role = useRole();
  useEffect(() => {
    if (!role) {
      navigate("/signin");
    }
  }, [role, navigate]);

  return role ? roleComponents[role] || null : null;
};

export default Assignments;
