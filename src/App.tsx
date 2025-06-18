import { useState } from 'react';
import './index.css';
import { Navbar } from './components/Navbar';
import { GenreNavigation } from './components/GenreNavigation';
import { BookList } from './components/BookList';

function App() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  return (
    <div className="app">
      <Navbar />
      <GenreNavigation onSelect={setSelectedGenre} selectedGenre={selectedGenre} />
      <BookList genre={selectedGenre} />
    </div>
  );
}

export default App;
