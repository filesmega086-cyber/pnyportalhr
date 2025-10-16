// src/routes/adminRoutes.jsx
import AdminLayout from "@/layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import { paths } from "../constants/paths";
import AllEmployees from "@/pages/admin/AllEmployees";
import MarkAttendance from "@/pages/admin/MarkAttendance";
import EmployeeLayout from "@/layouts/EmployeeLayout";
import MyAttendance from "@/pages/employee/MyAttendance";
import UserMonthlyReport from "@/pages/reports/UserMonthlyReport";

const employeeRoutes = [
  {
    element: <PrivateRoute allowedRoles={["employee" , "superadmin"]} />,
    children: [
      {
        element: <EmployeeLayout />,
        children: [
          { index: true, element: <MyAttendance /> },
          { path: "user-monthly", element: <UserMonthlyReport/> },
        ],
      },
    ],
  },
];

export default employeeRoutes;
