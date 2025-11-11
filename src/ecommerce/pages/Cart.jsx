import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import instance from "../config/axiosConfig";
import "./Cart.css"; 

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("storedCart") !== null
      ? JSON.parse(localStorage.getItem("storedCart"))
      : []
  );

  const { cart } = useCart();
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    getCartProducts();
  }, [cart]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const newQuantities = cart.map((item) =>
        item && typeof item.quantity === "number" && item.quantity > 0
          ? item.quantity
          : 1
      );
      setQuantity(newQuantities);
    } else {
      setQuantity([]);
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(cartItems));
  }, [cartItems]);

  async function getCartProducts() {
    const promises = cart.map((obj) =>
      instance.get("/product/product/" + obj.id)
    );
    let temp = await Promise.all(promises);
    setCartItems(temp.map((obj) => obj.data));
  }

  function handleQuantityChange(action, index) {
    setQuantity((prevQuantity) => {
      const updatedQuantities = [...prevQuantity];
      if (action === "increment") {
        updatedQuantities[index] = (updatedQuantities[index] || 1) + 1;
      } else if (action === "decrement") {
        const currentQty = updatedQuantities[index] || 1;
        updatedQuantities[index] = currentQty > 1 ? currentQty - 1 : 1;
      }
      return updatedQuantities;
    });
  }

  function totalPrice() {
    return cartItems.reduce((total, item, idx) => {
      const qty = quantity[idx] || 1;
      return total + item.price * qty;
    }, 0);
  }

  function handleRemove(id) {
    setCartItems(cartItems.filter((obj) => obj._id !== id));
  }

  return (
    <div className="cart-container">
      {/* Header */}
      {/* <header className="cart-header">
        <h1>Shopping Cart</h1>
      </header> */}

      {/* Main Content */}
      <div className="cart-content">
        {/* Left Side - Cart Items */}
        <div className="cart-items-section">
          <div className="cart-table-header">
            <span className="col-product">Product</span>
            <span className="col-quantity">Quantity</span>
            <span className="col-price">Price</span>
            <span className="col-action">Action</span>
          </div>

          {cartItems.map((obj, index) => (
            <div key={obj._id} className="cart-item-row">
              <div className="cart-product-info">
                <img src={obj.image} alt={obj.name} className="cart-product-img" />
                <div className="cart-product-details">
                  <h3>{obj.name}</h3>
                  <p>Color: {obj.color || "Coffee"}</p>
                </div>
              </div>

              <div className="cart-quantity-controls">
                <button onClick={() => handleQuantityChange("decrement", index)}>
                  <span className="plus">-</span>
                </button>
                <span>{quantity[index] || 1}</span>
                <button onClick={() => handleQuantityChange("increment", index)}>
                  <span className="plus">+</span>
                </button>
              </div>

              <div className="cart-item-price">
                ₹{obj.price * (quantity[index] || 1)}
              </div>

              <div className="cart-item-action">
                <button onClick={() => handleRemove(obj._id)}>Delete</button>
              </div>
            </div>
          ))}

          {/* <div className="cart-update">
            <button>Update Cart</button>
          </div> */}
        </div>

        {/* Right Side - Order Summary */}
        <div className="cart-summary-section">
          <h2>Order Summary</h2>
          <div className="cart-summary-total">
            <span>Total:</span>
            <strong>₹{totalPrice()}</strong>
          </div>

          {/* <div className="cart-summary-checkout">
            <button>Checkout Now</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
