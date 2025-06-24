import { describe, it, expect } from 'vitest'
import { calculateTotal } from '../utils/calculateTotal' 

describe('calculateTotal', () => {
  it('berechnet den Gesamtpreis korrekt', () => {
    const books = [
      { id: '1', title: 'A', author: 'X', genre: 'F', price: 10, cover: '', description: '' },
      { id: '2', title: 'B', author: 'Y', genre: 'F', price: 5.5, cover: '', description: '' },
    ]
    expect(calculateTotal(books)).toBe(15.5)
  })
})
