import { X } from "lucide-react";
import Button from "../components/ui/Button";

type ModalsProps = {
  title: string;
  onClose: any;
  children: any;
  onSubmit: any;
};

const Modals = ({ title, onClose, children, onSubmit }: ModalsProps) => {
  return (
    <div
      className=" fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center h-full "
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      {/*  */}
      <div className="fixed inset-0 bg-[#1E1E1E40] flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-lg custom-shadow overflow-y-auto w-full max-w-2xl my-[10%] h-[90%] pb-4">
          <div className="p-4 md:p-12 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-custom-black">
                {title}
              </h2>
              <button onClick={onClose}>
                <X className="text-black" />
              </button>
            </div>
            {children}
          </div>
          <div className=" flex items-center justify-end mr-8">
            <Button onClick={onSubmit} className="">
              {title}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modals;
