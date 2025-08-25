import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopSection from "./TopSection";

const DashboardLayout = () => {
  return (
    <div className=" flex">
      <div>
        <Sidebar
          isMobileMenuOpen={false}
          setIsMobileMenuOpen={function (isOpen: boolean): void {
            throw new Error("Function not implemented.");
            console.log(isOpen);
          }}
        />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col  overflow-y-scroll h-screen ">
        {/* TopSection */}
        <div className="">
          <TopSection handleCustomizationClick={() => console.log("first")} />
        </div>

        {/* Content with scroll */}
        <div className="custom-scrollbar flex-1  px-8 py-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
