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
import StudentDetails from "./components/Admin/Student/StudentDetails";
import Classes from "./pages/Classes";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Promotion from "./pages/Promotion";
import Fees from "./pages/Fees";
import Preview from "./pages/Preview";
import Settings from "./pages/Settings";
import Assignments from "./pages/Assignments";
import AssignmentDetails from "./pages/AssignmentDetails";
import Grading from "./pages/Grading";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import SchoolLeadershipPage from "./pages/Leadership";
import TeacherDetailsPage from "./pages/TeacherDetails";
import ClassroomDetailPage from "./pages/ClassroomDetails";
import { useAuth } from "./hooks/useAuth";
import { Toaster } from "sonner";

function App() {
  const { restoring } = useAuth(); // This handles all auth initialization

  if (restoring) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" richColors />
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
            <Route path="teacher/:id" element={<TeacherDetailsPage />} />

            <Route path="classes" element={<Classes />} />
            <Route path="class/:id" element={<ClassroomDetailPage />} />

            <Route path="assignment" element={<Assignments />} />
            <Route
              path="assignment/:id/submissions"
              element={<AssignmentDetails />}
            />
            <Route
              path="assignment/:id/submissions/grade/:id"
              element={<Grading />}
            />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetails />} />
            <Route path="blog/create" element={<CreateBlog />} />
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
            <Route path="leadership" element={<SchoolLeadershipPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
