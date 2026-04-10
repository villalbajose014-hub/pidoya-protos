import { mockOrders } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RotateCcw, Package, TrendingUp, Users, ShoppingCart,
  CheckCircle2, Clock, ChevronRight
} from "lucide-react";
import { useScrollReveal, useCountUp } from "@/hooks/useAnimations";
import { useEffect } from "react";

function AnimatedStat({ target, suffix, label, icon: Icon, color }: { target: number; suffix: string; label: string; icon: React.ElementType; color: string }) {
  const { ref, isVisible } = useScrollReveal();
  const { count, trigger } = useCountUp(target, 800, true);
  useEffect(() => { if (isVisible) trigger(); }, [isVisible, trigger]);

  return (
    <div ref={ref} className="rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-2xl font-bold">{count}{suffix}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default function AdminPage() {
  const { addToCart, setIsCartOpen } = useCart();

  const handleRepeat = (order: typeof mockOrders[0]) => {
    order.items.forEach(({ product }) => addToCart(product));
    setIsCartOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold">Mis Pedidos</h1>
        <p className="mt-1 text-muted-foreground">Panel de cliente · Historial y estadísticas</p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatedStat target={12} suffix="" label="Pedidos este mes" icon={Package} color="bg-primary/10 text-primary" />
        <AnimatedStat target={1245} suffix="€" label="Total gastado" icon={TrendingUp} color="bg-success/10 text-success" />
        <AnimatedStat target={48} suffix="" label="Productos distintos" icon={Users} color="bg-accent/10 text-accent" />
        <AnimatedStat target={2} suffix=" días" label="Último pedido" icon={ShoppingCart} color="bg-primary/10 text-primary" />
      </div>

      {/* Orders */}
      <h2 className="mt-12 text-xl font-bold animate-fade-in" style={{ animationDelay: "0.2s" }}>Pedidos recientes</h2>
      <div className="mt-4 space-y-4">
        {mockOrders.map((order, i) => (
          <div
            key={order.id}
            className="rounded-xl border bg-card p-6 transition-all hover:shadow-md animate-fade-in"
            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold">{order.id}</span>
                  <Badge
                    variant={order.status === "Gestionado" ? "default" : "secondary"}
                    className={`${order.status === "Gestionado" ? "bg-success text-success-foreground" : "bg-accent/10 text-accent"}`}
                  >
                    {order.status === "Gestionado" ? (
                      <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {order.status}</span>
                    ) : (
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {order.status}</span>
                    )}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary">{order.total.toFixed(2)}€</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="group rounded-xl transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  onClick={() => handleRepeat(order)}
                >
                  <RotateCcw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-[-360deg] duration-500" /> Repetir
                </Button>
              </div>
            </div>

            {/* Order timeline */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">Recibido</span>
              </div>
              <div className={`h-0.5 flex-1 rounded-full ${order.status === "Gestionado" ? "bg-success" : "bg-border"}`} />
              <div className="flex items-center gap-1">
                <div className={`h-2.5 w-2.5 rounded-full ${order.status === "Gestionado" ? "bg-success" : "bg-border"}`} />
                <span className="text-xs text-muted-foreground">Gestionado</span>
              </div>
              <div className="h-0.5 flex-1 rounded-full bg-border" />
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="text-xs text-muted-foreground">Entregado</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {order.items.map(({ product, quantity }) => (
                <span key={product.id} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium transition-colors hover:bg-primary/10">
                  {product.name} ×{quantity}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
