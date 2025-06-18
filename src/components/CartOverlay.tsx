// src/components/CartOverlay.tsx
import { useCart } from './CartContext';

export function CartOverlay({ onClose }: { onClose: () => void }) {
  const { cart } = useCart();

  const total = cart.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="cart-overlay">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>Warenkorb</h3>
      {cart.length === 0 ? (
        <p>Keine Bücher im Warenkorb.</p>
      ) : (
        <ul>
          {cart.map((b, i) => (
            <li key={i}>
              <strong>{b.title}</strong> – {b.price.toFixed(2)} €
            </li>
          ))}
        </ul>
      )}
      <hr />
      <p><strong>Gesamt: {total.toFixed(2)} €</strong></p>
    </div>
  );
}
