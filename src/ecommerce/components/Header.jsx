import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider"; 

function Header() {
  const { cart } = useCart();
  const { isLoggedIn, Logout } = useAuth(); 
  const navigate = useNavigate();

  async function handleLogout() {
    await Logout();      
    navigate("/login");  
  }

  return (
    <header>
      <h1>
        <NavLink to="/">Ecommerce</NavLink>
      </h1>

      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart {cart.length}</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>

      
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
