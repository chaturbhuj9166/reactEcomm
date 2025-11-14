import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { useCurrency } from "../context/CurrencyProvider";

function Header() {
    const { cart } = useCart();
    const { isLoggedIn, logout } = useAuth();
    const { currency, setCurrency } = useCurrency();

    return (
        <header>
            <h1>
                <NavLink to="/">Ecommerce</NavLink>
            </h1>

            <nav>
                <ul>
                    <li>
                        <NavLink to="/cart">Cart ({cart.length})</NavLink>
                    </li>

                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>

                    <li>
                        {isLoggedIn ? (
                            <button onClick={logout}>Logout</button>
                        ) : (
                            <NavLink to="/login">Login</NavLink>
                        )}
                    </li>

                    <li>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
