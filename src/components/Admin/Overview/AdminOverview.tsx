import PageHeader from "../../../shared/PageHeader";
import ClassStats from "./ClassStats";
import QuickStats from "./QuickStats";

const AdminOverview = () => {
  return (
    <div className=" space-y-8">
      <PageHeader title="Dashboard" sub="See relevent charts" button={false} />
      <QuickStats />
      <ClassStats />
    </div>
  );
};

export default AdminOverview;
