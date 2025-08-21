import {
  Award,
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const InfoCard = ({ studentData }: any) => {
  console.log(studentData, "f");
  return (
    <div className="card space-y-6">
      {/* header */}
      <div className=" flex gap-8 items-center">
        {" "}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-600">
          <img
            src={studentData.profileImage}
            alt=""
            className=" w-full h-full rounded-full"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {`${studentData?.lastName} ${studentData?.firstName}`}
          </h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1 text-brand-500 " />
              ID: {studentData?.id}
            </span>
            <span className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-1 text-brand-500 " />
              {studentData?.class}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-brand-500 " />
              Age {studentData?.age}
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-brand-500 " />
              {studentData?.stateOfOrigin} State
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-3 text-brand-500 " />
              <span>{studentData.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-3 text-brand-500 " />
              <span>{studentData.email}</span>
            </div>
          </div>
          <div className="flex items-center  mt-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-3 text-brand-500 mt-1" />
            <span>{studentData.address}</span>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-3 grid grid-cols-5">
              <div className="flex flex-col">
                <span className="text-gray-600">Date of Birth:</span>
                <span className="font-medium">{studentData.dateOfBirth}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium">{studentData.gender}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Blood Group:</span>
                <span className="font-medium">{studentData.bloodGroup}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Religion:</span>
                <span className="font-medium">{studentData.religion}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">student Type:</span>
                <span className="font-medium">{studentData.studentType}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Parent/Guardian Information
            </h3>
            <div className=" ">
              <div className="grid grid-cols-5">
                <div className="flex flex-col">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{studentData.parent.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Relationship:</span>
                  <span className="font-medium">
                    {studentData.parent.relationship}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Occupation:</span>
                  <span className="font-medium">
                    {studentData.parent.occupation}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">
                    {studentData.parent.phone}
                  </span>
                </div>{" "}
                <div className="flex flex-col">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">
                    {studentData.parent.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {student.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-yellow-50 rounded-lg"
                >
                  <Award className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {achievement.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {achievement.term} {achievement.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
