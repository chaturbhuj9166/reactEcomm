import { useCart } from "../context/CartProvider";
import { useCurrency } from "../context/CurrencyProvider";
import "./Cart.css";

const Cart = () => {
  const { cart, setCart } = useCart();
  const { currency, convert } = useCurrency();

  function increment(id) {
    setCart(cart.map((obj) => obj._id === id ? { ...obj, quantity: obj.quantity + 1 } : obj));
  }

  function decrement(id) {
    setCart(cart.map((obj) => obj._id === id ? { ...obj, quantity: Math.max(obj.quantity - 1, 1) } : obj));
  }

  function handleRemove(id) {
    setCart(cart.filter((obj) => obj._id !== id));
  }

  function totalPrice() {
    return cart.reduce((sum, obj) => sum + (obj.price || 0) * (obj.quantity || 1), 0);
  }

  return (
    <div className="cart-container">
      <main className="cart-main">
        <section className="cart-items">
          <div className="cart-items-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Action</span>
          </div>

          {cart.length === 0 ? (
            <p className="empty-message">Your cart is empty 🛒</p>
          ) : (
            cart.map((obj) => (
              <div key={obj._id} className="cart-item">
                <div className="product-info">
                  <img src={obj.image} alt={obj.name} className="product-image" />
                  <div className="product-details">
                    <h3>{obj.name}</h3>
                    <p>Color: {obj.color || "Coffee"}</p>
                  </div>
                </div>

                <div className="quantity-control">
                  <button onClick={() => decrement(obj._id)}>-</button>
                  <span>{obj.quantity}</span>
                  <button onClick={() => increment(obj._id)}>+</button>
                </div>

                <div className="price">
                  {currency} {(convert((obj.price || 0) * (obj.quantity || 1))).toFixed(2)}
                </div>

                <div className="remove">
                  <button onClick={() => handleRemove(obj._id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </section>

        <aside className="summary">
          <h2>Order Summary</h2>
          <div className="summary-line">
            <span>Total:</span>
            <strong>{currency} {convert(totalPrice()).toFixed(2)}</strong>
          </div>

          <button className="checkout-btn">Checkout Now</button>
        </aside>
      </main>
    </div>
  );
};

export default Cart;
