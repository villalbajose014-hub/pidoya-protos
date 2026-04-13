import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { CartSidebar } from "@/components/CartSidebar";
import LandingPage from "@/pages/LandingPage";
import CatalogPage from "@/pages/CatalogPage";
import AdminPage from "@/pages/AdminPage";
import FAQPage from "@/pages/FAQPage";
import ProfilePage from "@/pages/ProfilePage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <CartSidebar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
