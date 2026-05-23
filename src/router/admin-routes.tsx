import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "@/features/admin/layout/admin-layout";

const Dashboard = lazy(() => import("@/pages/admin/dashboard"));
const Categories = lazy(() => import("@/pages/admin/catalog/categories"));
const Products = lazy(() => import("@/pages/admin/catalog/products"));
const Profile = lazy(() => import("@/pages/admin/settings/profile"));
const Notifications = lazy(() => import("@/pages/admin/settings/notifications"));

export const ADMIN_ROUTES = [
  {
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "settings",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" replace />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
];
