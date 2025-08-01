import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import NewSaleForm from "../features/admin/pages/newSaleForm";
import UserManagement from "../features/admin/pages/userManagement";
import Login from "../features/auth/loginPage";
import Dashboard from "../features/dashboard/dashboard";
import NotFound from "../features/notFound";
import SalesDetails from "../features/sales/pages/salesDetails";
import SalesList from "../features/sales/pages/salesList";

function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vendas" element={<SalesList />} />
        <Route path="/vendas/:id" element={<SalesDetails />} />
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin/usuarios" element={<UserManagement />} />
        <Route path="/admin/nova-venda" element={<NewSaleForm />} />
      </Route>

      {/* 404 page */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
