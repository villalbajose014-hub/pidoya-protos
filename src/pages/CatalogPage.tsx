import { useState, useMemo } from "react";
import { Search, LayoutGrid, Candy, Cookie, Star, CupSoda, Flame } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const categoryConfig = [
  { id: "all", label: "Todos", icon: LayoutGrid },
  { id: "Golosinas", label: "Golosinas", icon: Candy },
  { id: "Snacks", label: "Snacks", icon: Cookie },
  { id: "Caramelos", label: "Caramelos", icon: Star },
  { id: "Bebidas", label: "Bebidas", icon: CupSoda },
  { id: "outlet", label: "Outlet", icon: Flame },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
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
  }, [search, activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Catálogo</h1>
        <p className="mt-1 text-muted-foreground">+1800 productos de las mejores marcas</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border bg-card py-3.5 pl-12 pr-4 text-sm outline-none ring-ring transition-shadow focus:ring-2"
        />
      </div>

      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categoryConfig.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              activeCategory === id
                ? id === "outlet"
                  ? "gradient-outlet text-accent-foreground"
                  : "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-lg font-medium">No se encontraron productos</p>
          <p className="text-sm">Prueba con otro término de búsqueda</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
