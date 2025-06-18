import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Book } from './CartContext';
import { BookDetailModal } from './BookDetailModal';

type Props = {
  genre: string | null;
};

export function BookList({ genre }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const data: Book[] = [];
      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        if (!genre || genre === 'Alle' || d.genre === genre) {
          data.push({
            id: docSnap.id,
            title: d.title,
            author: d.author,
            genre: d.genre,
            price: d.price,
            cover: d.cover,
            description: d.description,
          });
        }
      });
      setBooks(data);
    };

    fetchBooks();
  }, [genre]);

  return (
    <div className="book-list">
      {books.map((book) => (
        <div
          key={book.id}
          className="book-card"
          onClick={() => setSelectedBook(book)}
        >
          <img src={book.cover} alt={book.title} />
          <h2>{book.title}</h2>
          <p><strong>{book.author}</strong></p>
          <p>{book.genre}</p>
          <p className="price">{book.price.toFixed(2)} €</p>
        </div>
      ))}

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}