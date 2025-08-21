// import { Megaphone } from "lucide-react";
import { announcements } from "../data";
import PageHeader from "../shared/PageHeader";

const Announcements = () => {
  return (
    <div className=" space-y-6">
      <PageHeader title="Announcement" buttonText="Create Announcement" />
      {/*  */}
      <div className=" space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className=" card space-y-4">
            <div className=" w-full flex items-center justify-end">
              <span>{/* <Megaphone className=" text-brand-900" /> */}</span>
            </div>
            <h1 className="text-center text-2xl">{announcement.title}</h1>
            <div className=" text-gray-400 flex justify-end ">
              <div>
                <p>{announcement.createdBy}</p>
                <p>{announcement.createdAt}</p>
              </div>
            </div>
            <div>{announcement.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
