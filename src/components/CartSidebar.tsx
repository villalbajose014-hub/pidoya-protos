import { X, Minus, Plus, Trash2, CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, clearCart, totalItems } = useCart();
  const [orderSent, setOrderSent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setIsClosing(false);
    }, 250);
  };

  const handleFinalize = () => {
    setOrderSent(true);
    setTimeout(() => {
      clearCart();
      setOrderSent(false);
      handleClose();
    }, 2500);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
      />
      <div className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-2xl ${isClosing ? "animate-slide-out-right" : "animate-slide-in-right"}`}>
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Tu pedido</h2>
            {totalItems > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{totalItems}</span>
            )}
          </div>
          <button onClick={handleClose} className="rounded-lg p-1.5 transition-colors hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        {orderSent ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 animate-scale-in">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10 animate-bounce-subtle">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <h3 className="text-xl font-bold">¡Pedido enviado con éxito!</h3>
            <p className="text-center text-muted-foreground">
              Tu pedido ha sido recibido. Te contactaremos pronto para confirmar.
            </p>
            <div className="mt-2 rounded-xl bg-secondary/50 px-4 py-2 text-sm">
              Nº pedido: <span className="font-bold text-primary">PY-{String(Math.floor(Math.random() * 900) + 100)}</span>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-muted-foreground animate-fade-in">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="text-lg font-medium">Carrito vacío</p>
            <p className="text-sm">Añade productos desde el catálogo</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {items.map(({ product, quantity }, i) => {
                  const finalPrice = product.isOutlet
                    ? product.price * (1 - (product.outletDiscount || 0) / 100)
                    : product.price;
                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3 transition-all hover:bg-secondary/70 animate-fade-in"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <img src={product.image} alt={product.name} className="h-14 w-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand} · {product.unit}</p>
                        <p className="text-sm font-bold text-primary">{(finalPrice * quantity).toFixed(2)}€</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="rounded-lg p-1.5 transition-colors hover:bg-secondary active:scale-90"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="rounded-lg p-1.5 transition-colors hover:bg-secondary active:scale-90"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="rounded-lg p-1.5 text-destructive transition-all hover:bg-destructive/10 active:scale-90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t p-4 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Envío</span>
                  <span className="font-medium text-success">Gratis</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>
              <Button
                onClick={handleFinalize}
                className="w-full rounded-xl py-6 text-base font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Finalizar pedido
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
