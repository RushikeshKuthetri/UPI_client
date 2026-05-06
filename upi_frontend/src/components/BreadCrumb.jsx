// src/components/Common/BreadCrumb.jsx
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUser, FaExchangeAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { ImFilesEmpty } from "react-icons/im";

const ROUTE_MAP = {
    "dashboard": { label: "Dashboard", icon: MdDashboard },
    "manage-users": { label: "Manage User", icon: FaUser },
    "transaction": { label: "Transaction", icon: FaExchangeAlt },
    "grade-change": { label: "Grade Change" },
    "stoppage-entry": { label: "Stoppage Entry" },
    "meter-reading": { label: "Meter Reading", },
    "process-order-confirm": { label: "Process Order Confirm" },
    "stoppage-alert": { label: "Stoppage Alert", },
    "standby-equipment": { label: "StandBy Equipment", },
    "update-po-bom": { label: "Update PO BOM", },
    "enable-manual-upload": { label: "Enable Manual Upload",  },
    "admin": { label: "Manage Admin", icon: IoSettingsOutline },
    "business-unit": { label: "Business Unit",},
    "plant-details": { label: "Plant Details" },
    "roles": { label: "Roles", },
    "role-menu-mapping": { label: "Role Menu Mapping", },
    "manage-contacts": { label: "Manage Contacts",},
    "manage-sms": { label: "Manage SMS", },
    "reports": { label: "Reports", icon: ImFilesEmpty },
};

export default function BreadCrumb() {
    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(() => {
        // Update pathname when location changes
        const handleLocationChange = () => {
            setPathname(window.location.pathname);
        };

        // Listen for popstate events (back/forward navigation)
        window.addEventListener("popstate", handleLocationChange);

        // For client-side navigation (if using history.pushState or similar)
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        window.history.pushState = function (...args) {
            originalPushState.apply(window.history, args);
            handleLocationChange();
        };

        window.history.replaceState = function (...args) {
            originalReplaceState.apply(window.history, args);
            handleLocationChange();
        };

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
        };
    }, []);

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
        <nav aria-label="breadcrumb" className="flex items-center gap-2 flex-wrap text-sm">

            {/* Home */}
            {/* <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-1 font-medium text-[var(--text-color)]
                   hover:text-[var(--card-border)] transition-colors duration-200
                   focus:outline-none"
      >
        <Home size={14} />
        <span>Home</span>
      </button> */}

            {crumbs.map((crumb, i) => {
                const Icon = crumb.icon;
                return (
                    <div key={i} className="flex items-center gap-2">

                        {/* Separator — same style as reference */}


                        {crumb.isLast ? (
                            // Current page — muted, not clickable
                            <span className="flex items-center gap-1 font-medium text-[var(--card-subtle)]">
                                {Icon && <Icon size={14} />}
                                {crumb.label}
                            </span>
                        ) : (


                            // Ancestor — primary color, clickable
                            <button
                                onClick={() => navigate(crumb.path)}
                                className="flex items-center gap-1 font-medium text-[var(--text-color)]
                           hover:text-[var(--card-border)] transition-colors duration-200
                           focus:outline-none"
                            >
                                {Icon && <Icon size={14} />}
                                {crumb.label}

                                <span className="text-[var(--card-subtle)]">/</span>
                            </button>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}