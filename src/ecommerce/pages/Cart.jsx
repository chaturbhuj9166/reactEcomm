import { useEffect } from "react";
import { useCart } from "../context/CartProvider";
import {useCurrency} from "./ecommerce/context/CurrencyProvider";
import "./Cart.css"


const Cart = () => {
    const { cart, setCart } = useCart();
    const { currency, convert } = useCurrency();


    useEffect(() => {
        localStorage.setItem("storedCart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const stored = localStorage.getItem("storedCart");
        if (stored) {
            const parsed = JSON.parse(stored);
            setCart(
                parsed.map((obj) => (
                    { ...obj, quantity: obj.quantity ?? 1 }
                ))
            )
        }
        else if (cart.length > 0) {
            setCart(
                cart.map((obj) => (
                    { ...obj, quantity: obj.quantity ?? 1 }
                ))
            )
        }
    }, [])

    function increment(id) {

        setCart(cart.map((obj) => {
            if (obj._id === id) {
                return { ...obj, quantity: obj.quantity + 1 }
            }
            return obj;
        }))
    }

    function decrement(id) {
        setCart(
            cart.map((obj) => {
                if (obj._id === id) {
                    return { ...obj, quantity: obj.quantity > 1 ? obj.quantity - 1 : 1 };
                }
                return obj;
            })
        )
    }


    function handleRemove(id) {
        setCart(cart.filter(obj => obj._id !== id));
    }

    function totalPrice() {
        return cart.reduce((sum, obj) => sum + obj.quantity * obj.price, 0)
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
                        cart.map((obj, index) => (
                            <div key={obj._id} className="cart-item">
                                <div className="product-info">
                                    <img src={obj.image} alt={obj.name} className="product-image" />
                                    <div className="product-details">
                                        <h3>{(obj.name)}</h3>
                                        <p>Color: {obj.color || "Coffee"}</p>
                                    </div>
                                </div>

                                <div className="quantity-control">
                                    <button onClick={() => decrement(obj._id)}>-</button>
                                    <span>{obj.quantity}</span>
                                    <button onClick={() => increment(obj._id)}>+</button>
                                </div>

                                {/* <div className="price">₹{obj.price * (obj.quantity)}</div> */}
                                <div className="price">
                                    {currency} {convert(obj.price * obj.quantity).toFixed(2)}
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
                        {/* <strong>₹{totalPrice()}</strong> */}
                        <strong>
                            {currency} {convert(totalPrice()).toFixed(2)}
                        </strong>

                    </div>

                    <div className="warranty">
                       
                    </div>

                    <button className="checkout-btn">Checkout Now</button>
                </aside>
            </main>
        </div>
    );
};

export default Cart;

// // function handleQuantityChange(action, index) {
// //     setQuantity(prev => {
// //         const updated = [...prev];
// //         if (action === "increment") updated[index] = (updated[index] || 1) + 1;
// //         if (action === "decrement") updated[index] = Math.max((updated[index] || 1) - 1, 1);
// //         return updated;
// //     });
// // }

// {/* <button onClick={() => handleQuantityChange("decrement", index)}>-</button>
//                                         <span>{quantity[index] || 1}</span>
//                                         <button onClick={() => handleQuantityChange("increment", index)}>+</button> */}