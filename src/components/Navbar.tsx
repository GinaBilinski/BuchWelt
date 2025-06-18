import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthModal } from './AuthModal';
import { useCart } from './CartContext';
import { CartOverlay } from './CartOverlay';
import { FaShoppingCart } from 'react-icons/fa';


export function Navbar() {
  const { user, displayName } = useAuth();
  const { cart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-section">
  <button className="cart-btn" onClick={() => setShowCart(true)}>
    <FaShoppingCart /> {cart.length}
  </button>
  {showCart && <CartOverlay onClose={() => setShowCart(false)} />}
</div>

      <div className="navbar-center">
        <h1>BuchWelt</h1>
      </div>
      <div className="navbar-actions">
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>
              {displayName ?? user.email}
            </span>
            <button className="login-btn" onClick={() => signOut(auth)}>
              Logout
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={() => setShowModal(true)}>
            Login
          </button>
        )}
      </div>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </nav>
  );
}
