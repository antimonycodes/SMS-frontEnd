import PageHeader from "../../../shared/PageHeader";
import FeesStats from "./FeesStats";

const FeesPage = () => {
  return (
    <div className=" space-y-6">
      <PageHeader
        title="Fees Management"
        sub="Manage all students fees"
        buttonText="Add new payment"
      />
      {/*  */}
      <FeesStats />
    </div>
  );
};

export default FeesPage;
