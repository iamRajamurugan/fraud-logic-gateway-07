
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  ChevronLeft, 
  ChevronRight,
  Home, 
  LucideIcon, 
  ScrollText, 
  TestTube2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Rules Management",
    href: "/rules",
    icon: ScrollText,
  },
  {
    title: "Test Transactions",
    href: "/testing",
    icon: TestTube2,
  },
  {
    title: "Risk Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 transition-all duration-300 ease-in-out z-30 flex flex-col bg-white text-sidebar-foreground border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/58817b3e-3865-4da7-bfd5-151640f058bd.png" 
              alt="SabPaisa" 
              className="h-8" 
            />
          </div>
        )}
        {collapsed && (
          <img 
            src="/lovable-uploads/58817b3e-3865-4da7-bfd5-151640f058bd.png" 
            alt="SabPaisa" 
            className="h-6 mx-auto" 
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent ml-auto"
          onClick={toggleCollapse}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2.5 rounded-md transition-colors duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    collapsed && "justify-center"
                  )
                }
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border flex items-center">
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
              <span className="font-semibold text-sm text-white">SP</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">SabPaisa User</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">Active</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center mx-auto">
            <span className="font-semibold text-sm text-white">SP</span>
          </div>
        )}
      </div>
    </aside>
  );
}
