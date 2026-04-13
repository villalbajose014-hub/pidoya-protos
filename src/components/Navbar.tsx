import { ShoppingBag, Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NotificationCenter } from "@/components/NotificationCenter";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/admin", label: "Panel" },
  { to: "/contacto", label: "Contacto" },
  { to: "/faq", label: "FAQ" },
];

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setCartBounce(true);
      const t = setTimeout(() => setCartBounce(false), 300);
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  return (
    <nav className={`sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? "bg-card/95 backdrop-blur-lg shadow-sm" : "bg-card/80 backdrop-blur-sm"}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-hero transition-transform group-hover:scale-110">
            <span className="text-sm font-bold text-primary-foreground">PY</span>
          </div>
          <span className="text-xl font-bold text-foreground">
            Pido<span className="text-primary">YA</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-secondary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <NotificationCenter />

          <Link
            to="/perfil"
            className="rounded-xl bg-secondary p-2.5 transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20"
          >
            <User className="h-5 w-5" />
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative rounded-xl bg-secondary p-2.5 transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20 ${cartBounce ? "scale-110" : "scale-100"}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t bg-card px-4 pb-4 md:hidden animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.to ? "bg-secondary text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/perfil" onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground">
            Mi Perfil
          </Link>
        </div>
      )}
    </nav>
  );
}
