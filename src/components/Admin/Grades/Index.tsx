import PageHeader from "../../../shared/PageHeader";
import GradeList from "./GradeList";

const GradesPage = () => {
  return (
    <div className=" space-y-6">
      <PageHeader
        title="Grades Management"
        sub="Manage all class grades"
        buttonText="Export"
        buttonClick={() => console.log("pending")}
      />
      {/*  */}
      <GradeList />
    </div>
  );
};

export default GradesPage;
