// src/routes/adminRoutes.jsx
import AdminLayout from "@/layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import { paths } from "../constants/paths";
import AllEmployees from "@/pages/admin/AllEmployees";
import MarkAttendance from "@/pages/admin/MarkAttendance";
import MonthlyBranchReport from "@/pages/reports/MonthlyBranchReport";

const adminRoutes = [
  {
    // admin-only gate
    element: <PrivateRoute allowedRoles={["superadmin" , "hr"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <h1>ADMIN</h1> },
          { path:paths.USERS,  element: <AllEmployees/> },
          { path:paths.MARK_ATTENDANCE,  element: <MarkAttendance/> },
          { path:'monthly-report',  element: <MonthlyBranchReport/> },
        ],
      },
    ],
  },
];

export default adminRoutes;
