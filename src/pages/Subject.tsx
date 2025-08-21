import Table from "../components/ui/Table";
import { subjects } from "../data";
import PageHeader from "../shared/PageHeader";

const Subject = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "subjectName", label: "Name" },
    { key: "classes", label: "Class" },
    { key: "teachers", label: "teachers" },
  ];
  return (
    <div className=" space-y-6">
      <PageHeader title="Subjects Management" buttonText="Add New Subject" />
      <Table data={subjects} columns={columns} rowKey="id" />
    </div>
  );
};

export default Subject;
