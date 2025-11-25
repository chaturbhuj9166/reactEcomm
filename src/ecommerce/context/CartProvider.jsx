// src/contexts/CartProvider.jsx
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthProvider";
import { db } from "../pages/Firebase";
import { doc, setDoc } from "firebase/firestore";

const cartContext = createContext();

const localStorageCart = () => {
  const stored = localStorage.getItem("storedCart");
  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: localStorageCart(),
};

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}

export function useCart() {
  return useContext(cartContext);
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { firebaseUser } = useAuth();

  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Sync to Firestore per-user
  useEffect(() => {
    async function syncToFirestore() {
      if (!firebaseUser) return;
      try {
        for (const item of state.cart) {
          await setDoc(doc(db, "user_cart", `${firebaseUser.uid}_${item._id}`), {
            ...item,
            userId: firebaseUser.uid,
            updatedAt: new Date(),
          });
        }
      } catch (err) {
        console.log("Cart sync failed:", err);
      }
    }
    syncToFirestore();
  }, [state.cart, firebaseUser]);

  const setCart = (payload) => dispatch({ type: "SET_CART", payload });

  return (
    <cartContext.Provider
      value={{
        cart: state.cart,
        setCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;