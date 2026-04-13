export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  isOutlet: boolean;
  isNew: boolean;
  isFeatured?: boolean;
  available?: boolean;
  outletDiscount?: number;
  unit: string;
  ean?: string;
  sku?: string;
}

export const products: Product[] = [
  { id: "1", name: "Ositos de Oro", brand: "Haribo", category: "Golosinas", price: 1.85, image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop", isOutlet: false, isNew: false, isFeatured: true, available: true, unit: "bolsa 100g", ean: "4001686301036", sku: "HAR-001" },
  { id: "2", name: "Patatas Clásicas", brand: "Lays", category: "Snacks", price: 1.50, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop", isOutlet: false, isNew: true, isFeatured: true, available: true, unit: "bolsa 150g", ean: "8410199012340", sku: "LAY-001" },
  { id: "3", name: "Coca-Cola Original", brand: "Coca-Cola", category: "Bebidas", price: 0.85, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop", isOutlet: false, isNew: false, isFeatured: true, available: true, unit: "lata 330ml", ean: "5449000000996", sku: "COC-001" },
  { id: "4", name: "Lenguas Ácidas", brand: "Fini", category: "Golosinas", price: 1.20, image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&h=300&fit=crop", isOutlet: true, isNew: false, outletDiscount: 35, available: true, unit: "bolsa 90g", ean: "8410525150012", sku: "FIN-001" },
  { id: "5", name: "Regaliz Rojo", brand: "Vidal", category: "Golosinas", price: 2.10, image: "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=300&h=300&fit=crop", isOutlet: true, isNew: false, outletDiscount: 40, available: true, unit: "bolsa 200g", ean: "8410525150029", sku: "VID-001" },
  { id: "6", name: "Sugus Surtido", brand: "Sugus", category: "Caramelos", price: 1.95, image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop", isOutlet: false, isNew: false, available: true, unit: "bolsa 150g", ean: "7622300123456", sku: "SUG-001" },
  { id: "7", name: "Doritos Tex-Mex", brand: "Doritos", category: "Snacks", price: 1.75, image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=300&h=300&fit=crop", isOutlet: false, isNew: true, isFeatured: true, available: true, unit: "bolsa 150g", ean: "8410199012357", sku: "DOR-001" },
  { id: "8", name: "Fanta Naranja", brand: "Fanta", category: "Bebidas", price: 0.80, image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=300&h=300&fit=crop", isOutlet: true, isNew: false, outletDiscount: 30, available: true, unit: "lata 330ml", ean: "5449000017888", sku: "FAN-001" },
  { id: "9", name: "Gominolas Frutas", brand: "Haribo", category: "Golosinas", price: 2.30, image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop", isOutlet: false, isNew: false, available: true, unit: "bolsa 175g", ean: "4001686301043", sku: "HAR-002" },
  { id: "10", name: "Caramelos Menta", brand: "Halls", category: "Caramelos", price: 1.10, image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&h=300&fit=crop", isOutlet: false, isNew: false, available: false, unit: "paquete 28g", ean: "7622210123456", sku: "HAL-001" },
  { id: "11", name: "Pringles Original", brand: "Pringles", category: "Snacks", price: 2.45, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop", isOutlet: true, isNew: false, outletDiscount: 30, available: true, unit: "tubo 165g", ean: "5053990101234", sku: "PRI-001" },
  { id: "12", name: "Agua Mineral", brand: "Font Vella", category: "Bebidas", price: 0.45, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&h=300&fit=crop", isOutlet: false, isNew: false, available: true, unit: "botella 500ml", ean: "8410580211234", sku: "FON-001" },
  { id: "13", name: "Nubes Marshmallow", brand: "Haribo", category: "Golosinas", price: 1.65, image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop", isOutlet: false, isNew: true, isFeatured: true, available: true, unit: "bolsa 100g", ean: "4001686301050", sku: "HAR-003" },
  { id: "14", name: "Monster Energy", brand: "Monster", category: "Bebidas", price: 1.45, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop", isOutlet: false, isNew: true, available: true, unit: "lata 500ml", ean: "5060166691234", sku: "MON-001" },
  { id: "15", name: "Cheetos Pelotazos", brand: "Cheetos", category: "Snacks", price: 1.35, image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=300&h=300&fit=crop", isOutlet: true, isNew: false, outletDiscount: 25, available: true, unit: "bolsa 130g", ean: "8410199012364", sku: "CHE-001" },
  { id: "16", name: "Piruleta Kojak", brand: "Fiesta", category: "Caramelos", price: 0.35, image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&h=300&fit=crop", isOutlet: false, isNew: false, isFeatured: true, available: true, unit: "unidad", ean: "8410525160012", sku: "FIE-001" },
];

export const brands = [
  "Haribo", "Lays", "Coca-Cola", "Fini", "Vidal", "Sugus",
  "Doritos", "Fanta", "Halls", "Pringles", "Font Vella", "Monster", "Cheetos", "Fiesta"
];

export const categories = [
  { id: "all", label: "Todos", icon: "grid" },
  { id: "Golosinas", label: "Golosinas", icon: "candy" },
  { id: "Snacks", label: "Snacks", icon: "cookie" },
  { id: "Caramelos", label: "Caramelos", icon: "star" },
  { id: "Bebidas", label: "Bebidas", icon: "cup" },
  { id: "outlet", label: "Outlet", icon: "fire" },
];

export interface Order {
  id: string;
  date: string;
  status: "Recibido" | "Gestionado" | "Entregado";
  items: { product: Product; quantity: number }[];
  total: number;
  comment?: string;
}

export const mockOrders: Order[] = [
  { id: "PY-001", date: "2026-04-08", status: "Gestionado", items: [{ product: products[0], quantity: 24 }, { product: products[2], quantity: 48 }, { product: products[6], quantity: 12 }], total: 129.60 },
  { id: "PY-002", date: "2026-04-05", status: "Recibido", items: [{ product: products[3], quantity: 36 }, { product: products[4], quantity: 18 }, { product: products[7], quantity: 24 }], total: 100.20 },
  { id: "PY-003", date: "2026-03-28", status: "Entregado", items: [{ product: products[1], quantity: 30 }, { product: products[9], quantity: 50 }], total: 100.00 },
  { id: "PY-004", date: "2026-03-15", status: "Entregado", items: [{ product: products[12], quantity: 20 }, { product: products[13], quantity: 12 }], total: 50.40 },
];

export interface Campaign {
  id: string;
  title: string;
  description: string;
  image?: string;
  segment: "todos" | "kioscos" | "bares" | "gasolineras";
  scheduledDate: string;
  status: "active" | "scheduled" | "completed";
}

export const mockCampaigns: Campaign[] = [
  { id: "C1", title: "Semana del Outlet", description: "¡Hasta 40% de descuento en productos seleccionados! No te lo pierdas.", segment: "todos", scheduledDate: "2026-04-10", status: "active" },
  { id: "C2", title: "Novedades Haribo", description: "Descubre las nuevas gominolas marshmallow de Haribo. Producto estrella.", segment: "kioscos", scheduledDate: "2026-04-15", status: "scheduled" },
  { id: "C3", title: "Pack Verano Bebidas", description: "Prepárate para el verano con nuestras ofertas en bebidas frías.", segment: "bares", scheduledDate: "2026-03-20", status: "completed" },
];

export interface MockClient {
  id: string;
  name: string;
  business: string;
  type: "kiosco" | "bar" | "gasolinera" | "tienda";
  zone: string;
  email: string;
  phone: string;
  status: "activo" | "inactivo" | "bloqueado";
  totalOrders: number;
  lastOrder: string;
}

export const mockClients: MockClient[] = [
  { id: "CL1", name: "María García", business: "Kiosko La Esquina", type: "kiosco", zone: "A Coruña Centro", email: "maria@kiosko.com", phone: "681234567", status: "activo", totalOrders: 45, lastOrder: "2026-04-08" },
  { id: "CL2", name: "Carlos Rodríguez", business: "Bar El Puerto", type: "bar", zone: "Vigo", email: "carlos@elpuerto.com", phone: "682345678", status: "activo", totalOrders: 32, lastOrder: "2026-04-05" },
  { id: "CL3", name: "Ana Pérez", business: "Gasolinera Repsol A-6", type: "gasolinera", zone: "Santiago", email: "ana@repsol.com", phone: "683456789", status: "activo", totalOrders: 28, lastOrder: "2026-04-01" },
  { id: "CL4", name: "Luis Fernández", business: "Tienda Dulce", type: "tienda", zone: "Ourense", email: "luis@tiendadulce.com", phone: "684567890", status: "inactivo", totalOrders: 12, lastOrder: "2026-02-15" },
  { id: "CL5", name: "Sara López", business: "Kiosko Central", type: "kiosco", zone: "Pontevedra", email: "sara@kioskocentral.com", phone: "685678901", status: "activo", totalOrders: 56, lastOrder: "2026-04-10" },
];

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "pedido" | "campaña" | "novedad" | "sistema";
  date: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  { id: "N1", title: "Pedido PY-001 gestionado", message: "Tu pedido PY-001 ha sido procesado y está preparándose.", type: "pedido", date: "2026-04-08", read: false },
  { id: "N2", title: "¡Semana del Outlet!", message: "Hasta 40% de descuento en productos seleccionados. ¡No te lo pierdas!", type: "campaña", date: "2026-04-10", read: false },
  { id: "N3", title: "Nuevos productos Haribo", message: "Nubes Marshmallow ya disponibles en el catálogo. ¡Descúbrelas!", type: "novedad", date: "2026-04-07", read: true },
  { id: "N4", title: "Pedido PY-003 entregado", message: "Tu pedido PY-003 ha sido entregado con éxito.", type: "pedido", date: "2026-03-29", read: true },
  { id: "N5", title: "Actualización de catálogo", message: "Hemos añadido 15 nuevas referencias al catálogo. Revísalas.", type: "sistema", date: "2026-04-06", read: true },
];

export const mockUserProfile = {
  id: "CL1",
  name: "María García",
  email: "maria@kiosko.com",
  phone: "681 234 567",
  business: "Kiosko La Esquina",
  type: "kiosco" as const,
  nif: "12345678A",
  address: "Calle Real 15, 15001 A Coruña",
  zone: "A Coruña Centro",
  language: "es" as const,
  joinedDate: "2025-11-15",
  avatar: "",
  totalOrders: 45,
  totalSpent: 4580.50,
  favoriteProducts: ["1", "3", "7"],
};
