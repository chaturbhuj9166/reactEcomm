import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthProvider";
import { db, doc, setDoc, onSnapshot } from "../pages/Firebase.js";

const cartContext = createContext();

export function useCart() {
  return useContext(cartContext);
}

export default function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("storedCart");
    return stored ? JSON.parse(stored) : [];
  });

  const skipSaveRef = useRef(true);

  useEffect(() => {
    if (!user || !user.uid) {
      skipSaveRef.current = false;
      return;
    }

    const cartRef = doc(db, "carts", user.uid);

    const unsubscribe = onSnapshot(cartRef, (snap) => {
      if (snap.exists()) {
        const serverItems = snap.data().items || [];
        // Firestore से load करते समय quantity default set करना
const itemsWithQty = serverItems.map(item => ({
  ...item,
  quantity: item.quantity ?? 1   // अगर undefined हो तो 1 set करो
}));
setCart(itemsWithQty);

      } else {
        setCart([]);
      }
      skipSaveRef.current = false;
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(cart));

    const saveCart = async () => {
      if (!user || !user.uid) return;
      if (skipSaveRef.current) return;

      try {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: cart });
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    };

    saveCart();
  }, [cart, user]);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}
