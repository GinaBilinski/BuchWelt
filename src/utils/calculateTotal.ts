import type { Book } from '../components/CartContext'

export function calculateTotal(books: Book[]): number {
  return books.reduce((sum, b) => sum + b.price, 0)
}
