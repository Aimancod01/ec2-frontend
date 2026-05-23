import { NavLink, Outlet } from "react-router-dom";
import { FolderTree, LayoutDashboard, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/products", label: "Products", icon: Package },
] as const;

const AdminLayout = () => {
  return (
    <div className="bg-background min-h-svh">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:gap-8 md:px-6 md:py-8">
        <aside className="md:w-56 md:shrink-0">
          <div className="mb-6 px-2">
            <p className="text-lg font-semibold tracking-tight">Catalog</p>
            <p className="text-muted-foreground text-xs">Manage categories & products</p>
          </div>
          <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
