import { useEffect, type JSX } from "react";
import { useRole } from "../lib/utils";
import FeesPage from "../components/Admin/Fees/Index";
import StudentFees from "../components/Student/Fees/Index";
import { useNavigate } from "react-router-dom";

const roleComponents: Record<string, JSX.Element> = {
  admin: <FeesPage />,
  // teacher: <TeacherOverview />,
  student: <StudentFees />,
};

const Fees = () => {
  const navigate = useNavigate();
  const role = useRole();
  useEffect(() => {
    if (!role) {
      navigate("/signin");
    }
  }, [role, navigate]);

  return role ? roleComponents[role] || null : null;
};

export default Fees;
