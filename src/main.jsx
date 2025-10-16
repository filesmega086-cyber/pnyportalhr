import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import router from "./components/router";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  </>
);
