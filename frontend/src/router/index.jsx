import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import HomePage from "../pages/HomePage";
import WorkspacePage from "../pages/WorkspacePage";
import AlignmentPage from "../pages/AlignmentPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import PhylogenyPage from "../pages/PhylogenyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/workspace",
        element: <WorkspacePage />,
      },
      {
        path: "/alignment",
        element: <AlignmentPage />,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "/phylogeny",
        element: <PhylogenyPage />,
      },
    ],
  },
]);