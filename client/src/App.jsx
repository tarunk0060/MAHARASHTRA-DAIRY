import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import Quality from "./pages/Quality.jsx";
import Contact from "./pages/Contact.jsx";
import { AdminAuthProvider } from "./admin/context/AdminAuthContext.jsx";
import ProtectedAdminRoute from "./admin/components/ProtectedAdminRoute.jsx";
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import AdminProducts from "./admin/pages/AdminProducts.jsx";
import AddProduct from "./admin/pages/AddProduct.jsx";
import EditProduct from "./admin/pages/EditProduct.jsx";
import AdminEnquiries from "./admin/pages/AdminEnquiries.jsx";
import AdminContent from "./admin/pages/AdminContent.jsx";
import AdminSettings from "./admin/pages/AdminSettings.jsx";
import AdminProfile from "./admin/pages/AdminProfile.jsx";
import "./admin/styles/admin.css";

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AdminAuthProvider>
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedAdminRoute>
                <AdminProducts />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/products/add"
            element={
              <ProtectedAdminRoute>
                <AddProduct />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/products/:id"
            element={
              <ProtectedAdminRoute>
                <EditProduct />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedAdminRoute>
                <AdminEnquiries />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/content"
            element={
              <ProtectedAdminRoute>
                <AdminContent />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute>
                <AdminSettings />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedAdminRoute>
                <AdminProfile />
              </ProtectedAdminRoute>
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </AdminAuthProvider>
  );
}
