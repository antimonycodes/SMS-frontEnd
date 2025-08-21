//@ts-nocheck
import { Award, CheckCircle, Star, Target } from "lucide-react";

const StatsCards = ({ studentData }: any) => {
  const grades = studentData.grades;

  const getGradeColor = (grade: any) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-50";
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-50";
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const calculateOverallGrade = () => {
    const subjects: any = Object.values(studentData.grades);
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

  //   console.log(grades);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Average</p>
              <p className="text-2xl font-bold text-green-600">
                {calculateOverallGrade()}%
              </p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Class Position</p>
              <p className="text-2xl font-bold text-blue-600">
                {calculatePosition()}
              </p>
            </div>
            <Award className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Subjects Passed</p>
              <p className="text-2xl font-bold text-purple-600">
                {
                  Object.values(studentData.grades).filter((g) => g.total >= 50)
                    .length
                }
                /{Object.keys(studentData.grades).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-orange-600">
                {studentData.attendance.percentage}%
              </p>
            </div>
            <Star className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
