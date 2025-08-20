import { useEffect, type JSX } from "react";
import { useRole } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import AdminStudentPage from "../components/Student/AdminStudentPage";

const roleComponents: Record<string, JSX.Element> = {
  admin: <AdminStudentPage />,
};
const Students = () => {
  const navigate = useNavigate();
  const role = useRole();
  useEffect(() => {
    if (!role) {
      navigate("/signin");
    }
  }, [role, navigate]);

  return role ? roleComponents[role] || null : null;
};

export default Students;
