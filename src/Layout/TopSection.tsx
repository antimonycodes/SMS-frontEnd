// import profilePic from "../assets/profilepic.png";
// import settings from "../assets/svgs/settings.svg";
// import searchIcon from "../assets/svgs/search.svg";
// import { useAdminStore } from "../store/useAdminStore";
// import { useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import { useRole } from "../lib/utils";

// import CustomizationSetting from "./CustomizationSetting";
const TopSection = ({}: { handleCustomizationClick: () => void }) => {
  //   const { currentUser, getCurrentAdmin } = useAdminStore();
  const [activeSection] = useState("dashboard");

  const [selectedTerm] = useState("2");
  const [selectedSession] = useState("2024/2025");
  const role = useRole();

  // Get user's initials from first and last name
  // const getUserInitials = () => {
  //   let initials = "T A";

  //   // If we couldn't get any initials, return "U" as fallback
  //   return initials || "";
  // };
  return (
    <div className="  shadow w-full ">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            // onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="lg:ml-0 ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Good Morning, {role}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedSession} Academic Session • Term {selectedTerm} •{" "}
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
