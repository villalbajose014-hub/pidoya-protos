import { mockOrders } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw, Package, TrendingUp, Users, ShoppingCart } from "lucide-react";

export default function AdminPage() {
  const { addToCart, setIsCartOpen } = useCart();

  const handleRepeat = (order: typeof mockOrders[0]) => {
    order.items.forEach(({ product }) => addToCart(product));
    setIsCartOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Mis Pedidos</h1>
      <p className="mt-1 text-muted-foreground">Panel de cliente · Historial y estadísticas</p>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Package, label: "Pedidos este mes", value: "12", color: "text-primary" },
          { icon: TrendingUp, label: "Total gastado", value: "1.245€", color: "text-success" },
          { icon: Users, label: "Productos distintos", value: "48", color: "text-accent" },
          { icon: ShoppingCart, label: "Último pedido", value: "Hace 2 días", color: "text-primary" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-xl border bg-card p-6">
            <Icon className={`h-5 w-5 ${color}`} />
            <p className="mt-3 text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Orders */}
      <h2 className="mt-12 text-xl font-bold">Pedidos recientes</h2>
      <div className="mt-4 space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="rounded-xl border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold">{order.id}</span>
                  <Badge variant={order.status === "Gestionado" ? "default" : "secondary"}>
                    {order.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary">{order.total.toFixed(2)}€</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={() => handleRepeat(order)}
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Repetir
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {order.items.map(({ product, quantity }) => (
                <span key={product.id} className="rounded-lg bg-secondary px-3 py-1 text-xs">
                  {product.name} x{quantity}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
