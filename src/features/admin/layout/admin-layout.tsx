import { NavLink, Outlet } from "react-router-dom";
import { FolderTree, LayoutDashboard, Package } from "lucide-react";
import CatalogLogo from "@/components/shared/brand/catalog-logo";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/products", label: "Products", icon: Package },
] as const;

const AdminLayout = () => {
  return (
    <div className="bg-background relative min-h-svh">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-32 -right-32 size-96 rounded-full blur-3xl" />
        <div className="bg-chart-2/10 absolute -bottom-24 -left-24 size-80 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:gap-8 md:px-6 md:py-8">
        <aside className="md:w-64 md:shrink-0">
          <div className="bg-card/80 sticky top-6 rounded-2xl border p-4 shadow-sm shadow-black/[0.04] backdrop-blur-sm md:p-5">
            <CatalogLogo className="mb-6 px-1" />

            <p className="text-muted-foreground mb-2 px-2 text-xs font-medium uppercase tracking-wider">
              Menu
            </p>
            <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )
                  }
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="border-t mt-6 pt-4">
              <p className="text-muted-foreground px-2 text-xs leading-relaxed">
                API connected at{" "}
                <span className="text-foreground font-mono">localhost:4000</span>
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
