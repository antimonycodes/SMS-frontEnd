import { useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import PageHeader from "../../../shared/PageHeader";

const AssignmentSubmission = () => {
  const location = useLocation();
  const ass = location.state;
  return (
    <>
      <PageHeader button={false} />
      <div className="card flex items-center justify-center mt-6">
        <div className="space-y-8 flex flex-col items-center">
          <div className=" text-xl font-medium">Submit: {ass.title}</div>
          <h2>Due Date: {ass.dueDate}</h2>
          {/*  */}
          <textarea name="" id="" className="inp w-full"></textarea>
          <Button>Submit Homework</Button>
        </div>
      </div>
    </>
  );
};

export default AssignmentSubmission;
