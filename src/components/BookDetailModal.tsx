// src/components/BookDetailModal.tsx
import type { Book } from './CartContext';
import { useCart } from './CartContext';


type Props = {
  book: Book;
  onClose: () => void;
};

export function BookDetailModal({ book, onClose }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <img
          src={book.cover}
          alt={book.title}
          style={{ width: '150px', marginBottom: '1rem' }}
        />
        <h2>{book.title}</h2>
        <p><strong>{book.author}</strong></p>
        <p><em>{book.genre}</em></p>
        <p>{book.description}</p>
        <p className="price">{book.price.toFixed(2)} €</p>
        <button className="modal-button" onClick={() => addToCart(book)}>
          Zum Warenkorb hinzufügen
        </button>
      </div>
    </div>
  );
}
