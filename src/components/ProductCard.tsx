import { Check, ShoppingCart, Flame } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const finalPrice = product.isOutlet
    ? product.price * (1 - (product.outletDiscount || 0) / 100)
    : product.price;

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
      {product.isOutlet && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-lg gradient-outlet px-2.5 py-1">
          <Flame className="h-3 w-3 text-accent-foreground" />
          <span className="text-xs font-bold text-accent-foreground">-{product.outletDiscount}%</span>
        </div>
      )}
      {product.isNew && !product.isOutlet && (
        <div className="absolute left-3 top-3 z-10 rounded-lg bg-primary px-2.5 py-1">
          <span className="text-xs font-bold text-primary-foreground">Nuevo</span>
        </div>
      )}

      <div className="aspect-square overflow-hidden bg-secondary/50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="mt-0.5 truncate text-sm font-semibold">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.unit}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-primary">{finalPrice.toFixed(2)}€</span>
            {product.isOutlet && (
              <span className="text-xs text-muted-foreground line-through">{product.price.toFixed(2)}€</span>
            )}
          </div>

          <button
            onClick={() => !inCart && addToCart(product)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              inCart
                ? "bg-success/10 text-success"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {inCart ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>En carrito</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Añadir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
