import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Qué es PidoYA?",
    a: "PidoYA es una plataforma B2B de pedidos mayoristas de golosinas, snacks, caramelos y bebidas. Permite a kioscos, bares, gasolineras y tiendas hacer sus pedidos en menos de 2 minutos.",
  },
  {
    q: "¿Tiene algún coste?",
    a: "No, PidoYA es completamente gratis para los clientes. Sin cuotas mensuales ni permanencia.",
  },
  {
    q: "¿Qué es la Zona Outlet?",
    a: "Es una sección con productos con descuentos del 30-40%. Perfecta para conseguir las mejores ofertas y rotar stock rápidamente.",
  },
  {
    q: "¿Cómo hago un pedido?",
    a: "Busca productos en el catálogo, añádelos al carrito, ajusta cantidades y pulsa 'Finalizar pedido'. ¡Así de simple!",
  },
  {
    q: "¿Puedo repetir un pedido anterior?",
    a: "Sí, desde el panel 'Mis Pedidos' puedes repetir cualquier pedido anterior con un solo clic.",
  },
  {
    q: "¿Cuántos productos hay disponibles?",
    a: "Actualmente contamos con más de 1.800 referencias de las mejores marcas: Haribo, Lays, Coca-Cola, Fini, Vidal, y muchas más.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Preguntas Frecuentes</h1>
      <p className="mt-1 text-muted-foreground">Todo lo que necesitas saber sobre PidoYA</p>

      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
