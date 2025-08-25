import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../shared/PageHeader";
import Button from "../../ui/Button";

const TeacherAssignmentDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const lists = location.state.ass;
  console.log(lists);
  console.log(location);

  const handleButtonClick = (student: any) => {
    navigate(`/dashboard/assignment/${id}/submissions/grade/${student.id}`, {
      state: student,
    });
  };

  return (
    <div className="card space-y-6">
      <PageHeader title={`Submissions for ${lists.title}`} />
      {/*  */}
      <div className="overflow-x-auto border border-[#EAECF0]">
        <table className="w-full text-sm  divide-y divide-[#EAECF0]">
          <thead className="bg-[#F9FAFB]">
            <tr className="bg-gray-50">
              <th className="text-left p-3">Student</th>
              <th className="text-center p-3">Status</th>
              <th className="text-center p-3">Submitted On</th>
              <th className="text-center p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lists.submissionList.map((student: any, index: any) => (
              <tr
                key={index}
                className="border-b border-[#EAECF0] hover:bg-gray-50"
              >
                <td className="p-3 text-center ">
                  <div className=" flex items-center gap-2">
                    <div className=" size-12">
                      <img
                        src={student.img}
                        alt=""
                        className=" w-full h-full rounded-full"
                      />
                    </div>
                    <h2>{student.studentName}</h2>
                  </div>
                </td>
                <td className="p-3 text-center">{student.status}</td>
                <td className="p-3 text-center">{student.submittedDate}</td>
                <td className="p-3 text-center flex justify-center">
                  <Button
                    variant="primary"
                    onClick={() => handleButtonClick(student)}
                  >
                    View & Grade
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherAssignmentDetails;
