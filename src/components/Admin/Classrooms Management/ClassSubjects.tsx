import { classrooms } from "../../../data";

const ClassSubjects = ({ selectedLevel }: any) => {
  console.log(classrooms[selectedLevel]);
  return (
    <div className=" card">
      <div>
        <h1 className=" font-semibold mb-4">
          {/* Subject Distribution for {classrooms[selectedLevel].category} */}
          To be Done
        </h1>
        {/*  */}
        <div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3">Subject</th>
                <th className="text-left p-3">Assigned Teacher</th>
                <th className="text-left p-3">Sections</th>
                <th className="text-left p-3">Weekly Periods</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>

            {/* <tbody>
              {classrooms[selectedLevel].subjectsData.map((c, index) => {
                return (
                  <tr key={index}>
                    <td className="p-3 font-medium">{c.subject}</td>
                    <td className="p-3">{c.assignedTeacher}</td>
                  </tr>
                );
              })}
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassSubjects;
