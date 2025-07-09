import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import UserManagement from "./pages/admin/userManagement";
import Dashboard from "./pages/dashboard/dashboard";
import NotFound from "./pages/notFound";
import Login from "./pages/public/login";
import NewSaleForm from "./pages/sales/newSaleForm";
import SalesDetails from "./pages/sales/salesDetails";
import SalesList from "./pages/sales/salesList";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vendas" element={<SalesList />} />
          <Route path="/vendas:id" element={<SalesDetails />} />
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin/usuarios" element={<UserManagement />} />
          <Route path="/admin/nova-venda" element={<NewSaleForm />} />
        </Route>

        {/* 404 page */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
