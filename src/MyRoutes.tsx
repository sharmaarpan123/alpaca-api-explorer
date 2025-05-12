import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ApiReference from "./pages/ApiReference";
import ApiEndpointPage from "./pages/ApiEndpointPage";
import Layout from "./components/layout/Layout";

const MyRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to={"/login"} />} />
          </>
        ) : (
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/api-reference" element={<ApiReference />} />
              <Route
                path="/api/:category/:endpoint"
                element={<ApiEndpointPage />}
              />
            </Route>
            <Route path="/login" element={<Navigate to={"/"} />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
