import { assignmentList } from "../../../data";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const MyAssignments = () => {
  const navigate = useNavigate();

  const handleSubmissionClick = (ass: any) => {
    navigate(`/dashboard/assignment/${ass.id}/submissions`, {
      state: { ass },
    });
  };
  return (
    <div className=" ">
      <div className="  grid grid-cols-3 gap-5">
        {assignmentList.map((ass) => (
          <div key={ass.id} className="card space-y-4">
            <div className=" flex justify-between">
              <div>{ass.title}</div>
              <div>
                <p>{ass.dueDate}</p>
                <p>{ass.classArm}</p>
                <p>{ass.subject}</p>
              </div>
            </div>
            <div>{ass.description}</div>
            {/* cta */}
            <div className="flex justify-between ">
              <Button variant="secondary">Preview</Button>
              <Button
                variant="primary"
                onClick={() => handleSubmissionClick(ass)}
              >
                Submissions
              </Button>
              <Button variant="delete">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAssignments;
