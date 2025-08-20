import Table from "../../ui/Table";
import { teachers } from "../../../data";
import { useNavigate } from "react-router-dom";

const TeacherList = () => {
  const navigate = useNavigate();

  const handleViewMore = (teacher: any) => {
    navigate(`/dashboard/teacher/${teacher.id}`, {
      state: { data: teacher },
    });
  };
  const columns = [
    { key: "id", label: "Teacher ID" },
    { key: "firstName", label: "firstName" },
    { key: "lastName", label: "lastName" },
    // { key: "class", label: "class" },
    {
      key: "classes",
      label: "Class Assigned",
      render: (teacher: any) => (
        <div>
          {/* {console.log(teacher)} */}
          {/* {teacher?.map((column) => (
            <div>{column}</div>
          ))} */}
          {teacher.join(", ")}
        </div>
      ),
    },
    {
      key: "subjects",
      label: "Subject",
      render: (teacher: any) => (
        <div>
          {/* {console.log(teacher)} */}
          {/* {teacher?.map((column) => (
            <div>{column}</div>
          ))} */}
          {teacher.join(", ")}
        </div>
      ),
    },
    { key: "email", label: "email" },
    {
      key: "viewMore",
      label: "",
      render: (_: any, teacher: any) => (
        <span
          className="text-primary text-sm font-medium cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleViewMore(teacher);
          }}
        >
          View More
        </span>
      ),
    },
  ];
  return (
    <div>
      <Table data={teachers} columns={columns} rowKey="id" />
    </div>
  );
};

export default TeacherList;
