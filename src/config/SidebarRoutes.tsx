// src/config/sidebarRoutes.ts
import {
  DollarSign,
  BedDouble,
  Users2,
  LayoutDashboard,
  SendToBack,
  BookOpenText,
  Megaphone,
  ReceiptSwissFranc,
  GraduationCap,
  BookOpen,
  Calendar,
  UserCheck,
  ClipboardList,
  ArrowUp,
  Settings2,
} from "lucide-react";

import type { ReactElement } from "react";
import { getImageSrc } from "../lib/utils";

export interface SidebarRoute {
  name: string;
  path: string;
  icon: string | ReactElement;
  activeIcon: string | ReactElement;
  children?: SidebarRoute[];
}

export const sidebarRoutes: Record<string, SidebarRoute[]> = {
  admin: [
    {
      name: "Overview",
      path: "/dashboard/overview",
      icon: <LayoutDashboard />,
      activeIcon: <LayoutDashboard />,
    },
    {
      name: "Student",
      path: "/dashboard/student",
      icon: <Users2 />,
      activeIcon: <Users2 />,
    },
    {
      name: "Teacher",
      path: "/dashboard/teacher",
      icon: <GraduationCap />,
      activeIcon: <GraduationCap className=" text-white" />,
    },
    {
      name: "Classes",
      path: "/dashboard/classes",
      icon: <BookOpen />,
      activeIcon: <BookOpen />,
    },

    {
      name: "Timetable",
      path: "/dashboard/timetable",
      icon: <Calendar />,
      activeIcon: <Calendar />,
    },
    {
      name: "Attendance",
      path: "/dashboard/attendance",
      icon: <UserCheck />,
      activeIcon: <UserCheck />,
    },
    {
      name: "Grades",
      path: "/dashboard/grades",
      icon: <ClipboardList />,
      activeIcon: <ClipboardList />,
    },
    {
      name: "Promotion",
      path: "/dashboard/promotion",
      icon: <ArrowUp />,
      activeIcon: <ArrowUp />,
    },
    {
      name: "Fee",
      path: "/dashboard/fee",
      icon: <DollarSign />,
      activeIcon: <DollarSign />,
    },
    {
      name: "Subject",
      path: "/dashboard/subject",
      icon: <BookOpenText />,
      activeIcon: <BookOpenText />,
    },

    {
      name: "Announcement",
      path: "/dashboard/announcement",
      icon: <Megaphone />,
      activeIcon: <Megaphone />,
    },
    {
      name: "Holiday",
      path: "/dashboard/holiday",
      icon: <ReceiptSwissFranc />,
      activeIcon: <ReceiptSwissFranc />,
    },

    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings2 />,
      activeIcon: <Settings2 />,
    },
  ],
  teacher: [
    {
      name: "Overview",
      path: "/dashboard/overview",
      icon: getImageSrc("darkdashboarddark.svg"),
      activeIcon: getImageSrc("overviewicon-active.svg"),
    },
    {
      name: "Student",
      path: "/dashboard/student",
      icon: getImageSrc("patientsicon.svg"),
      activeIcon: getImageSrc("patientsWhite.svg"),
    },
    {
      name: "Teacher",
      path: "/dashboard/teacher",
      icon: <BedDouble />,
      activeIcon: <BedDouble className=" text-white" />,
    },
    {
      name: "Department",
      path: "/dashboard/department",
      icon: getImageSrc("front-desk.svg"),
      activeIcon: getImageSrc("front-desk.svg"),
    },
    {
      name: "Subject",
      path: "/dashboard/subject",
      icon: getImageSrc("doctoricon.svg"),
      activeIcon: getImageSrc("doctorsWhite.svg"),
    },
    {
      name: "Announcement",
      path: "/dashboard/announcement",
      icon: getImageSrc("consultanticon.svg"),
      activeIcon: getImageSrc("consultantWhite.svg"),
    },
    {
      name: "Holiday",
      path: "/dashboard/holiday",
      icon: getImageSrc("nursesicon.svg"),
      activeIcon: getImageSrc("nurseWhite.svg"),
    },

    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: getImageSrc("profile.svg"),
      activeIcon: getImageSrc("profile.svg"),
    },
  ],
  student: [
    {
      name: "Overview",
      path: "/dashboard/overview",
      icon: <LayoutDashboard />,
      activeIcon: getImageSrc("overviewicon-active.svg"),
    },
    {
      name: "Student",
      path: "/dashboard/student",
      icon: <Users2 />,
      activeIcon: getImageSrc("patientsWhite.svg"),
    },
    {
      name: "Teacher",
      path: "/dashboard/teacher",
      icon: <Users2 />,

      activeIcon: <BedDouble className=" text-white" />,
    },
    {
      name: "Department",
      path: "/dashboard/department",
      icon: <SendToBack />,
      activeIcon: getImageSrc("front-desk.svg"),
    },
    {
      name: "Subject",
      path: "/dashboard/subject",
      icon: getImageSrc("doctoricon.svg"),
      activeIcon: getImageSrc("doctorsWhite.svg"),
    },
    {
      name: "Announcement",
      path: "/dashboard/announcement",
      icon: getImageSrc("consultanticon.svg"),
      activeIcon: getImageSrc("consultantWhite.svg"),
    },
    {
      name: "Holiday",
      path: "/dashboard/holiday",
      icon: getImageSrc("nursesicon.svg"),
      activeIcon: getImageSrc("nurseWhite.svg"),
    },

    {
      name: "Settings",
      path: "/dashboard/profile",
      icon: getImageSrc("profile.svg"),
      activeIcon: getImageSrc("profile.svg"),
    },
  ],
};
