type Props = {
  onSelect: (genre: string | null) => void;
  selectedGenre: string | null;
};

const genres = ['Alle', 'Roman', 'Fantasy', 'Horror', 'Sachbuch'];

export function GenreNavigation({ onSelect, selectedGenre }: Props) {
  return (
    <div className="genres">
      {genres.map((g) => (
        <button
          key={g}
          className={selectedGenre === g || (g === 'Alle' && selectedGenre === null) ? 'active' : ''}
          onClick={() => onSelect(g === 'Alle' ? null : g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
