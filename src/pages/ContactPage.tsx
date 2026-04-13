import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mail, Phone, MapPin, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold">Contacto</h1>
        <p className="mt-1 text-muted-foreground">¿Tienes alguna duda? Escríbenos y te responderemos lo antes posible.</p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-5">
        {/* Contact info */}
        <div className="space-y-4 md:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="rounded-2xl border bg-card p-6 space-y-6">
            <h3 className="font-bold text-lg">Información</h3>
            {[
              { icon: Mail, label: "Email", value: "pedidos@pidoya.es" },
              { icon: Phone, label: "Teléfono", value: "981 123 456" },
              { icon: MapPin, label: "Dirección", value: "Polígono Industrial, 15008 A Coruña" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold text-lg">Horario</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Lun - Vie</span><span className="font-medium">8:00 - 18:00</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sábado</span><span className="font-medium">9:00 - 14:00</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Domingo</span><span className="font-medium text-destructive">Cerrado</span></div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-3 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-12 text-center animate-scale-in">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h3 className="mt-4 text-xl font-bold">¡Mensaje enviado!</h3>
              <p className="mt-2 text-muted-foreground">Te responderemos en menos de 24 horas.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Envíanos un mensaje</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Nombre</label>
                  <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="mt-1 rounded-xl" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="mt-1 rounded-xl" placeholder="tu@email.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Asunto</label>
                <Input value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} required className="mt-1 rounded-xl" placeholder="¿En qué podemos ayudarte?" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Mensaje</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  required
                  rows={5}
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              <Button type="submit" className="w-full rounded-xl py-5 text-base font-bold">
                <Send className="mr-2 h-4 w-4" /> Enviar mensaje
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
