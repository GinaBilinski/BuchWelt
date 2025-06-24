// BookList.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // WICHTIG für .toBeInTheDocument()
import { BookList } from '../components/BookList';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

describe('BookList - Firestore Integration', () => {
  it('filtert Bücher nach Genre', async () => {
    // 1. Aktuelle Bücher aus der DB holen
    const snapshot = await getDocs(collection(db, "books"));
    const fantasyBooks = snapshot.docs
      .filter(doc => doc.data().genre === "Fantasy")
      .map(doc => doc.data().title);

    // 2. Komponente mit Genre-Filter rendern
    render(<BookList genre="Fantasy" />);

    // 3. Prüfen: Nur Fantasy-Bücher sichtbar?
    await waitFor(() => {
      // Alle vorhandenen Fantasy-Bücher sollten angezeigt werden
      fantasyBooks.forEach(book => {
        expect(screen.getByText(book)).toBeInTheDocument();
      });
      
      // Überprüfe, dass Nicht-Fantasy-Bücher fehlen
      const allBooks = snapshot.docs.map(doc => doc.data().title);
      const nonFantasyBooks = allBooks.filter(title => !fantasyBooks.includes(title));
      nonFantasyBooks.forEach(book => {
        expect(screen.queryByText(book)).not.toBeInTheDocument();
      });
    });
  });
});