import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Clock, Flame, Package, CheckCircle2,
  Zap, Users, Star, ChevronRight
} from "lucide-react";

const brands = ["Haribo", "Lays", "Coca-Cola", "Fini", "Vidal", "Sugus", "Doritos", "Pringles", "Fanta", "Halls"];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero px-4 py-20 md:py-28">
        <div className="container mx-auto flex flex-col items-center gap-12 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
              <Zap className="h-4 w-4" /> Plataforma B2B para mayoristas
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Tu catálogo completo de golosinas y snacks{" "}
              <span className="text-accent">en un clic</span>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
              Haz tus pedidos mayoristas en 2 minutos. Sin llamadas, sin esperas.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link to="/catalogo">
                <Button className="h-12 rounded-xl bg-accent px-8 text-base font-bold text-accent-foreground hover:bg-accent/90">
                  Empezar ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/catalogo">
                <Button variant="outline" className="h-12 rounded-xl border-primary-foreground/30 bg-transparent px-8 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10">
                  Ver productos
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 md:justify-start">
              {[
                { icon: Users, text: "+150 clientes" },
                { icon: Star, text: "Gratis" },
                { icon: CheckCircle2, text: "Sin permanencia" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <Icon className="h-4 w-4" /> {text}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-72 rounded-2xl bg-card p-6 shadow-2xl">
              <div className="space-y-3">
                <div className="h-3 w-24 rounded-full bg-secondary" />
                <div className="h-3 w-32 rounded-full bg-secondary" />
                <div className="mt-4 space-y-2">
                  {["Haribo Ositos x24", "Lays Clásicas x30", "Coca-Cola x48"].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-xs">
                      <span className="text-foreground font-medium">{item}</span>
                      <Check />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-success/10 py-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm font-bold text-success">Pedido enviado ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Antes vs Después */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Deja de perder tiempo <span className="text-primary">al teléfono</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Compara el proceso tradicional con PidoYA
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-8">
              <div className="mb-4 inline-block rounded-lg bg-destructive/10 px-3 py-1 text-sm font-bold text-destructive">ANTES</div>
              <h3 className="text-2xl font-bold">Por teléfono</h3>
              <div className="mt-4 flex items-center gap-2 text-3xl font-extrabold text-destructive">
                <Clock className="h-8 w-8" /> 20 min
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>❌ Llamar y esperar</li>
                <li>❌ Dictar productos uno a uno</li>
                <li>❌ Errores frecuentes</li>
                <li>❌ Sin registro del pedido</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-success/20 bg-success/5 p-8">
              <div className="mb-4 inline-block rounded-lg bg-success/10 px-3 py-1 text-sm font-bold text-success">DESPUÉS</div>
              <h3 className="text-2xl font-bold">Con PidoYA</h3>
              <div className="mt-4 flex items-center gap-2 text-3xl font-extrabold text-success">
                <Zap className="h-8 w-8" /> 2 min
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>✅ Abre la app y busca</li>
                <li>✅ Añade al carrito</li>
                <li>✅ Envía con 1 clic</li>
                <li>✅ Historial completo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Razones */}
      <section className="bg-secondary/50 px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            3 razones para usar <span className="text-primary">PidoYA</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Rapidez",
                desc: "Haz pedidos en menos de 2 minutos. Buscador potente con +1800 productos.",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: Flame,
                title: "Zona Outlet",
                desc: "Descuentos del 30-40% en productos seleccionados. Rota tu stock rápido.",
                color: "bg-accent/10 text-accent",
              },
              {
                icon: Package,
                title: "+1800 productos",
                desc: "Catálogo completo de golosinas, snacks, caramelos y bebidas actualizado.",
                color: "bg-success/10 text-success",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                <Link to="/catalogo" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Explorar <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <h2 className="text-center text-2xl font-bold">Marcas que ya encuentras</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {brands.map((brand) => (
              <div key={brand} className="rounded-xl bg-card px-6 py-3 text-sm font-bold text-muted-foreground shadow-sm border">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="rounded-2xl gradient-hero p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
              ¿Listo para simplificar tus pedidos?
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              Únete a más de 150 negocios que ya usan PidoYA
            </p>
            <Link to="/catalogo">
              <Button className="mt-8 h-12 rounded-xl bg-accent px-10 text-base font-bold text-accent-foreground hover:bg-accent/90">
                Empezar gratis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card px-4 py-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2026 PidoYA. Plataforma B2B de pedidos mayoristas.
        </div>
      </footer>
    </div>
  );
}

function Check() {
  return <CheckCircle2 className="h-4 w-4 text-success" />;
}
