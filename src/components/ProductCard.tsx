import { Check, ShoppingCart, Flame, Heart, Eye, Star, AlertCircle } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onQuickView?: () => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite, onQuickView }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const unavailable = product.available === false;
  const finalPrice = product.isOutlet
    ? product.price * (1 - (product.outletDiscount || 0) / 100)
    : product.price;

  return (
    <div className={`group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${unavailable ? "opacity-70" : ""}`}>
      {product.isOutlet && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-lg gradient-outlet px-2.5 py-1 animate-bounce-subtle">
          <Flame className="h-3 w-3 text-accent-foreground" />
          <span className="text-xs font-bold text-accent-foreground">-{product.outletDiscount}%</span>
        </div>
      )}
      {product.isNew && !product.isOutlet && (
        <div className="absolute left-3 top-3 z-10 rounded-lg bg-primary px-2.5 py-1">
          <span className="text-xs font-bold text-primary-foreground">Nuevo</span>
        </div>
      )}
      {product.isFeatured && !product.isNew && !product.isOutlet && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-lg bg-accent/10 backdrop-blur-sm px-2.5 py-1">
          <Star className="h-3 w-3 text-accent fill-accent" />
          <span className="text-xs font-bold text-accent">Destacado</span>
        </div>
      )}

      {/* Action buttons on hover */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {onToggleFavorite && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card/90 shadow-md backdrop-blur-sm transition-transform hover:scale-110"
          >
            <Heart className={`h-4 w-4 transition-colors ${isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
          </button>
        )}
        {onQuickView && (
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(); }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card/90 shadow-md backdrop-blur-sm transition-transform hover:scale-110"
          >
            <Eye className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="aspect-square overflow-hidden bg-secondary/50 relative">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {unavailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
            <span className="flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive">
              <AlertCircle className="h-3 w-3" /> No disponible
            </span>
          </div>
        )}
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
            onClick={() => !inCart && !unavailable && addToCart(product)}
            disabled={unavailable}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
              inCart
                ? "bg-success/10 text-success scale-95"
                : unavailable
                ? "bg-secondary text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 active:scale-95"
            }`}
          >
            {inCart ? (
              <><Check className="h-3.5 w-3.5" /><span>En carrito</span></>
            ) : unavailable ? (
              <span>Agotado</span>
            ) : (
              <><ShoppingCart className="h-3.5 w-3.5" /><span>Añadir</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
