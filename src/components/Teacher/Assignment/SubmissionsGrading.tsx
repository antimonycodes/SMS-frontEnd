import { useLocation, useParams } from "react-router-dom";
import PageHeader from "../../../shared/PageHeader";
import InfoCard from "../../ui/InfoCard";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const SubmissionsGrading = () => {
  const { id } = useParams();
  const location = useLocation();
  const details = location.state;
  console.log(location);
  return (
    <div className="card space-y-8">
      <PageHeader />
      {/*  */}
      <div className=" space-y-4">
        <h1 className=" text-xl font-medium">{`${details.studentName} submission for ${details.subject} Assignment`}</h1>
        {/*Info  */}
        <div className=" grid grid-cols-3 gap-3">
          {/*  */}
          <InfoCard label="Name" data={details.studentName} />
          <InfoCard label="Assignment Topic" data={details.title} />
          <InfoCard label="Submitted At" data={details.submittedDate} />
          <div>
            <InfoCard label="Actions" />
            <div className=" flex items-center gap-3">
              <Button variant="secondary">Preview</Button>
              <Button>Download</Button>
            </div>
          </div>
        </div>
      </div>
      {/*Grade  */}
      <div className=" mt-6">
        <h1 className="text-lg mb-6">Provide feedback and Grade</h1>
        {/* inputs */}
        <div className=" space-y-6">
          {/* feedback */}
          <Input
            label="Feedback"
            placeholder="Provide detailed feedback on submission"
          />
          {/* Grade */}

          <Input
            name="grade"
            label="Grade"
            placeholder="Enter mark e.g 80/100, Seen, Good..."
          />

          {/* CTA */}
          <Button>Record</Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsGrading;
