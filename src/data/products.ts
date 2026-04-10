export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  isOutlet: boolean;
  isNew: boolean;
  outletDiscount?: number;
  unit: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Ositos de Oro",
    brand: "Haribo",
    category: "Golosinas",
    price: 1.85,
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop",
    isOutlet: false,
    isNew: false,
    unit: "bolsa 100g",
  },
  {
    id: "2",
    name: "Patatas Clásicas",
    brand: "Lays",
    category: "Snacks",
    price: 1.50,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
    isOutlet: false,
    isNew: true,
    unit: "bolsa 150g",
  },
  {
    id: "3",
    name: "Coca-Cola Original",
    brand: "Coca-Cola",
    category: "Bebidas",
    price: 0.85,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop",
    isOutlet: false,
    isNew: false,
    unit: "lata 330ml",
  },
  {
    id: "4",
    name: "Lenguas Ácidas",
    brand: "Fini",
    category: "Golosinas",
    price: 1.20,
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&h=300&fit=crop",
    isOutlet: true,
    isNew: false,
    outletDiscount: 35,
    unit: "bolsa 90g",
  },
  {
    id: "5",
    name: "Regaliz Rojo",
    brand: "Vidal",
    category: "Golosinas",
    price: 2.10,
    image: "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=300&h=300&fit=crop",
    isOutlet: true,
    isNew: false,
    outletDiscount: 40,
    unit: "bolsa 200g",
  },
  {
    id: "6",
    name: "Sugus Surtido",
    brand: "Sugus",
    category: "Caramelos",
    price: 1.95,
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop",
    isOutlet: false,
    isNew: false,
    unit: "bolsa 150g",
  },
  {
    id: "7",
    name: "Doritos Tex-Mex",
    brand: "Doritos",
    category: "Snacks",
    price: 1.75,
    image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=300&h=300&fit=crop",
    isOutlet: false,
    isNew: true,
    unit: "bolsa 150g",
  },
  {
    id: "8",
    name: "Fanta Naranja",
    brand: "Fanta",
    category: "Bebidas",
    price: 0.80,
    image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=300&h=300&fit=crop",
    isOutlet: true,
    isNew: false,
    outletDiscount: 30,
    unit: "lata 330ml",
  },
  {
    id: "9",
    name: "Gominolas Frutas",
    brand: "Haribo",
    category: "Golosinas",
    price: 2.30,
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop",
    isOutlet: false,
    isNew: false,
    unit: "bolsa 175g",
  },
  {
    id: "10",
    name: "Caramelos Menta",
    brand: "Halls",
    category: "Caramelos",
    price: 1.10,
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&h=300&fit=crop",
    isOutlet: false,
    isNew: false,
    unit: "paquete 28g",
  },
  {
    id: "11",
    name: "Pringles Original",
    brand: "Pringles",
    category: "Snacks",
    price: 2.45,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
    isOutlet: true,
    isNew: false,
    outletDiscount: 30,
    unit: "tubo 165g",
  },
  {
    id: "12",
    name: "Agua Mineral",
    brand: "Font Vella",
    category: "Bebidas",
    price: 0.45,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&h=300&fit=crop",
    isOutlet: false,
    isNew: false,
    unit: "botella 500ml",
  },
];

export const brands = [
  "Haribo", "Lays", "Coca-Cola", "Fini", "Vidal", "Sugus",
  "Doritos", "Fanta", "Halls", "Pringles", "Font Vella"
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
  status: "Recibido" | "Gestionado";
  items: { product: Product; quantity: number }[];
  total: number;
}

export const mockOrders: Order[] = [
  {
    id: "PY-001",
    date: "2026-04-08",
    status: "Gestionado",
    items: [
      { product: products[0], quantity: 24 },
      { product: products[2], quantity: 48 },
      { product: products[6], quantity: 12 },
    ],
    total: 129.60,
  },
  {
    id: "PY-002",
    date: "2026-04-05",
    status: "Recibido",
    items: [
      { product: products[3], quantity: 36 },
      { product: products[4], quantity: 18 },
      { product: products[7], quantity: 24 },
    ],
    total: 100.20,
  },
  {
    id: "PY-003",
    date: "2026-03-28",
    status: "Gestionado",
    items: [
      { product: products[1], quantity: 30 },
      { product: products[9], quantity: 50 },
    ],
    total: 100.00,
  },
];
