import { useState } from "react";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageUsers from "./pages/ManageUsers/ManageUsers";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const isAuth = true; 

  return (
    <Layout
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      drawerOpen={drawerOpen}
      setDrawerOpen={setDrawerOpen}
      isAuth={isAuth}
    >
      {/* only the inner content stays here */}
      <div className="h-[80vh] custom-scrollbar px-2 flex flex-col mt-1 
                      bg-[var(--bg-main-container)] mx-2 rounded-2xl shadow-left-drawer-light
                dark:shadow-left-drawer-dark ">
      <div className="flex-1 min-h-0 overflow-y-auto pt-2 pl-1">
          <Routes>
            {/* when app loades it will redirect to dashboard */}
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/manage-users" element={<ManageUsers />} />
            {/* error */}

               {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          
        </div>
      </div>
    </Layout>
  );
}

export default App;

