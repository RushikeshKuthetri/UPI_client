import React from "react";
import LeftDrawer from "./LeftDrawer";
import Header from "./Header";
import Footer from "./Footer";
import BreadCrumb from "./BreadCrumb";
import { Search } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function Layout({ children, collapsed, setCollapsed, drawerOpen, setDrawerOpen, isAuth = true }) {
  return (
    <div className="font-sans h-screen flex flex-col overflow-hidden bg-[var(--bg-color)]">
      <Header />
      <main className="flex-1 min-h-0 flex overflow-hidden text-[var(--text-color)] mt-1">
        {isAuth && (
          <LeftDrawer
            open={drawerOpen}
            setOpen={setDrawerOpen}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        )}
        <div
          className={`flex-1 min-h-0 transition-all duration-300 flex flex-col ${
            isAuth ? (collapsed ? "lg:ml-20 " : "lg:ml-60 ") : "ml-0"
          }`}
        >
          {/* ── Breadcrumb + Search bar ── */}
          {isAuth && (
            <div className="mx-3   flex items-center justify-between shrink-0">
              <BreadCrumb />

              {/* Search */}
              {/* <div className="flex items-center bg-[var(--search-bg)] !border !border-[var(--input-enable-border)] rounded-md px-3 shadow-sm">
                <Search size={16} className="text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none w-[180px] text-sm text-[var(--text-color)] placeholder-[var(--search-placeholder)]"
                />
              </div> */}
            </div>
          )}

          {/* ── Page content ── */}
          <div className="h-full overflow-y-auto ">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}