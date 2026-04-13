import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "¿Qué es PidoYA?", a: "PidoYA es una plataforma B2B de pedidos mayoristas de golosinas, snacks, caramelos y bebidas. Permite a kioscos, bares, gasolineras y tiendas hacer sus pedidos en menos de 2 minutos." },
  { q: "¿Tiene algún coste?", a: "No, PidoYA es completamente gratis para los clientes. Sin cuotas mensuales ni permanencia." },
  { q: "¿Cómo me registro?", a: "Puedes darte de alta de forma autónoma con tu email o teléfono. También puedes usar un código de invitación si lo tienes." },
  { q: "¿Qué es la Zona Outlet?", a: "Es una sección con productos con descuentos del 30-40%. Perfecta para conseguir las mejores ofertas y rotar stock rápidamente. Los productos se actualizan frecuentemente." },
  { q: "¿Cómo hago un pedido?", a: "Busca productos en el catálogo, añádelos al carrito, ajusta cantidades y pulsa 'Finalizar pedido'. Puedes añadir comentarios al pedido. ¡Así de simple!" },
  { q: "¿Puedo repetir un pedido anterior?", a: "Sí, desde el panel 'Mis Pedidos' puedes repetir cualquier pedido anterior con un solo clic." },
  { q: "¿Cuántos productos hay disponibles?", a: "Actualmente contamos con más de 1.800 referencias de las mejores marcas: Haribo, Lays, Coca-Cola, Fini, Vidal, y muchas más." },
  { q: "¿En qué idiomas está disponible?", a: "PidoYA está disponible en Español y Gallego. Puedes cambiar el idioma desde tu perfil." },
  { q: "¿Cómo puedo ver el estado de mi pedido?", a: "Desde el panel de control verás el estado de cada pedido: Recibido, Gestionado o Entregado. También recibirás notificaciones push con cada cambio." },
  { q: "¿Necesito pagar online?", a: "No. Los pedidos se envían sin pago online. La facturación se gestiona directamente con el distribuidor como siempre." },
  { q: "¿Puedo contactar con soporte?", a: "Sí, tenemos un formulario de contacto disponible en la sección 'Contacto'. También puedes llamarnos o enviarnos un email." },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold">Preguntas Frecuentes</h1>
        <p className="mt-1 text-muted-foreground">Todo lo que necesitas saber sobre PidoYA</p>
      </div>

      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="animate-fade-in" style={{ animationDelay: `${i * 0.03}s` }}>
            <AccordionTrigger className="text-left text-base font-medium hover:text-primary transition-colors">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 rounded-2xl border bg-card p-6 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <MessageSquare className="mx-auto h-8 w-8 text-primary" />
        <h3 className="mt-3 font-bold text-lg">¿No encuentras tu respuesta?</h3>
        <p className="mt-1 text-sm text-muted-foreground">Contacta con nosotros y te ayudaremos encantados</p>
        <Link to="/contacto">
          <Button className="mt-4 rounded-xl">
            Contactar <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
