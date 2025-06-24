import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BookDetailModal } from '../components/BookDetailModal'

describe('BookDetailModal', () => {
  const mockBook = {
    id: '1',
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    price: 12.99,
    genre: 'Fantasy',
    cover: 'cover.jpg',
    description: 'Magisches Buch',
  }

  it('zeigt alle Buchdetails korrekt an', () => {
    render(<BookDetailModal book={mockBook} onClose={() => {}} />)

    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('J.K. Rowling')).toBeInTheDocument()
    expect(screen.getByText('Fantasy')).toBeInTheDocument()
    expect(screen.getByText('Magisches Buch')).toBeInTheDocument()
    expect(screen.getByText('12.99 €')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /zum warenkorb hinzufügen/i })).toBeInTheDocument()

  })
})
