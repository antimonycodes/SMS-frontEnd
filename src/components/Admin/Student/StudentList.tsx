import { useNavigate } from "react-router-dom";
import { studentsList } from "../../../data";
import Table from "../../ui/Table";

const StudentList = () => {
  const navigate = useNavigate();
  const handleViewMore = (student: any) => {
    navigate(`/dashboard/student/${student.id}`, {
      state: { data: student },
    });
  };
  console.log(studentsList[0]);

  //   const handleRowClick = (student: any) => {
  //     navigate(`/dashboard/student/${student.id}`, {
  //       state: {
  //         data: student,
  //       },
  //     });
  //   };

  const columns = [
    { key: "id", label: "id" },
    { key: "firstName", label: "firstName" },
    { key: "lastName", label: "lastName" },
    { key: "class", label: "class" },
    { key: "age", label: "age" },
    {
      key: "feeStatus",
      label: "Fee Staus",
      render: (_: any, student: any) => (
        <h1
          className={`p-1 rounded-md text-center ${student.feeStatus === "Fully paid" ? "text-green-400 bg-green-100 " : " text-red-500 bg-red-200"}`}
        >
          {student.feeStatus}
        </h1>
      ),
    },
    {
      key: "email",
      label: "email",
    },
    {
      key: "viewMore",
      label: "",
      render: (_: any, student: any) => (
        <span
          className="text-primary text-sm font-medium cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleViewMore(student);
          }}
        >
          View More
        </span>
      ),
    },
  ];
  return (
    <div>
      <Table data={studentsList} columns={columns} rowKey="id" />
    </div>
  );
};

export default StudentList;
