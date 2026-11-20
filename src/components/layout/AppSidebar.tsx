import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListTodo, Plus, LogOut, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Demandas", href: "/demandas", icon: ListTodo },
  { label: "Nova Demanda", href: "/demandas/nova", icon: Plus },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const inicial = usuario?.nome?.trim().charAt(0).toUpperCase() || "?";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border min-h-screen">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary">
          <Zap className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight">FluxoOps</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
            {inicial}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {usuario?.nome || "Usuário"}
            </p>
            <p className="text-xs text-sidebar-foreground/50 truncate">
              {usuario?.email || ""}
            </p>
          </div>
        </div>

        <div className="border-t border-sidebar-border pt-3">
          <button
            type="button"
            onClick={handleLogout}
            title="Sair da conta"
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <span>Sair</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
