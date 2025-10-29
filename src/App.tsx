import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PostListing from "./pages/PostListing";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import ListingManagement from "./pages/admin/ListingManagement";
import FlaggedContent from "./pages/admin/FlaggedContent";
import PaymentManagement from "./pages/admin/PaymentManagement";
import Analytics from "./pages/admin/Analytics";
import CMS from "./pages/admin/CMS";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post-listing" element={<PostListing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/listings" element={<ListingManagement />} />
          <Route path="/admin/flagged" element={<FlaggedContent />} />
          <Route path="/admin/payments" element={<PaymentManagement />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/cms" element={<CMS />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
