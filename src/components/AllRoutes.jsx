import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../pages/ProductDetails";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/productDetails/:id" element={
        <PrivateRoute>
            <ProductDetails />
        </PrivateRoute>
      
      } />
      
    </Routes>
  );
}