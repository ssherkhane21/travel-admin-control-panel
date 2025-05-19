
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
import TaxiManagement from "./pages/TaxiManagement";
import TaxiDrivers from "./pages/TaxiManagement/TaxiDrivers";
import TaxiDriverDetails from "./pages/TaxiManagement/TaxiDriverDetails";
import TaxiBookings from "./pages/TaxiManagement/TaxiBookings";
import BikeManagement from "./pages/BikeManagement";
import BikeRiders from "./pages/BikeManagement/BikeRiders";
import BikeRiderDetails from "./pages/BikeManagement/BikeRiderDetails";
import BikeBookings from "./pages/BikeManagement/BikeBookings";
import CustomerManagement from "./pages/CustomerManagement";
import UserManagement from "./pages/UserManagement";
import CommissionManagement from "./pages/CommissionManagement";
import CouponsManagement from "./pages/Coupons";
import WalletManagement from "./pages/Wallet";
import NotificationsManagement from "./pages/Notifications";
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
              <Route path="managers/new" element={<HotelManagerDetails />} />
              <Route path="bookings" element={<HotelBookings />} />
            </Route>
            
            <Route path="/taxi-management" element={<TaxiManagement />}>
              <Route index element={<TaxiDrivers />} />
              <Route path="drivers" element={<TaxiDrivers />} />
              <Route path="drivers/:id" element={<TaxiDriverDetails />} />
              <Route path="drivers/new" element={<TaxiDriverDetails />} />
              <Route path="bookings" element={<TaxiBookings />} />
            </Route>
            
            <Route path="/bike-management" element={<BikeManagement />}>
              <Route index element={<BikeRiders />} />
              <Route path="riders" element={<BikeRiders />} />
              <Route path="riders/:id" element={<BikeRiderDetails />} />
              <Route path="riders/new" element={<BikeRiderDetails />} />
              <Route path="bookings" element={<BikeBookings />} />
            </Route>
            
            <Route path="/customer-management" element={<CustomerManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/commission-management" element={<CommissionManagement />} />
            <Route path="/coupons" element={<CouponsManagement />} />
            <Route path="/wallet" element={<WalletManagement />} />
            <Route path="/notifications" element={<NotificationsManagement />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
