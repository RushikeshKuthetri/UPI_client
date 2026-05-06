import { useState } from "react";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import GradeChange from "./pages/Transaction/GradeChange";
import StoppageEntry from "./pages/Transaction/StoppageEntry";
import UpdatePoBOM from "./pages/Transaction/UpdatePoBOM";
import MeterReading from "./pages/Transaction/MeterReading";
import ProcessOrderConfirm from "./pages/Transaction/ProcessOrderConfirm";
import EnableManualUpload from "./pages/Transaction/EnableManualUpload";
import BusinessUnit from "./pages/ManageAdmin/BusinessUnit";
import PlantDetails from "./pages/ManageAdmin/PlantDetails";
import ManageRoles from "./pages/ManageAdmin/ManageRoles";
import RoleMenuMapping from "./pages/ManageAdmin/RoleMenuMapping";
import ManageContacts from "./pages/ManageAdmin/ManageContacts";
import ManageSMS from "./pages/ManageAdmin/ManageSMS";
import StoppageAlert from "./pages/Transaction/StoppageAlert";

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
            <Route path="/transaction/grade-change" element={<GradeChange />} />
            <Route path="/transaction/stoppage-entry" element={<StoppageEntry />} />
            <Route path="/transaction/meter-reading" element={<MeterReading />} />
            <Route path="/transaction/process-order-confirm" element={<ProcessOrderConfirm />} />
            <Route path="/transaction/stoppage-alert" element={<StoppageAlert/>} />

            <Route path="/transaction/update-po-bom" element={<UpdatePoBOM />} />
            <Route path="/transaction/enable-manual-upload" element={<EnableManualUpload />} />
             <Route path="/admin/business-unit" element={<BusinessUnit />} />
              <Route path="/admin/plant-details" element={<PlantDetails />} />
              <Route path="/admin/roles" element={<ManageRoles />} />
              <Route path="/admin/role-menu-mapping" element={<RoleMenuMapping />} />
              <Route path="/admin/manage-contacts" element={<ManageContacts />} />
               <Route path="/admin/manage-sms" element={<ManageSMS />} />

            {/* error */}

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>

        </div>
      </div>
    </Layout>
  );
}

export default App;

