import { useState, useMemo } from "react";
import { Search, LayoutGrid, Candy, Cookie, Star, CupSoda, Flame, SortAsc, Heart, Eye, X, Sparkles, Filter, Package } from "lucide-react";
import { products, Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { mockCampaigns } from "@/data/products";

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

const filterOptions = [
  { id: "all", label: "Todos" },
  { id: "new", label: "Novedades" },
  { id: "featured", label: "Destacados" },
  { id: "available", label: "Disponible" },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { addToCart, isInCart } = useCart();

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const suggestions = useMemo(() => {
    if (search.length < 2) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search]);

  const activeCampaign = mockCampaigns.find(c => c.status === "active");

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "all" ? true :
        activeCategory === "outlet" ? p.isOutlet :
        p.category === activeCategory;
      let matchFilter = true;
      if (activeFilter === "new") matchFilter = !!p.isNew;
      if (activeFilter === "featured") matchFilter = !!p.isFeatured;
      if (activeFilter === "available") matchFilter = p.available !== false;
      return matchSearch && matchCategory && matchFilter;
    });

    switch (sortBy) {
      case "price-asc": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-desc": result = [...result].sort((a, b) => b.price - a.price); break;
      case "name": result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return result;
  }, [search, activeCategory, sortBy, activeFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Campaign banner */}
      {activeCampaign && (
        <div className="mb-6 rounded-2xl gradient-outlet p-4 md:p-6 text-accent-foreground animate-fade-in flex items-center gap-4 overflow-hidden relative">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-foreground/5" />
          <Flame className="h-8 w-8 shrink-0 animate-bounce-subtle" />
          <div>
            <h3 className="font-bold text-lg">{activeCampaign.title}</h3>
            <p className="text-sm text-accent-foreground/80">{activeCampaign.description}</p>
          </div>
        </div>
      )}

      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold">Catálogo</h1>
        <p className="mt-1 text-muted-foreground">+1800 productos de las mejores marcas</p>
      </div>

      {/* Search with autocomplete */}
      <div className="relative mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full rounded-xl border bg-card py-3.5 pl-12 pr-4 text-sm outline-none ring-ring transition-all focus:ring-2 focus:shadow-lg"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-secondary">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        {/* Autocomplete dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1 rounded-xl border bg-card shadow-xl overflow-hidden animate-fade-in">
            {suggestions.map((p) => (
              <button
                key={p.id}
                onMouseDown={() => { setSearch(p.name); setShowSuggestions(false); }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-secondary/50"
              >
                <img src={p.image} alt={p.name} className="h-8 w-8 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.brand} · {p.category}</p>
                </div>
                <span className="ml-auto text-sm font-bold text-primary">{p.price.toFixed(2)}€</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category tabs + filters + sort */}
      <div className="mb-4 flex flex-col gap-4 animate-fade-in" style={{ animationDelay: "0.15s" }}>
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

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeFilter === f.id ? "bg-primary/10 text-primary" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {f.id === "new" && <Sparkles className="mr-1 inline h-3 w-3" />}
                {f.id === "featured" && <Star className="mr-1 inline h-3 w-3" />}
                {f.id === "available" && <Package className="mr-1 inline h-3 w-3" />}
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg border bg-card px-3 py-2 text-sm outline-none">
              {sortOptions.map((opt) => (<option key={opt.id} value={opt.id}>{opt.label}</option>))}
            </select>
          </div>
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
          <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setActiveCategory("all"); setActiveFilter("all"); }}>
            Ver todos los productos
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
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
            <button onClick={() => setQuickView(null)} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-secondary"><X className="h-5 w-5" /></button>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="aspect-square w-full sm:w-48 overflow-hidden rounded-xl bg-secondary/50">
                <img src={quickView.image} alt={quickView.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{quickView.brand}</p>
                <h3 className="mt-1 text-xl font-bold">{quickView.name}</h3>
                <p className="text-sm text-muted-foreground">{quickView.unit}</p>
                <p className="text-sm text-muted-foreground mt-1">Categoría: {quickView.category}</p>
                {quickView.sku && <p className="text-xs text-muted-foreground mt-1">SKU: {quickView.sku}</p>}
                {quickView.available === false && (
                  <div className="mt-2 inline-block rounded-lg bg-destructive/10 px-2.5 py-1">
                    <span className="text-xs font-bold text-destructive">No disponible</span>
                  </div>
                )}
                {quickView.isOutlet && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-lg gradient-outlet px-2.5 py-1">
                    <Flame className="h-3 w-3 text-accent-foreground" />
                    <span className="text-xs font-bold text-accent-foreground">-{quickView.outletDiscount}% Outlet</span>
                  </div>
                )}
                {quickView.isNew && (
                  <div className="mt-2 ml-1 inline-block rounded-lg bg-primary px-2.5 py-1">
                    <span className="text-xs font-bold text-primary-foreground">Nuevo</span>
                  </div>
                )}
                {quickView.isFeatured && (
                  <div className="mt-2 ml-1 inline-flex items-center gap-1 rounded-lg bg-accent/10 px-2.5 py-1">
                    <Star className="h-3 w-3 text-accent" />
                    <span className="text-xs font-bold text-accent">Destacado</span>
                  </div>
                )}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {(quickView.isOutlet ? quickView.price * (1 - (quickView.outletDiscount || 0) / 100) : quickView.price).toFixed(2)}€
                  </span>
                  {quickView.isOutlet && <span className="text-sm text-muted-foreground line-through">{quickView.price.toFixed(2)}€</span>}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1 rounded-xl" disabled={isInCart(quickView.id) || quickView.available === false} onClick={() => { addToCart(quickView); setQuickView(null); }}>
                    {isInCart(quickView.id) ? "Ya en carrito" : quickView.available === false ? "No disponible" : "Añadir al carrito"}
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl" onClick={() => toggleFavorite(quickView.id)}>
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
