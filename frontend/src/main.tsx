import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./app/themes/DarkTheme";
import { router } from "./app/router/Routes";
import { RouterProvider } from "react-router-dom";
import "./app/layout/index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);
