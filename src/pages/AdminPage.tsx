import { useState } from "react";
import { mockOrders, mockClients, mockCampaigns, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RotateCcw, Package, TrendingUp, Users, ShoppingCart,
  CheckCircle2, Clock, Search, Filter, Download, Megaphone,
  BarChart3, Eye, UserCheck, UserX, Truck, ArrowUpRight, ArrowDownRight,
  Flame, Star, Calendar, MapPin
} from "lucide-react";
import { useScrollReveal, useCountUp } from "@/hooks/useAnimations";
import { useEffect } from "react";

function AnimatedStat({ target, suffix, label, icon: Icon, color, trend }: { target: number; suffix: string; label: string; icon: React.ElementType; color: string; trend?: number }) {
  const { ref, isVisible } = useScrollReveal();
  const { count, trigger } = useCountUp(target, 800, true);
  useEffect(() => { if (isVisible) trigger(); }, [isVisible, trigger]);
  return (
    <div ref={ref} className="rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trend >= 0 ? "text-success" : "text-destructive"}`}>
            {trend >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold">{count}{suffix}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

type Tab = "dashboard" | "orders" | "clients" | "campaigns";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const { addToCart, setIsCartOpen } = useCart();
  const [orderSearch, setOrderSearch] = useState("");

  const handleRepeat = (order: typeof mockOrders[0]) => {
    order.items.forEach(({ product }) => addToCart(product));
    setIsCartOpen(true);
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "orders", label: "Pedidos", icon: Package },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "campaigns", label: "Campañas", icon: Megaphone },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
        <p className="mt-1 text-muted-foreground">Gestión y análisis de tu negocio</p>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2 border-b pb-4 animate-fade-in" style={{ animationDelay: "0.05s" }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              tab === id ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {tab === "dashboard" && (
        <div className="mt-8 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatedStat target={38} suffix="" label="Pedidos este mes" icon={Package} color="bg-primary/10 text-primary" trend={12} />
            <AnimatedStat target={4580} suffix="€" label="Facturación mensual" icon={TrendingUp} color="bg-success/10 text-success" trend={8} />
            <AnimatedStat target={42} suffix="" label="Clientes activos" icon={Users} color="bg-accent/10 text-accent" trend={5} />
            <AnimatedStat target={1800} suffix="+" label="Productos en catálogo" icon={ShoppingCart} color="bg-primary/10 text-primary" />
          </div>

          {/* Charts placeholder */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-bold flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" /> Evolución semanal</h3>
              <div className="mt-4 flex items-end gap-2 h-40">
                {[65, 40, 80, 55, 90, 70, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg bg-primary/20 transition-all hover:bg-primary/40" style={{ height: `${h}%` }}>
                      <div className="w-full rounded-t-lg bg-primary" style={{ height: `${h * 0.7}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{"LMXJVSD"[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-bold flex items-center gap-2"><Star className="h-4 w-4 text-accent" /> Top Productos</h3>
              <div className="mt-4 space-y-3">
                {products.slice(0, 5).map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                    <img src={p.image} alt={p.name} className="h-8 w-8 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{(Math.random() * 50 + 20).toFixed(0)} uds</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top clients */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Top Clientes</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mockClients.filter(c => c.status === "activo").slice(0, 3).map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl bg-secondary/50 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {c.name.split(" ").map(n => n[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{c.business}</p>
                    <p className="text-xs text-muted-foreground">{c.totalOrders} pedidos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ORDERS */}
      {tab === "orders" && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Buscar pedido..."
                className="w-full rounded-xl border bg-card py-2.5 pl-10 pr-4 text-sm outline-none ring-ring focus:ring-2"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl"><Filter className="mr-2 h-4 w-4" /> Filtros</Button>
              <Button variant="outline" size="sm" className="rounded-xl"><Download className="mr-2 h-4 w-4" /> Exportar</Button>
            </div>
          </div>

          {mockOrders.filter(o => o.id.toLowerCase().includes(orderSearch.toLowerCase())).map((order, i) => (
            <div key={order.id} className="rounded-xl border bg-card p-6 transition-all hover:shadow-md animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold">{order.id}</span>
                    <Badge className={`${
                      order.status === "Entregado" ? "bg-success/10 text-success" :
                      order.status === "Gestionado" ? "bg-primary/10 text-primary" :
                      "bg-accent/10 text-accent"
                    }`}>
                      {order.status === "Entregado" ? <Truck className="mr-1 h-3 w-3" /> :
                       order.status === "Gestionado" ? <CheckCircle2 className="mr-1 h-3 w-3" /> :
                       <Clock className="mr-1 h-3 w-3" />}
                      {order.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-primary">{order.total.toFixed(2)}€</span>
                  <Button variant="outline" size="sm" className="group rounded-xl transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary" onClick={() => handleRepeat(order)}>
                    <RotateCcw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-[-360deg] duration-500" /> Repetir
                  </Button>
                </div>
              </div>
              {/* Timeline */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-full bg-success" /><span className="text-xs text-muted-foreground">Recibido</span></div>
                <div className={`h-0.5 flex-1 rounded-full ${order.status !== "Recibido" ? "bg-success" : "bg-border"}`} />
                <div className="flex items-center gap-1"><div className={`h-2.5 w-2.5 rounded-full ${order.status !== "Recibido" ? "bg-success" : "bg-border"}`} /><span className="text-xs text-muted-foreground">Gestionado</span></div>
                <div className={`h-0.5 flex-1 rounded-full ${order.status === "Entregado" ? "bg-success" : "bg-border"}`} />
                <div className="flex items-center gap-1"><div className={`h-2.5 w-2.5 rounded-full ${order.status === "Entregado" ? "bg-success" : "bg-border"}`} /><span className="text-xs text-muted-foreground">Entregado</span></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {order.items.map(({ product, quantity }) => (
                  <span key={product.id} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-primary/10 transition-colors">
                    {product.name} ×{quantity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CLIENTS */}
      {tab === "clients" && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2 text-sm">
              <span className="rounded-lg bg-success/10 px-3 py-1 text-success font-medium">{mockClients.filter(c => c.status === "activo").length} activos</span>
              <span className="rounded-lg bg-secondary px-3 py-1 text-muted-foreground font-medium">{mockClients.filter(c => c.status === "inactivo").length} inactivos</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl"><Download className="mr-2 h-4 w-4" /> Exportar</Button>
          </div>

          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Cliente</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Tipo</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Zona</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Pedidos</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Estado</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Último pedido</th>
                </tr>
              </thead>
              <tbody>
                {mockClients.map((c) => (
                  <tr key={c.id} className="border-b transition-colors hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {c.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.business}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize">{c.type}</td>
                    <td className="px-4 py-3"><span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> {c.zone}</span></td>
                    <td className="px-4 py-3 font-medium">{c.totalOrders}</td>
                    <td className="px-4 py-3">
                      <Badge className={`${c.status === "activo" ? "bg-success/10 text-success" : c.status === "inactivo" ? "bg-secondary text-muted-foreground" : "bg-destructive/10 text-destructive"}`}>
                        {c.status === "activo" ? <UserCheck className="mr-1 h-3 w-3" /> : <UserX className="mr-1 h-3 w-3" />}
                        {c.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.lastOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CAMPAIGNS */}
      {tab === "campaigns" && (
        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{mockCampaigns.length} campañas</p>
            <Button className="rounded-xl"><Megaphone className="mr-2 h-4 w-4" /> Nueva campaña</Button>
          </div>

          {mockCampaigns.map((c, i) => (
            <div key={c.id} className="rounded-xl border bg-card p-6 transition-all hover:shadow-md animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <Badge className={`${
                      c.status === "active" ? "bg-success/10 text-success" :
                      c.status === "scheduled" ? "bg-primary/10 text-primary" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {c.status === "active" ? "Activa" : c.status === "scheduled" ? "Programada" : "Completada"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {c.scheduledDate}</span>
                    <span className="capitalize rounded-lg bg-secondary px-2 py-0.5">{c.segment}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl"><Eye className="mr-1 h-3 w-3" /> Ver</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
