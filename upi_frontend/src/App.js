// import logo from './logo.svg';
// import './App.css';

import { useState } from "react";
import Layout from "./components/Layout";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const isAuth = true; // Change this based on your auth logic

  return (
    <Layout
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      drawerOpen={drawerOpen}
      setDrawerOpen={setDrawerOpen}
      isAuth={isAuth}
    >
      {/* only the inner content stays here */}
      <div className="h-[80vh] custom-scrollbar px-2.5 flex flex-col mt-1 
                      bg-[var(--bg-main-container)] mx-3 rounded-2xl shadow-left-drawer-light
                dark:shadow-left-drawer-dark ">
        <div className="flex-1 min-h-0 overflow-y-auto">
          
        </div>
      </div>
    </Layout>
  );
}

export default App;

