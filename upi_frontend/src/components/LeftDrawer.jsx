 
import { useState, useEffect, useRef } from "react";
import {  useNavigate, useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import {  FaBars, FaTimes } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import { MdOutlineDashboard } from "react-icons/md";
import {  FaExchangeAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { ChevronDown, ChevronRight, Moon, PanelLeftClose, PanelRightClose, Power, Sun } from "lucide-react";

// import useToken from "../../utils/UseToken/useToken";
 
const menuItems = [
    {
        name: "Dashboard",
        icon: MdOutlineDashboard,
        path: "/dashboard",
        moduleKey: "",
        openInNewTab: false,
    },
    {
        name: "Manage User",
        icon: FaRegUser ,
        path: "/manage-users",
        moduleKey: "",
        openInNewTab: false,
    },
    {
        name: "Transaction",
        icon: FaExchangeAlt,
        path: "",
        moduleKey: "",
        openInNewTab: false,
        hasDropdown: true,
        children: [
            { name: "Grade Change",           path: "/transaction/grade-change",        openInNewTab: false },
            { name: "Stoppage Entry",         path: "/transaction/stoppage-entry",      openInNewTab: false },
            { name: "Meter Reading",          path: "/transaction/meter-reading",       openInNewTab: false },
            { name: "Process Order Confirm",  path: "/transaction/process-order",       openInNewTab: false },
            { name: "Stoppage Alert",         path: "/transaction/stoppage-alert",      openInNewTab: false },
            { name: "StandBy Equipment",      path: "/transaction/standby-equipment",   openInNewTab: false },
            { name: "Update PO BOM",          path: "/transaction/update-po-bom",       openInNewTab: false },
            { name: "Enable Manual Upload",   path: "/transaction/manual-upload",       openInNewTab: false },
        ],
    },
    {
        name: "Manage Admin",
        icon: IoSettingsOutline ,
        path: "",
        moduleKey: "",
        openInNewTab: false,
        hasDropdown: true,
        children: [
            { name: "Business Unit",      path: "/admin/business-unit",      roles: ["admin", "super_admin"] },
            { name: "Plant Details",      path: "/admin/plant-details",      roles: ["admin", "super_admin"] },
            { name: "Roles",              path: "/admin/roles",              roles: ["admin", "super_admin"] },
            { name: "Role Menu Mapping",  path: "/admin/role-menu-mapping",  roles: ["admin", "super_admin"] },
            { name: "Manage Contacts",    path: "/admin/manage-contacts",    roles: ["admin", "super_admin"] },
            { name: "Manage SMS",         path: "/admin/manage-sms",         roles: ["admin", "super_admin"] },
        ],
    },
    {
        name: "Reports",
        icon: ImFilesEmpty,
        path: "/reports",
        moduleKey: "",
        openInNewTab: false,
    },
];
 
// ── Tree connector dimensions ─────────────────────────────────────
const SPINE_X = 8;    // x-position of the vertical part of the L
const ITEM_H = 32;   // height of each item row
const LINE_W = 1.5;
const RADIUS = 10;    // corner radius of the L-curve
const SVG_W = 20;   // width of the connector SVG
 
/**
 * TreeConnector
 *
 * isLast = true  → L-curve (vertical line down to midY then curve right)
 * isLast = false → T-junction (full vertical spine + horizontal branch at midY)
 */
function TreeConnector({ lineColor, isLast }) {
    const midY = ITEM_H / 2;
    const curveStartY = midY - RADIUS;
 
    return (
        <svg
            width={SVG_W}
            height={ITEM_H}
            viewBox={`0 0 ${SVG_W} ${ITEM_H}`}
            className="shrink-0"
            fill="none"
        >
            {isLast ? (
                /* Last item: L-curve only */
                <path
                    d={`
                        M ${SPINE_X} 0
                        L ${SPINE_X} ${curveStartY}
                        Q ${SPINE_X} ${midY} ${SPINE_X + RADIUS} ${midY}
                        L ${SVG_W} ${midY}
                    `}
                    stroke={lineColor}
                    strokeWidth={LINE_W}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ) : (
                <>
                    {/* Vertical spine full height */}
                    <line
                        x1={SPINE_X} y1={0}
                        x2={SPINE_X} y2={ITEM_H}
                        stroke={lineColor}
                        strokeWidth={LINE_W}
                        strokeLinecap="round"
                    />
                    {/* Same L-curve as isLast but spine continues below */}
                    <path
                        d={`
                            M ${SPINE_X} ${curveStartY}
                            Q ${SPINE_X} ${midY} ${SPINE_X + RADIUS} ${midY}
                            L ${SVG_W} ${midY}
                        `}
                        stroke={lineColor}
                        strokeWidth={LINE_W}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </>
            )}
        </svg>
    );
}
 
// ── Add this component above LeftDrawer ──────────────────────────────────────
function Tooltip({ label, childItems, visible, anchorRef }) {
    if (!visible) return null;
 
    const rect = anchorRef?.current?.getBoundingClientRect();
    if (!rect) return null;
    const tooltipTop = (rect.top - 65) + window.scrollY + rect.height / 2;
    const tooltipLeft = rect.right + 10;
 
    return (
        <div
            style={{
                position: "fixed",
                left: tooltipLeft,
                top: tooltipTop,
                transform: "translateY(-50%)",   // ✅ yahi center karta hai
                zIndex: 99999,
                pointerEvents: "none",
            }}
        >
            {/* Arrow pointing left */}
            <div
                // style={{
                //     position: "absolute",
                //     right: "100%",
                //     top: "50%",
                //     transform: "translateY(-50%)",
                //     width: 0,
                //     height: 0,
                //     borderTop: "6px solid transparent",
                //     borderBottom: "6px solid transparent",
                //     borderRight: "6px solid var(--bg-leftdrawer, #fff)",
                //     filter: "drop-shadow(-1px 0 0 rgba(0,0,0,0.08))",
                // }}
            />
            <div
                className="bg-[var(--bg-leftdrawer)] !border !border-[color:var(--left-drawer-footer-border)] rounded-xl shadow-md "
            // style={{ minWidth: 125 }}
            >
                {/* Title */}
                <div className="px-2.5 py-2 text-sm font-medium text-[var(--text-color)] whitespace-nowrap overflow-hidden text-ellipsis">
                    {label}
                </div>
 
                {/* Children list */}
                {/* {childItems?.length > 0 && (
                    <>
                        <div className="mx-3 border-t border-[color:var(--left-drawer-footer-border)]" />
                        <div className="px-3 py-2 flex flex-col gap-1">
                            {childItems.map((child, i) => (
                                <span
                                    key={i}
                                    className="text-xs text-[var(--leftdrawer-text)] opacity-75 whitespace-nowrap overflow-hidden text-ellipsis"
                                >
                                    {child.name}
                                </span>
                            ))}
                        </div>
                    </>
                )} */}
            </div>
        </div>
    );
}
 
 
 
export default function LeftDrawer({ open, setOpen, collapsed, setCollapsed }) {
    const [theme, setTheme] = useState("light");
    const [mounted, setMounted] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState(() => {
        try {
            const saved = localStorage.getItem("openDropdowns");
            return saved ? JSON.parse(saved) : {};
        } catch (err) {
            return {};
        }
    });
    const itemRefs = useRef({});
    const menuContainerRef = useRef(null);
    const location = useLocation()

  const currentPath = location.pathname
    // const { token, setToken } = useToken();
    const mobileOpen = open;
    const setMobileOpen = setOpen;
    const modules = JSON.parse(localStorage.getItem("modules")) || [];
    // const pathname = useLocation();
    const navigate = useNavigate();
    // Inside LeftDrawer, alongside other useState declarations:
    const [hoveredItem, setHoveredItem] = useState(null);
 
    const lineColor = theme === "dark" ? "#7E8383" : "#9FACAC";
 
    useEffect(() => {
        localStorage.setItem("openDropdowns", JSON.stringify(openDropdowns));
    }, [openDropdowns]);
 
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        }
    }, []);
 
    const scrollToItem = (name, align = "end") => {
        const el = itemRefs.current[name];
        const container = menuContainerRef.current;
 
        if (!el || !container) return;
 
        const containerRect = container.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const relativeTop = elRect.top - containerRect.top + container.scrollTop;
 
        let targetTop;
        if (align === "center") {
            targetTop = relativeTop - container.clientHeight / 2 + elRect.height / 2;
        } else if (align === "start") {
            targetTop = relativeTop - 120;
        } else {
            targetTop = relativeTop - container.clientHeight + elRect.height + 24;
        }
 
        container.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth",
        });
    };
 
 
    if (!mounted) return null;
 
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };
 
    const toggleDropdown = (key) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
 
    const isDropdownOpen = (key) => !!openDropdowns[key];
 
 
    // const handleNavigation = (item) => {
    //     if (!item.path) return;
    //     if (item.name === "Trends") {
    //         localStorage.setItem("collapsed", "true");
    //         // setCollapsed(); // since your toggle function flips state
    //     }
    //     if (item.openInNewTab) {
    //         const fullUrl = item.path.startsWith("http")
    //             ? item.path
    //             : `${window.location.origin}${item.path}`;
 
    //         window.open(fullUrl, "_blank", "noopener,noreferrer");
    //     } else {
    //         const fullUrl = item.path.startsWith("http")
    //             ? item.path
    //             : `${window.location.origin}${item.path}`;
 
    //         window.location.href = fullUrl;   // 🔥 Forces full reload
    //     }
 
    //     setMobileOpen(false);
    // };
 
    const handleNavigation = (item) => {
  if (!item.path) return

  if (item.openInNewTab) {
    const fullUrl = item.path.startsWith('http')
      ? item.path
      : `${window.location.origin}${item.path}`
    window.open(fullUrl, '_blank', 'noopener,noreferrer')
  } else {
    navigate(item.path)  // 👈 React Router navigation, no reload
  }

  setMobileOpen(false)
}
 
 
    // Added to show the lefdrawer based on Module access and Admin tile based admin and superadmin access
    // Token/role logic removed for testing - show all tabs
    const role = "admin"; // Default role for development
    // Initialize modules with default modules if empty
    const modulesToUse = modules.length > 0 ? modules : ["Mimics", "Admin"];
    const filteredMenu = menuItems
        .filter((item) => {
            if (item.moduleKey === "Admin") return true;
            if (item.moduleKey && !modulesToUse?.includes(item.moduleKey)) {
                return false;
            }
            return true;
        })
        .map((item) => {
            if (!item.children) return item;
            let filteredChildren = item.children;
            if (item.moduleKey === "Admin") {
                // Admin filtering: show all children (token logic removed)
                filteredChildren = item.children;
            } else {
                // Apply module filtering for other sections
                filteredChildren = item.children.filter(
                    (child) => !child.moduleKey || modulesToUse?.includes(child.moduleKey)
                );
            }
            return { ...item, children: filteredChildren };
        })
        .filter((item) => {
            // remove parent if no children remain
            if (item.children && item.children.length === 0) return false;
            return true;
        });
 
 
 
    return (
        <>
            {/* MOBILE HAMBURGER */}
            {!mobileOpen && (
                <button
                    className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-[var(--bg-leftdrawer)] shadow"
                    onClick={() => setMobileOpen(true)}
                >
                    <FaBars size={20} />
                </button>
            )}
 
            {/* BACKDROP */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
 
            {/* SIDEBAR */}
            <div className={`
                fixed top-18 left-0 z-40 mt-2
                 h-[calc(100dvh-95px)]
                flex flex-col
                rounded-r-3xl
                bg-[var(--bg-leftdrawer)]
                shadow-left-drawer-light
                dark:shadow-left-drawer-dark
                transition-all duration-300
                  ${collapsed ? "lg:w-20 overflow-visible" : "lg:w-60 overflow-hidden"}
                w-60
                ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `}>
 
                {/* MOBILE CLOSE BUTTON */}
                <div className="lg:hidden flex justify-end pt-3 pr-3 -mb-2">
                    <button onClick={() => setMobileOpen(false)}>
                        <FaTimes size={20} className="text-[var(--text-color)]" />
                    </button>
                </div>
 
                {/* MENU */}
                <div className={`flex-1 flex flex-col gap-1 mt-2 min-h-0 ${collapsed ? "px-1" : "px-3"}`}>
                    <div ref={menuContainerRef} className="flex-1 overflow-y-auto flex flex-col gap-1">
                        {filteredMenu.map((item, index) => {
                            const Icon = item.icon;
                            const hasChildren = item.hasDropdown && item.children?.length > 0;
                            const dropdownOpen = isDropdownOpen(item.name);
                            // Paths that have their own dedicated nav items (should NOT activate Mimics)
                        const MIMICS_EXCLUDED_SUBPATHS = [
                            "/mimics/viewtrends",
                            "/mimics/chartspage",
                            "/mimics/help",
                        ];

                        const isActive =
                            item.path &&
                            (currentPath === item.path ||
                                (item.path === "/mimics" &&
                                    currentPath.startsWith("/mimics") &&
                                    !MIMICS_EXCLUDED_SUBPATHS.some(p => currentPath.startsWith(p))) ||
                                (item.path === "/mimics" && currentPath === "/mimics/dashboard")
                            );
 
 
                            return (
                                <div key={index}>
 
                                    {/* ── PARENT ITEM ── */}
                                    <div
                                        className="relative"   // 👈 needed for tooltip absolute positioning
 
                                    >
                                        <div
                                            ref={(el) => (itemRefs.current[item.name] = el)}
                                            onMouseEnter={() => setHoveredItem(item.name)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                             className={`flex items-center py-2 px-3 rounded-xl cursor-pointer transition-all duration-200
    ${collapsed ? "justify-center" : "gap-4"}
    ${isActive
                                            ? "bg-[var(--left-drawer-active-tab)] text-black font-semibold shadow-md"
                                            : "text-[var(--leftdrawer-text)] hover:bg-[var(--left-drawer-active-tab)] hover:text-black"
                                        }`}
                                            // onClick={() => {
                                            //     if (hasChildren) toggleDropdown(item.name);
                                            //     else handleNavigation(item);
                                            // }}
                                            onClick={() => {
                                                if (hasChildren) {
                                                    if (collapsed) {
                                                        setCollapsed(false);
                                                    }
                                                    toggleDropdown(item.name);
                                                } else {
                                                    handleNavigation(item);
                                                }
                                            }}
 
                                        >
                                            <Icon size={22} />
                                            {!collapsed && (
                                                <>
                                                    <span className="text-sm font-medium flex-1">{item.name}</span>
                                                    {hasChildren && (
                                                        <span className="text-xs">
                                                            {dropdownOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <Tooltip
                                            label={item.name}
                                            childItems={hasChildren ? item.children : null}
                                            visible={collapsed && hoveredItem === item.name}
                                            anchorRef={{ current: itemRefs.current[item.name] }}
                                        />
                                    </div>
 
 
                                    {/* ── LEVEL 1 CHILDREN ── */}
                                    {hasChildren && dropdownOpen && !collapsed && (
                                        <div className="ml-[34px] flex flex-col">
                                            {item.children.map((child, childIndex) => {
                                                const hasNested = child.hasDropdown && child.children?.length > 0;
                                                const nestedKey = `${item.name}_${child.name}`;
                                                const nestedOpen = isDropdownOpen(nestedKey);
                                                const isLast = childIndex === item.children.length - 1;
                                                      const isChildActive = currentPath === child.path;
 
                                                return (
                                                    <div key={childIndex} className="flex flex-col">
 
                                                        {/* CHILD ROW */}
                                                        <div
                                                            className="flex items-center cursor-pointer"
                                                            style={{ height: ITEM_H }}
                                                            onClick={() => {
                                                                if (hasNested) toggleDropdown(nestedKey);
                                                                else handleNavigation(child);
                                                            }}
                                                        >
                                                            <TreeConnector lineColor={lineColor} isLast={isLast} />
 
                                                            <div className={`flex-1 flex items-center py-[6.4px] px-2 rounded-lg transition-all text-sm min-w-0 gap-1
                                                                         ${isChildActive
                                                                ? "bg-[var(--left-drawer-active-tab)] text-[#111111] font-semibold"
                                                                : "text-[var(--text-color)] hover:bg-[var(--left-drawer-active-tab)] hover:text-[#111111]"
                                                            }`}>
                                                                <span className="flex-1 truncate">{child.name}</span>
                                                                {hasNested && (
                                                                    <span className="ml-auto shrink-0">
                                                                        {nestedOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
 
                                                        {/* ── LEVEL 2 CHILDREN ── */}
                                                        {/* ── LEVEL 2 CHILDREN ── */}
                                                        {hasNested && nestedOpen && (
                                                            <div className="flex flex-col relative" style={{ marginLeft: SVG_W }}>
                                                                {/* Connecting line sirf tab jab isLast FALSE ho */}
                                                                {!isLast && (
                                                                    <div
                                                                        style={{
                                                                            position: "absolute",
                                                                            left: -SVG_W + SPINE_X,
                                                                            top: 0,
                                                                            bottom: 0,
                                                                            width: LINE_W,
                                                                            backgroundColor: lineColor,
                                                                        }}
                                                                    />
                                                                )}
                                                                {child.children.map((grandchild, gcIndex) => {
                                                                    const gcIsLast = gcIndex === child.children.length - 1;
                                                                    const isGrandchildActive = currentPath === grandchild.path;
                                                                    return (
                                                                        <div
                                                                            key={gcIndex}
                                                                            className="flex items-center cursor-pointer"
                                                                            style={{ height: ITEM_H }}
                                                                            onClick={() => handleNavigation(grandchild)}
                                                                        >
                                                                            <TreeConnector lineColor={lineColor} isLast={gcIsLast} />
                                                                               <div className={`flex-1 py-[6.4px] px-2 rounded-lg transition-all text-sm truncate
                                                                                ${isGrandchildActive
                                                                                ? "bg-[var(--left-drawer-active-tab)] text-[#111111] font-semibold"
                                                                                : "text-[var(--text-color)] hover:bg-[var(--left-drawer-active-tab)] hover:text-[#111111]"
                                                                            }`}>
                                                                                {grandchild.name}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
 
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
 
                                </div>
                            );
                        })}
                    </div>
                </div>
 
                {/* FOOTER */}
                <div className="px-3 pb-2">
                    <div className={`
                        ${collapsed ? "flex flex-col items-center gap-5 py-2" : "flex items-center justify-evenly lg:justify-between px-9 py-2"}
                        rounded-xl !border
                        bg-[var(--bg-leftdrawer-footer)]
                        border-[color:var(--left-drawer-footer-border)]
                        shadow-[0_2px_6px_rgba(0,0,0,0.05)]
                        backdrop-blur-sm
                        transition-all duration-300
                    `}>
                        {/* Theme */}
                        <button onClick={toggleTheme} className="focus:outline-none focus:ring-0 outline-none">
                            {theme === "dark" ? (
                                <Sun size={20} className="cursor-pointer text-yellow-400" />
                            ) : (
                                <Moon size={20} className="cursor-pointer text-[var(--text-color)]" />
                            )}
                        </button>
 
                        {/* Collapse */}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden lg:block cursor-pointer text-[var(--text-color)] focus:outline-none focus:ring-0 outline-none"
                        >
                            {collapsed ? <PanelRightClose size={20} /> : <PanelLeftClose size={20} />}
                        </button>
 
                        {/* Power */}
                        <Power size={20} className="cursor-pointer text-[var(--text-color)] focus:outline-none focus:ring-0 outline-none" />
                    </div>
                </div>
            </div>
        </>
    );
}
 
