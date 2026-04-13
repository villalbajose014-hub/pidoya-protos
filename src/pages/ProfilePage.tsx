import { useState } from "react";
import { mockUserProfile, mockOrders } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User, Building2, MapPin, Mail, Phone, FileText, Globe, Calendar,
  ShoppingBag, TrendingUp, Heart, Edit3, Save, X, Package, Award
} from "lucide-react";
import { useScrollReveal, useCountUp } from "@/hooks/useAnimations";
import { useEffect } from "react";

function StatCard({ target, suffix, label, icon: Icon, color }: { target: number; suffix: string; label: string; icon: React.ElementType; color: string }) {
  const { ref, isVisible } = useScrollReveal();
  const { count, trigger } = useCountUp(target, 800, true);
  useEffect(() => { if (isVisible) trigger(); }, [isVisible, trigger]);
  return (
    <div ref={ref} className="rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-2xl font-bold">{count}{suffix}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(mockUserProfile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <p className="mt-1 text-muted-foreground">Gestiona tu cuenta y datos de negocio</p>
      </div>

      {saved && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-success/10 px-4 py-3 text-sm font-medium text-success animate-fade-in">
          <Save className="h-4 w-4" /> Perfil actualizado correctamente
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard target={profile.totalOrders} suffix="" label="Pedidos totales" icon={Package} color="bg-primary/10 text-primary" />
        <StatCard target={Math.round(profile.totalSpent)} suffix="€" label="Total comprado" icon={TrendingUp} color="bg-success/10 text-success" />
        <StatCard target={profile.favoriteProducts.length} suffix="" label="Productos favoritos" icon={Heart} color="bg-destructive/10 text-destructive" />
        <StatCard target={5} suffix=" meses" label="Cliente desde" icon={Award} color="bg-accent/10 text-accent" />
      </div>

      {/* Profile Card */}
      <div className="mt-8 rounded-2xl border bg-card p-6 md:p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-hero text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
              {profile.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.business}</p>
              <span className="mt-1 inline-block rounded-full bg-success/10 px-3 py-0.5 text-xs font-medium text-success">
                Cliente activo
              </span>
            </div>
          </div>
          <Button
            variant={editing ? "destructive" : "outline"}
            size="sm"
            className="rounded-xl"
            onClick={() => editing ? setEditing(false) : setEditing(true)}
          >
            {editing ? <><X className="mr-2 h-4 w-4" /> Cancelar</> : <><Edit3 className="mr-2 h-4 w-4" /> Editar</>}
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              <User className="h-4 w-4" /> Datos personales
            </h3>
            <div className="space-y-3">
              <Field label="Nombre completo" value={profile.name} icon={User} editing={editing} onChange={(v) => setProfile({...profile, name: v})} />
              <Field label="Email" value={profile.email} icon={Mail} editing={editing} onChange={(v) => setProfile({...profile, email: v})} />
              <Field label="Teléfono" value={profile.phone} icon={Phone} editing={editing} onChange={(v) => setProfile({...profile, phone: v})} />
              <Field label="NIF / CIF" value={profile.nif} icon={FileText} editing={editing} onChange={(v) => setProfile({...profile, nif: v})} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              <Building2 className="h-4 w-4" /> Datos del negocio
            </h3>
            <div className="space-y-3">
              <Field label="Nombre del negocio" value={profile.business} icon={Building2} editing={editing} onChange={(v) => setProfile({...profile, business: v})} />
              <div className="flex items-start gap-3 rounded-xl bg-secondary/50 p-3">
                <ShoppingBag className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Tipo de negocio</p>
                  {editing ? (
                    <select
                      value={profile.type}
                      onChange={(e) => setProfile({...profile, type: e.target.value as any})}
                      className="mt-1 w-full rounded-lg border bg-card px-3 py-1.5 text-sm outline-none"
                    >
                      <option value="kiosco">Kiosco</option>
                      <option value="bar">Bar / Restaurante</option>
                      <option value="gasolinera">Gasolinera</option>
                      <option value="tienda">Tienda</option>
                    </select>
                  ) : (
                    <p className="text-sm font-medium capitalize">{profile.type}</p>
                  )}
                </div>
              </div>
              <Field label="Dirección" value={profile.address} icon={MapPin} editing={editing} onChange={(v) => setProfile({...profile, address: v})} />
              <Field label="Zona" value={profile.zone} icon={MapPin} editing={editing} onChange={(v) => setProfile({...profile, zone: v})} />
              <div className="flex items-start gap-3 rounded-xl bg-secondary/50 p-3">
                <Globe className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Idioma</p>
                  {editing ? (
                    <select
                      value={profile.language}
                      onChange={(e) => setProfile({...profile, language: e.target.value as any})}
                      className="mt-1 w-full rounded-lg border bg-card px-3 py-1.5 text-sm outline-none"
                    >
                      <option value="es">Español</option>
                      <option value="gl">Gallego</option>
                    </select>
                  ) : (
                    <p className="text-sm font-medium">{profile.language === "es" ? "Español" : "Gallego"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {editing && (
          <div className="mt-6 flex justify-end animate-fade-in">
            <Button onClick={handleSave} className="rounded-xl px-8">
              <Save className="mr-2 h-4 w-4" /> Guardar cambios
            </Button>
          </div>
        )}
      </div>

      {/* Member since */}
      <div className="mt-6 rounded-xl border bg-card p-4 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <Calendar className="mx-auto mb-1 h-4 w-4" />
        Cliente desde {new Date(profile.joinedDate).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
      </div>
    </div>
  );
}

function Field({ label, value, icon: Icon, editing, onChange }: {
  label: string; value: string; icon: React.ElementType; editing: boolean; onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-secondary/50 p-3">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        {editing ? (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 h-8 border-0 bg-card px-2 text-sm"
          />
        ) : (
          <p className="text-sm font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}
