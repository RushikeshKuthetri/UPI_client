// src/components/Common/BreadCrumb.jsx
import { Home, ChevronRight } from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { FaUser, FaExchangeAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { ImFilesEmpty } from "react-icons/im";

const ROUTE_MAP = {
  "dashboard":        { label: "Dashboard",            icon: MdDashboard },
  "manage-user":      { label: "Manage User",          icon: FaUser },
  "transaction":      { label: "Transaction",          icon: FaExchangeAlt },
  "grade-change":     { label: "Grade Change",         icon: FaExchangeAlt },
  "stoppage-entry":   { label: "Stoppage Entry",       icon: FaExchangeAlt },
  "meter-reading":    { label: "Meter Reading",        icon: FaExchangeAlt },
  "process-order":    { label: "Process Order Confirm",icon: FaExchangeAlt },
  "stoppage-alert":   { label: "Stoppage Alert",       icon: FaExchangeAlt },
  "standby-equipment":{ label: "StandBy Equipment",    icon: FaExchangeAlt },
  "update-po-bom":    { label: "Update PO BOM",        icon: FaExchangeAlt },
  "manual-upload":    { label: "Enable Manual Upload", icon: FaExchangeAlt },
  "admin":            { label: "Manage Admin",         icon: IoSettingsOutline },
  "business-unit":    { label: "Business Unit",        icon: IoSettingsOutline },
  "plant-details":    { label: "Plant Details",        icon: IoSettingsOutline },
  "roles":            { label: "Roles",                icon: IoSettingsOutline },
  "role-menu-mapping":{ label: "Role Menu Mapping",    icon: IoSettingsOutline },
  "manage-contacts":  { label: "Manage Contacts",      icon: IoSettingsOutline },
  "manage-sms":       { label: "Manage SMS",           icon: IoSettingsOutline },
  "reports":          { label: "Reports",              icon: ImFilesEmpty },
};

export default function BreadCrumb() {
  const pathname = window.location.pathname;
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => ({
    ...(ROUTE_MAP[seg] || { label: seg, icon: null }),
    path: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  const navigate = (path) => {
    window.location.href = path;
  };

  return (
    <nav aria-label="breadcrumb" className="flex items-center flex-wrap text-sm">

      {/* Home */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-1 font-medium text-[var(--text-color)] hover:text-[var(--card-border)] transition-colors duration-200 focus:outline-none"
      >
        <Home size={14} />
        <span>Home</span>
      </button>

      {crumbs.map((crumb, i) => {
        const Icon = crumb.icon;
        return (
          <div key={i} className="flex items-center">

            {/* Separator */}
            <ChevronRight
              size={14}
              className="text-[var(--leftdrawer-text)] opacity-40 mx-0.5"
            />

            {crumb.isLast ? (
              // Current page — icon + label, not clickable
              <span className="flex items-center gap-1.5 px-2 py-1 text-sm
                               font-medium text-[var(--text-color)]">
                {Icon && <Icon size={14} />}
                {crumb.label}
              </span>
            ) : (
              // Ancestor — icon + label, clickable
              <button
                onClick={() => navigate(crumb.path)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm
                           text-[var(--leftdrawer-text)]
                           transition-all duration-150"
              >
                {Icon && <Icon size={14} />}
                {crumb.label}
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
}