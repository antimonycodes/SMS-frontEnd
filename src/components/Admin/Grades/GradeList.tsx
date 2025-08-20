import { classrooms, studentsGrades, teachers } from "../../../data";
import Button from "../../ui/Button";
import Table from "../../ui/Table";

const GradeList = () => {
  const schoolTerms = ["First Term", "Second Term", "Third Term"];
  const columns = [
    { key: "id", label: "Student ID" },
    { key: "fullName", label: "Name" },
    { key: "caScore", label: "CA(30)" },
    { key: "examScore", label: "Exam(70)" },
    { key: "total", label: "Total" },
    { key: "grade", label: "Grade" },
  ];

  return (
    <div className=" card space-y-4">
      {/* filters */}
      <div className="flex items-center gap-4">
        {/* filter by class */}
        <div>
          <select name="classFilter" className="inp">
            {classrooms.flatMap((level) =>
              level.classroom.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>
        {/* filter by subject */}
        <div>
          <select name="subjectFilter" className="inp">
            {teachers.flatMap((level) =>
              level.subjects.map((subject, index) => (
                <option key={index} value="">
                  {subject}
                </option>
              ))
            )}
          </select>
        </div>
        {/* filter by term */}
        <div>
          <select name="termFilter" className="inp">
            {schoolTerms.map((term) => (
              <option value="">{term}</option>
            ))}
          </select>
        </div>
      </div>
      {/* table */}
      <Table data={studentsGrades} columns={columns} rowKey="id" />
      <div className=" flex items-center justify-end">
        <Button className="">Save Grades</Button>
      </div>
    </div>
  );
};

export default GradeList;
