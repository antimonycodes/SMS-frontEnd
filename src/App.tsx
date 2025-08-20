// import { useStore } from "./store";
// import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./Layout/ProtectedRoute";
import DashboardLayout from "./Layout/DashboardLayout";
import Overview from "./pages/Overview";
import Students from "./pages/Students";
import NotFound from "./Layout/NotFound";
import Teachers from "./pages/Teachers";
import Departments from "./pages/Departments";
import Announcements from "./pages/Announcements";
import Holidays from "./pages/Holidays";
import Subject from "./pages/Subject";
import StudentDetails from "./components/Student/StudentDetails";
import Classes from "./pages/Classes";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Promotion from "./pages/Promotion";
import Fees from "./pages/Fees";
import Preview from "./pages/Preview";
import Settings from "./pages/Settings";

function App() {
  // const { count, increment } = useStore();
  // const [isClicked, setIsClicked] = useState(false);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   interface MouseEventWithClient extends MouseEvent {
  //     clientX: number;
  //     clientY: number;
  //   }
  //   const handleMouseMove = (e: MouseEventWithClient) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  // const handleIncrement = () => {
  //   increment();
  //   setIsClicked(true);
  //   setTimeout(() => setIsClicked(false), 600);
  // };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/signin" element={<SignIn />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="overview" />} />
            <Route path="overview" element={<Overview />} />
            <Route path="student" element={<Students />} />
            <Route path="student/:id" element={<StudentDetails />} />
            <Route path="teacher" element={<Teachers />} />
            <Route path="classes" element={<Classes />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="grades" element={<Grades />} />
            <Route path="promotion" element={<Promotion />} />
            <Route path="fee" element={<Fees />} />
            <Route path="department" element={<Departments />} />
            <Route path="announcement" element={<Announcements />} />
            <Route path="holiday" element={<Holidays />} />
            <Route path="subject" element={<Subject />} />
            <Route path="settings" element={<Settings />} />
            <Route path="preview" element={<Preview />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
