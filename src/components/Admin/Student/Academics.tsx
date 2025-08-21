//@ts-nocheck
import { Download } from "lucide-react";

const Academics = ({ grades }: any) => {
  const getGradeColor = (grade: any) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-50";
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-50";
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };
  const calculateOverallGrade = () => {
    const subjects: any = Object.values(grades);
    const average =
      subjects.reduce((sum, subject) => sum + subject.total, 0) /
      subjects.length;
    return average.toFixed(1);
  };

  const calculatePosition = () => {
    // Mock class position calculation
    const average = calculateOverallGrade();
    return average >= 85 ? "3rd" : average >= 80 ? "5th" : "8th";
  };

  const calcCaTotal = () => {
    const subjects: any = Object.values(grades);
    const caScores = Object.values(subjects);
    let total = 0;
    caScores.map((scores: any) => {
      total += scores.CA;
    });
    return total;
  };
  calcCaTotal();
  const calcExamTotal = () => {
    const subjects: any = Object.values(grades);
    const caScores = Object.values(subjects);
    let total = 0;
    caScores.map((scores: any) => {
      total += scores.exam;
    });
    return total;
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Academic Performance</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download Report Card
          </button>
        </div>

        <div className="overflow-x-auto border border-[#EAECF0]">
          <table className="w-full text-sm  divide-y divide-[#EAECF0]">
            <thead className="bg-[#F9FAFB]">
              <tr className="">
                <th className="text-left p-4">Subject</th>
                <th className="text-center p-4">CA (30)</th>
                <th className="text-center p-4">Exam (70)</th>
                <th className="text-center p-4">Total (100)</th>
                <th className="text-center p-4">Grade</th>
                <th className="text-center p-4">Position</th>
                <th className="text-center p-4">Remark</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grades).map(([subject, grade]: any) => (
                <tr
                  key={subject}
                  className="border-b border-[#EAECF0] hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{subject}</td>
                  <td className="p-4 text-center">{grade.CA}</td>
                  <td className="p-4 text-center">{grade.exam}</td>
                  <td className="p-4 text-center font-bold">{grade.total}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade.grade)}`}
                    >
                      {grade.grade}
                    </span>
                  </td>
                  <td className="p-4 text-center">{grade.position}</td>
                  <td className="p-4 text-center text-xs">
                    {grade.total >= 80
                      ? "Excellent"
                      : grade.total >= 70
                        ? "Very Good"
                        : grade.total >= 50
                          ? "Good"
                          : "Needs Improvement"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr className="font-semibold">
                <td className="p-4">Overall Average</td>
                <td className="p-4 text-center">{calcCaTotal()}</td>
                <td className="p-4 text-center">{calcExamTotal()}</td>
                <td className="p-4 text-center">{calculateOverallGrade()}%</td>
                <td className="p-4 text-center">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    A
                  </span>
                </td>
                <td className="p-4 text-center">{calculatePosition()}</td>
                <td className="p-4 text-center text-xs">
                  Excellent Performance
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Academics;
