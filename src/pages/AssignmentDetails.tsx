import { useEffect, type JSX } from "react";
import { useRole } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import TeacherAssignmentDetails from "../components/Teacher/Assignment/AssignmentDetails";
import AssignmentSubmission from "../components/Student/Assignmnet/AssignmentSubmission";

const roleComponents: Record<string, JSX.Element> = {
  teacher: <TeacherAssignmentDetails />,
  student: <AssignmentSubmission />,
};
const AssignmentDetails = () => {
  const navigate = useNavigate();
  const role = useRole();
  useEffect(() => {
    if (!role) {
      navigate("/signin");
    }
  }, [role, navigate]);

  return role ? roleComponents[role] || null : null;
};

export default AssignmentDetails;
