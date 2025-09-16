import {
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const InfoCard = ({ studentData }: any) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-8">
      {/* Header */}
      <div className="flex gap-6 items-center border-b pb-6">
        <img
          src={studentData.profileImage}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {`${studentData?.lastName} ${studentData?.firstName}`}
          </h1>

          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4 text-brand-500" /> ID: {studentData?.id}
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4 text-brand-500" />{" "}
              {studentData?.class}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-brand-500" /> Age{" "}
              {studentData?.age}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-brand-500" />{" "}
              {studentData?.stateOfOrigin} State
            </span>
          </div>

          <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-500" /> {studentData.phone}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-500" /> {studentData.email}
            </span>
          </div>

          <div className="flex items-center mt-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-brand-500 mr-2" />
            {studentData.address}
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem label="Date of Birth" value={studentData?.dateOfBirth} />
          <InfoItem label="Gender" value={studentData?.gender} />
          <InfoItem label="Blood Group" value={studentData?.bloodGroup} />
          <InfoItem label="Religion" value={studentData?.religion} />
          <InfoItem label="Student Type" value={studentData?.studentType} />
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Parent / Guardian</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem label="Name" value={studentData?.parent?.name} />
          <InfoItem
            label="Relationship"
            value={studentData?.parent?.relationship}
          />
          <InfoItem
            label="Occupation"
            value={studentData?.parent?.occupation}
          />
          <InfoItem label="Phone" value={studentData?.parent?.phone} />
          <InfoItem label="Email" value={studentData?.parent?.email} />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-medium text-gray-900">{value}</p>
  </div>
);

export default InfoCard;
