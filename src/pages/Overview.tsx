import { useEffect, type JSX } from "react";
import { useRole } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import AdminOverview from "../components/Admin/Overview/AdminOverview";

const roleComponents: Record<string, JSX.Element> = {
  admin: <AdminOverview />,
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
