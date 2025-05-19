
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BusManagement from "./pages/BusManagement";
import BusOperators from "./pages/BusManagement/BusOperators";
import BusOperatorDetails from "./pages/BusManagement/BusOperatorDetails";
import BusOperatorBuses from "./pages/BusManagement/BusOperatorBuses";
import BusBookings from "./pages/BusManagement/BusBookings";
import HotelManagement from "./pages/HotelManagement";
import HotelManagers from "./pages/HotelManagement/HotelManagers";
import HotelManagerDetails from "./pages/HotelManagement/HotelManagerDetails";
import HotelBookings from "./pages/HotelManagement/HotelBookings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bus-management" element={<BusManagement />}>
              <Route index element={<BusOperators />} />
              <Route path="operators" element={<BusOperators />} />
              <Route path="operators/:id" element={<BusOperatorDetails />} />
              <Route path="operators/:id/buses" element={<BusOperatorBuses />} />
              <Route path="bookings" element={<BusBookings />} />
            </Route>
            <Route path="/hotel-management" element={<HotelManagement />}>
              <Route index element={<HotelManagers />} />
              <Route path="managers" element={<HotelManagers />} />
              <Route path="managers/:id" element={<HotelManagerDetails />} />
              <Route path="bookings" element={<HotelBookings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
