import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Clock, Flame, Package, CheckCircle2,
  Zap, Users, Star, ChevronRight, Sparkles, TrendingUp, Shield,
  Megaphone, Globe, HeadphonesIcon
} from "lucide-react";
import { useScrollReveal, useCountUp } from "@/hooks/useAnimations";
import { useEffect } from "react";

const brands = ["Haribo", "Lays", "Coca-Cola", "Fini", "Vidal", "Sugus", "Doritos", "Pringles", "Fanta", "Halls", "Monster", "Cheetos"];

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`${className} transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function CounterCard({ target, suffix, label, icon: Icon, color }: { target: number; suffix: string; label: string; icon: React.ElementType; color: string }) {
  const { ref, isVisible } = useScrollReveal();
  const { count, trigger } = useCountUp(target, 1200, true);
  useEffect(() => { if (isVisible) trigger(); }, [isVisible, trigger]);
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-3xl font-extrabold">{count}{suffix}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero px-4 py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary-foreground/5 animate-float" />
          <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-primary-foreground/5 animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute left-1/2 top-10 h-32 w-32 rounded-full bg-primary-foreground/5 animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container relative mx-auto flex flex-col items-center gap-12 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4 inline-flex animate-fade-in items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              <Sparkles className="h-4 w-4 animate-bounce-subtle" /> Plataforma B2B para mayoristas
            </div>
            <h1 className="animate-fade-in text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl" style={{ animationDelay: "0.1s" }}>
              Tu catálogo completo de golosinas y snacks{" "}
              <span className="relative text-accent">
                en un clic
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C40 2 60 2 100 4C140 6 160 3 199 5" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>
            </h1>
            <p className="mt-4 animate-fade-in text-lg text-primary-foreground/80 md:text-xl" style={{ animationDelay: "0.2s" }}>
              Haz tus pedidos mayoristas en 2 minutos. Sin llamadas, sin esperas. Disponible en Español y Gallego.
            </p>
            <div className="mt-8 flex animate-fade-in flex-wrap justify-center gap-3 md:justify-start" style={{ animationDelay: "0.3s" }}>
              <Link to="/catalogo">
                <Button className="group h-12 rounded-xl bg-accent px-8 text-base font-bold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 animate-pulse-glow">
                  Empezar ahora <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/catalogo">
                <Button variant="outline" className="h-12 rounded-xl border-primary-foreground/30 bg-transparent px-8 text-base font-medium text-primary-foreground transition-all hover:bg-primary-foreground/10 hover:-translate-y-0.5">
                  Ver productos
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex animate-fade-in flex-wrap justify-center gap-6 md:justify-start" style={{ animationDelay: "0.4s" }}>
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
            <div className="w-72 animate-fade-in-right rounded-2xl bg-card p-6 shadow-2xl animate-float" style={{ animationDelay: "0.3s" }}>
              <div className="space-y-3">
                <div className="h-3 w-24 rounded-full bg-secondary animate-shimmer" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--secondary)) 25%, hsl(var(--secondary) / 0.5) 50%, hsl(var(--secondary)) 75%)", backgroundSize: "200% 100%" }} />
                <div className="h-3 w-32 rounded-full bg-secondary" />
                <div className="mt-4 space-y-2">
                  {["Haribo Ositos x24", "Lays Clásicas x30", "Coca-Cola x48"].map((item, i) => (
                    <div key={item} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-xs animate-fade-in" style={{ animationDelay: `${0.5 + i * 0.15}s` }}>
                      <span className="text-foreground font-medium">{item}</span>
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-success/10 py-3 animate-scale-in" style={{ animationDelay: "1s" }}>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm font-bold text-success">Pedido enviado ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 -mt-8 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <CounterCard target={150} suffix="+" label="Clientes activos" icon={Users} color="bg-primary/10 text-primary" />
            <CounterCard target={1800} suffix="+" label="Productos" icon={Package} color="bg-accent/10 text-accent" />
            <CounterCard target={98} suffix="%" label="Satisfacción" icon={Star} color="bg-success/10 text-success" />
            <CounterCard target={2} suffix=" min" label="Tiempo pedido" icon={Zap} color="bg-primary/10 text-primary" />
          </div>
        </div>
      </section>

      {/* Antes vs Después */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Deja de perder tiempo <span className="text-primary">al teléfono</span></h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">Compara el proceso tradicional con PidoYA</p>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={100}>
              <div className="group h-full rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-8 transition-all hover:shadow-lg hover:border-destructive/40">
                <div className="mb-4 inline-block rounded-lg bg-destructive/10 px-3 py-1 text-sm font-bold text-destructive">ANTES</div>
                <h3 className="text-2xl font-bold">Por teléfono</h3>
                <div className="mt-4 flex items-center gap-2 text-3xl font-extrabold text-destructive">
                  <Clock className="h-8 w-8 animate-bounce-subtle" /> 20 min
                </div>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {["Llamar y esperar", "Dictar productos uno a uno", "Errores frecuentes", "Sin registro del pedido"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10 text-xs text-destructive">✕</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={250}>
              <div className="group h-full rounded-2xl border-2 border-success/20 bg-success/5 p-8 transition-all hover:shadow-lg hover:border-success/40">
                <div className="mb-4 inline-flex items-center gap-1 rounded-lg bg-success/10 px-3 py-1 text-sm font-bold text-success">
                  <Sparkles className="h-3 w-3" /> DESPUÉS
                </div>
                <h3 className="text-2xl font-bold">Con PidoYA</h3>
                <div className="mt-4 flex items-center gap-2 text-3xl font-extrabold text-success">
                  <Zap className="h-8 w-8 animate-bounce-subtle" /> 2 min
                </div>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {["Abre la app y busca", "Añade al carrito", "Envía con 1 clic", "Historial completo"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-xs text-success">✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features grid — expanded from PRD */}
      <section className="bg-secondary/50 px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Todo lo que necesitas <span className="text-primary">en una app</span></h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">Funcionalidades diseñadas para distribuidores B2B</p>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Rapidez extrema", desc: "Buscador inteligente con autocompletado. Encuentra entre +1800 productos en segundos.", color: "bg-primary/10 text-primary", gradient: "from-primary/5" },
              { icon: Flame, title: "Zona Outlet", desc: "Descuentos del 30-40%. Rota stock y maximiza beneficios con productos seleccionados.", color: "bg-accent/10 text-accent", gradient: "from-accent/5" },
              { icon: Package, title: "+1800 productos", desc: "Catálogo completo y actualizado de golosinas, snacks, caramelos y bebidas.", color: "bg-success/10 text-success", gradient: "from-success/5" },
              { icon: Megaphone, title: "Campañas y ofertas", desc: "Recibe notificaciones push con ofertas exclusivas y novedades personalizadas.", color: "bg-primary/10 text-primary", gradient: "from-primary/5" },
              { icon: TrendingUp, title: "Dashboard estratégico", desc: "Visualiza métricas de pedidos, clientes activos y top productos.", color: "bg-success/10 text-success", gradient: "from-success/5" },
              { icon: Globe, title: "Español y Gallego", desc: "Disponible en los dos idiomas. Configuración desde tu perfil.", color: "bg-accent/10 text-accent", gradient: "from-accent/5" },
            ].map(({ icon: Icon, title, desc, color, gradient }, i) => (
              <AnimatedSection key={title} delay={i * 100}>
                <div className={`group h-full rounded-2xl border bg-gradient-to-br ${gradient} to-transparent bg-card p-8 transition-all hover:shadow-xl hover:-translate-y-2 cursor-pointer`}>
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${color} transition-transform group-hover:scale-110`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  <Link to="/catalogo" className="mt-4 inline-flex items-center text-sm font-medium text-primary transition-all hover:gap-2">
                    Explorar <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Tan fácil como <span className="text-primary">1, 2, 3</span></h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">Haz tu primer pedido en menos de 2 minutos</p>
          </AnimatedSection>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              { step: "1", title: "Regístrate gratis", desc: "Alta autónoma con email o teléfono. Sin permanencia.", icon: "👤" },
              { step: "2", title: "Explora el catálogo", desc: "Busca entre +1800 productos o navega por categorías", icon: "🔍" },
              { step: "3", title: "Añade al carrito", desc: "Selecciona productos y ajusta cantidades fácilmente", icon: "🛒" },
              { step: "4", title: "Envía tu pedido", desc: "Con un clic tu pedido llega directamente al distribuidor", icon: "✅" },
            ].map(({ step, title, desc, icon }, i) => (
              <AnimatedSection key={step} delay={i * 150}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-3xl text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-110">
                    {icon}
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground md:right-1/4">
                    {step}
                  </span>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/30 px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Lo que dicen nuestros <span className="text-primary">clientes</span></h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "María G.", business: "Kiosko La Esquina", type: "Kiosco", text: "Antes tardaba 20 minutos por teléfono. Ahora hago el pedido en 2 minutos desde el móvil. ¡Increíble!", stars: 5 },
              { name: "Carlos R.", business: "Bar El Puerto", type: "Bar", text: "La zona Outlet es genial. Consigo ofertas que antes ni sabía que existían. Ahorro un 25% cada mes.", stars: 5 },
              { name: "Ana P.", business: "Gasolinera Repsol", type: "Gasolinera", text: "Repetir pedido con un clic es la función que más uso. Sencillo, rápido y sin errores.", stars: 5 },
            ].map(({ name, business, type, text, stars }, i) => (
              <AnimatedSection key={name} delay={i * 150}>
                <div className="h-full rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: stars }).map((_, s) => (<Star key={s} className="h-4 w-4 fill-current" />))}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground italic">"{text}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-muted-foreground">{business} · {type}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="px-4 py-16 overflow-hidden">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-center text-2xl font-bold">Marcas que ya encuentras</h2>
          </AnimatedSection>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {brands.map((brand, i) => (
              <AnimatedSection key={brand} delay={i * 60}>
                <div className="rounded-xl bg-card px-6 py-3 text-sm font-bold text-muted-foreground shadow-sm border transition-all hover:shadow-md hover:-translate-y-1 hover:text-primary cursor-default">
                  {brand}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="px-4 py-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: Shield, text: "Datos protegidos" },
              { icon: TrendingUp, text: "Sin cuotas" },
              { icon: CheckCircle2, text: "Soporte incluido" },
              { icon: HeadphonesIcon, text: "Atención personalizada" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" /> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection className="px-4 py-16">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-2xl gradient-hero p-12 text-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/5 animate-float" />
              <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-primary-foreground/5 animate-float" style={{ animationDelay: "1.5s" }} />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">¿Listo para simplificar tus pedidos?</h2>
              <p className="mt-3 text-primary-foreground/80">Únete a más de 150 negocios que ya usan PidoYA</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/catalogo">
                  <Button className="h-12 rounded-xl bg-accent px-10 text-base font-bold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-xl hover:-translate-y-0.5">
                    Empezar gratis <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contacto">
                  <Button variant="outline" className="h-12 rounded-xl border-primary-foreground/30 bg-transparent px-8 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10">
                    Contactar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="border-t bg-card px-4 py-12">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                  <span className="text-xs font-bold text-primary-foreground">PY</span>
                </div>
                <span className="font-bold">Pido<span className="text-primary">YA</span></span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Plataforma B2B de pedidos mayoristas para distribuidores de alimentación.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Plataforma</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/catalogo" className="block hover:text-primary transition-colors">Catálogo</Link>
                <Link to="/admin" className="block hover:text-primary transition-colors">Panel de control</Link>
                <Link to="/perfil" className="block hover:text-primary transition-colors">Mi perfil</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Soporte</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/faq" className="block hover:text-primary transition-colors">FAQ</Link>
                <Link to="/contacto" className="block hover:text-primary transition-colors">Contacto</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Contacto</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>pedidos@pidoya.es</p>
                <p>981 123 456</p>
                <p>A Coruña, Galicia</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            © 2026 PidoYA. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
