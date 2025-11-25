import React, { useEffect } from "react";
import { useCart } from "../context/CartProvider";
import { useCurrency } from "../context/CurrencyProvider";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../pages/Firebase.js";
import "./Cart.css";

const Cart = () => {
  const { cart, setCart } = useCart();
  const { convert, currency } = useCurrency();

  useEffect(() => {
    const stored = localStorage.getItem("storedCart");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCart(parsed.map((obj) => ({ ...obj, quantity: obj.quantity ?? 1 })));
    } else if (cart.length > 0) {
      setCart(cart.map((obj) => ({ ...obj, quantity: obj.quantity ?? 1 })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(cart));

    cart.forEach(async (item) => {
      try {
        await setDoc(doc(db, "user_cart", item._id), {
          ...item,
          updatedAt: new Date(),
        });
      } catch (err) {
        console.log("Firebase Update Error:", err);
      }
    });
  }, [cart]);

  function quantityPlus(id) {
    setCart(cart.map((obj) => (obj._id === id ? { ...obj, quantity: obj.quantity + 1 } : obj)));
  }

  function quantityLess(id) {
    setCart(
      cart.map((obj) =>
        obj._id === id ? { ...obj, quantity: obj.quantity > 1 ? obj.quantity - 1 : 1 } : obj
      )
    );
  }

  async function handleRemove(id) {
    setCart(cart.filter((obj) => obj._id !== id));
    try {
      await deleteDoc(doc(db, "user_cart", id));
      console.log("Firebase item deleted");
    } catch (err) {
      console.log("Firebase Delete Error:", err);
    }
  }

  const grandTotal = cart.reduce((acc, obj) => acc + convert(obj.price * obj.quantity), 0).toFixed(2);

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">Sorry your cart is empty</div>
      ) : (
        <div className="cart-items">
          {cart.map((obj) => (
            <div key={obj._id} className="cart-item">
              <button className="cart-remove-btn" onClick={() => handleRemove(obj._id)}>❌</button>

              <div className="cart-item-info">
                <img src={obj.image} alt={obj.name} className="cart-item-img" />
                <div>
                  <h3 className="cart-item-name">{obj.name}</h3>
                  <p className="cart-item-price">{currency} {convert(obj.price).toFixed(2)}</p>
                </div>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button className="mains" onClick={() => quantityLess(obj._id)}>-</button>
                  <span>{obj.quantity}</span>
                  <button className="plus" onClick={() => quantityPlus(obj._id)}>+</button>
                </div>
                <div className="cart-item-total">
                  <p>Total</p>
                  <p>{currency} {convert(obj.price * obj.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <p>Total ({cart.length} items)</p>
            <p>{grandTotal} {currency}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
