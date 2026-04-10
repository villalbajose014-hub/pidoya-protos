import { useState, useMemo } from "react";
import { Search, LayoutGrid, Candy, Cookie, Star, CupSoda, Flame, SortAsc, Heart, Eye, X } from "lucide-react";
import { products, Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const categoryConfig = [
  { id: "all", label: "Todos", icon: LayoutGrid },
  { id: "Golosinas", label: "Golosinas", icon: Candy },
  { id: "Snacks", label: "Snacks", icon: Cookie },
  { id: "Caramelos", label: "Caramelos", icon: Star },
  { id: "Bebidas", label: "Bebidas", icon: CupSoda },
  { id: "outlet", label: "Outlet", icon: Flame },
];

const sortOptions = [
  { id: "default", label: "Relevancia" },
  { id: "price-asc", label: "Precio ↑" },
  { id: "price-desc", label: "Precio ↓" },
  { id: "name", label: "Nombre A-Z" },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [quickView, setQuickView] = useState<Product | null>(null);
  const { addToCart, isInCart } = useCart();

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "all"
          ? true
          : activeCategory === "outlet"
          ? p.isOutlet
          : p.category === activeCategory;
      return matchSearch && matchCategory;
    });

    switch (sortBy) {
      case "price-asc": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-desc": result = [...result].sort((a, b) => b.price - a.price); break;
      case "name": result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return result;
  }, [search, activeCategory, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold">Catálogo</h1>
        <p className="mt-1 text-muted-foreground">+1800 productos de las mejores marcas</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border bg-card py-3.5 pl-12 pr-4 text-sm outline-none ring-ring transition-all focus:ring-2 focus:shadow-lg"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-secondary">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Category tabs + sort */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in" style={{ animationDelay: "0.15s" }}>
        <div className="flex flex-wrap gap-2">
          {categoryConfig.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                activeCategory === id
                  ? id === "outlet"
                    ? "gradient-outlet text-accent-foreground shadow-md shadow-accent/20"
                    : "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {id === "outlet" && activeCategory !== "outlet" && (
                <span className="flex h-2 w-2 rounded-full bg-accent animate-bounce-subtle" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border bg-card px-3 py-2 text-sm outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground animate-fade-in">
          <p className="text-lg font-medium">No se encontraron productos</p>
          <p className="text-sm">Prueba con otro término de búsqueda</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setActiveCategory("all"); }}>
            Ver todos los productos
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <ProductCard
                product={product}
                isFavorite={favorites.has(product.id)}
                onToggleFavorite={() => toggleFavorite(product.id)}
                onQuickView={() => setQuickView(product)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {quickView && (
        <>
          <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm animate-fade-in" onClick={() => setQuickView(null)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-6 shadow-2xl animate-scale-in">
            <button onClick={() => setQuickView(null)} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-secondary">
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="aspect-square w-full sm:w-48 overflow-hidden rounded-xl bg-secondary/50">
                <img src={quickView.image} alt={quickView.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{quickView.brand}</p>
                <h3 className="mt-1 text-xl font-bold">{quickView.name}</h3>
                <p className="text-sm text-muted-foreground">{quickView.unit}</p>
                <p className="text-sm text-muted-foreground mt-1">Categoría: {quickView.category}</p>
                {quickView.isOutlet && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-lg gradient-outlet px-2.5 py-1">
                    <Flame className="h-3 w-3 text-accent-foreground" />
                    <span className="text-xs font-bold text-accent-foreground">-{quickView.outletDiscount}% Outlet</span>
                  </div>
                )}
                {quickView.isNew && (
                  <div className="mt-2 inline-block rounded-lg bg-primary px-2.5 py-1">
                    <span className="text-xs font-bold text-primary-foreground">Nuevo</span>
                  </div>
                )}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {(quickView.isOutlet
                      ? quickView.price * (1 - (quickView.outletDiscount || 0) / 100)
                      : quickView.price
                    ).toFixed(2)}€
                  </span>
                  {quickView.isOutlet && (
                    <span className="text-sm text-muted-foreground line-through">{quickView.price.toFixed(2)}€</span>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    className="flex-1 rounded-xl"
                    disabled={isInCart(quickView.id)}
                    onClick={() => { addToCart(quickView); setQuickView(null); }}
                  >
                    {isInCart(quickView.id) ? "Ya en carrito" : "Añadir al carrito"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl"
                    onClick={() => toggleFavorite(quickView.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.has(quickView.id) ? "fill-destructive text-destructive" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
