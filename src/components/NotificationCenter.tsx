import { useState } from "react";
import { Bell, X, Package, Megaphone, Sparkles, Settings, Check } from "lucide-react";
import { mockNotifications, Notification } from "@/data/products";

const typeConfig: Record<Notification["type"], { icon: React.ElementType; color: string }> = {
  pedido: { icon: Package, color: "bg-primary/10 text-primary" },
  campaña: { icon: Megaphone, color: "bg-accent/10 text-accent" },
  novedad: { icon: Sparkles, color: "bg-success/10 text-success" },
  sistema: { icon: Settings, color: "bg-secondary text-muted-foreground" },
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-xl bg-secondary p-2.5 transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-scale-in">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border bg-card shadow-2xl animate-scale-in overflow-hidden">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="font-bold">Notificaciones</h3>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary hover:underline flex items-center gap-1">
                    <Check className="h-3 w-3" /> Marcar todo
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-secondary">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">Sin notificaciones</p>
              ) : (
                notifications.map((n) => {
                  const cfg = typeConfig[n.type];
                  return (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50 ${!n.read ? "bg-primary/5" : ""}`}
                    >
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.color}`}>
                        <cfg.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">{n.date}</p>
                      </div>
                      {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
