import { X, Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [orderSent, setOrderSent] = useState(false);

  if (!isCartOpen) return null;

  const handleFinalize = () => {
    setOrderSent(true);
    setTimeout(() => {
      clearCart();
      setOrderSent(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-bold">Tu pedido</h2>
          <button onClick={() => setIsCartOpen(false)} className="rounded-lg p-1 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        {orderSent ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h3 className="text-xl font-bold">¡Pedido enviado con éxito!</h3>
            <p className="text-center text-muted-foreground">
              Tu pedido ha sido recibido. Te contactaremos pronto.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-muted-foreground">
            <p className="text-lg font-medium">Carrito vacío</p>
            <p className="text-sm">Añade productos desde el catálogo</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {items.map(({ product, quantity }) => {
                  const finalPrice = product.isOutlet
                    ? product.price * (1 - (product.outletDiscount || 0) / 100)
                    : product.price;
                  return (
                    <div key={product.id} className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
                      <img src={product.image} alt={product.name} className="h-14 w-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand} · {product.unit}</p>
                        <p className="text-sm font-bold text-primary">{finalPrice.toFixed(2)}€</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="rounded-lg p-1 hover:bg-secondary">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="rounded-lg p-1 hover:bg-secondary">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} className="rounded-lg p-1 text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t p-4 space-y-3">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{totalPrice.toFixed(2)}€</span>
              </div>
              <Button onClick={handleFinalize} className="w-full rounded-xl py-6 text-base font-bold">
                Finalizar pedido
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
