import PageHeader from "../../../shared/PageHeader";
import StatsCard from "./StatsCard";

const TeacherOverview = () => {
  return (
    <div className=" space-y-8">
      <PageHeader title="Dashboard" sub="See relevent charts" button={false} />
      <StatsCard />
    </div>
  );
};

export default TeacherOverview;
