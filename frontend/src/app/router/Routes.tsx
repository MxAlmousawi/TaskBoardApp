import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../features/home/HomePage";
import LogsPage from "../features/historyLogs/LogsPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      { path: "/logs", element: <LogsPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
