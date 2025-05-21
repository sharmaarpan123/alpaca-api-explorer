
import { useAuth } from "@/contexts/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ApiReference from "./pages/ApiReference";
import ApiEndpointPage from "./pages/ApiEndpointPage";
import Layout from "./components/layout/Layout";

const MyRoutes = () => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated , "isAuthenticated")

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
         
           <>
           <Route element={<Layout />}>
             <Route path="/" element={<Index />} />
             {/* <Route path="/api-reference" element={<ApiReference />} /> */}
             <Route
               path="/api/:category/:endpoint"
               element={<ApiEndpointPage />}
             />
           </Route>
           <Route path="/login" element={<Navigate to={"/"} />} />
           <Route path="*" element={<NotFound />} />
         </>
        ) : (
          <>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to={"/login"} />} />
        </>
         
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
