import { createBrowserRouter } from "react-router";
import { LoginPage } from "./components/shared/LoginPage";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminReports } from "./components/admin/AdminReports";
import { AdminSettings } from "./components/admin/AdminSettings";
import { TechnicalOfficerDashboard } from "./components/technical-officer/TechnicalOfficerDashboard";
import { TechnicalOfficerReports } from "./components/technical-officer/TechnicalOfficerReports";
import { TechnicalOfficerSettings } from "./components/technical-officer/TechnicalOfficerSettings";
import { TeacherDashboard } from "./components/teacher/TeacherDashboard";
import { TeacherSubjects } from "./components/teacher/TeacherSubjects";
import { TeacherClasses } from "./components/teacher/TeacherClasses";
import { TeacherReports } from "./components/teacher/TeacherReports";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { StudentMarksView } from "./components/student/StudentMarksView";
import { StudentReport } from "./components/student/StudentReport";
import { StudyMaterialsView } from "./components/student/StudyMaterialsView";
import { StudentSettings } from "./components/student/StudentSettings";
import { UserManagement } from "./components/shared/UserManagement";
import { ClassManagement } from "./components/shared/ClassManagement";
import { UploadMarks } from "./components/teacher/UploadMarks";
import { UploadStudyMaterials } from "./components/teacher/UploadStudyMaterials";
import { NotFound } from "./components/shared/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/reports",
    Component: AdminReports,
  },
  {
    path: "/admin/settings",
    Component: AdminSettings,
  },
  {
    path: "/technical-officer",
    Component: TechnicalOfficerDashboard,
  },
  {
    path: "/technical-officer/reports",
    Component: TechnicalOfficerReports,
  },
  {
    path: "/technical-officer/settings",
    Component: TechnicalOfficerSettings,
  },
  {
    path: "/teacher",
    Component: TeacherDashboard,
  },
  {
    path: "/teacher/subjects",
    Component: TeacherSubjects,
  },
  {
    path: "/teacher/classes",
    Component: TeacherClasses,
  },
  {
    path: "/teacher/reports",
    Component: TeacherReports,
  },
  {
    path: "/student",
    Component: StudentDashboard,
  },
  {
    path: "/student/marks",
    Component: StudentMarksView,
  },
  {
    path: "/student/report",
    Component: StudentReport,
  },
  {
    path: "/student/materials",
    Component: StudyMaterialsView,
  },
  {
    path: "/student/settings",
    Component: StudentSettings,
  },
  {
    path: "/users",
    Component: UserManagement,
  },
  {
    path: "/classes",
    Component: ClassManagement,
  },
  {
    path: "/upload-marks",
    Component: UploadMarks,
  },
  {
    path: "/upload-materials",
    Component: UploadStudyMaterials,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
