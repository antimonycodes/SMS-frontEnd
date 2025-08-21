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
  UserCog,
  Newspaper,
  BookAlert,
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
      name: "Blog",
      path: "/dashboard/blog",
      icon: <Newspaper />,
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
      name: "Classes",
      path: "/dashboard/classes",
      icon: <BookOpen />,
      activeIcon: <BookOpen />,
    },
    {
      name: "Assignment",
      path: "/dashboard/assignment",
      icon: <BookAlert />,
      activeIcon: <BookAlert />,
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
      name: "Announcement",
      path: "/dashboard/announcement",
      icon: <Megaphone />,
      activeIcon: <Megaphone />,
    },
    {
      name: "Blog",
      path: "/dashboard/blog",
      icon: <Newspaper />,
      activeIcon: <Megaphone />,
    },
    {
      name: "Holiday",
      path: "/dashboard/holiday",
      icon: <ReceiptSwissFranc />,
      activeIcon: <ReceiptSwissFranc />,
    },

    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <UserCog />,
      activeIcon: <UserCog />,
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
      name: "Assignment",
      path: "/dashboard/assignment",
      icon: <BookAlert />,
      activeIcon: <BookAlert />,
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
      name: "Fee",
      path: "/dashboard/fee",
      icon: <DollarSign />,
      activeIcon: <DollarSign />,
    },
    {
      name: "Announcement",
      path: "/dashboard/announcement",
      icon: <Megaphone />,
      activeIcon: <Megaphone />,
    },
    {
      name: "Blog",
      path: "/dashboard/blog",
      icon: <Newspaper />,
      activeIcon: <Megaphone />,
    },
    {
      name: "Holiday",
      path: "/dashboard/holiday",
      icon: <ReceiptSwissFranc />,
      activeIcon: <ReceiptSwissFranc />,
    },

    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <UserCog />,
      activeIcon: <UserCog />,
    },
  ],
};
