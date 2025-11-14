import { createBrowserRouter, RouterProvider } from "react-router-dom";

import OutletComponent from "./OutletComponent";
import Cart from "../pages/Cart";
import SingleProduct from "../pages/SingleProduct";
import First from "../pages/First";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import CartProvider from "../context/CartProvider";
import AuthProvider from "../context/AuthProvider";
import CurrencyProvider from "../context/CurrencyProvider";



const router = createBrowserRouter([
  {
    path: "/",
    element: ( 
    <CurrencyProvider>
    <OutletComponent />
    </CurrencyProvider>
    ),
    children: [
      {
        index: true,
        element: <First />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },

   
      
      
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shop",
        element: <First />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function Router() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default Router;
