// BookList.mock.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { BookList } from "../components/BookList";
import { vi } from "vitest";
import "@testing-library/jest-dom";

// --- Typen für den Mock definieren
type MockBook = {
  title: string;
  author: string;
  genre: string;
  price: number;
  cover: string;
  description: string;
};

type MockDoc = {
  id: string;
  data: () => MockBook;
};

// Firebase-Abhängigkeiten mocken
vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual<typeof import("firebase/firestore")>(
    "firebase/firestore"
  );

  return {
    ...actual,
    getDocs: vi.fn(() =>
      Promise.resolve({
        // statt (cb: any) -> sauber typisieren:
        forEach: (cb: (doc: MockDoc) => void) => {
          const mockBooks: MockDoc[] = [
            {
              id: "1",
              data: () => ({
                title: "Testbuch A",
                author: "Autor A",
                genre: "Fantasy",
                price: 9.99,
                cover: "cover-a.jpg",
                description: "Ein magisches Abenteuer",
              }),
            },
            {
              id: "2",
              data: () => ({
                title: "Testbuch B",
                author: "Autor B",
                genre: "Fantasy",
                price: 12.49,
                cover: "cover-b.jpg",
                description: "Noch ein magisches Abenteuer",
              }),
            },
          ];
          mockBooks.forEach((doc) => cb(doc));
        },
      })
    ),
  };
});

describe("BookList", () => {
  it("zeigt Bücher korrekt an", async () => {
    render(<BookList genre={null} />);

    await waitFor(() => {
      expect(screen.getByText("Testbuch A")).toBeInTheDocument();
      expect(screen.getByText("Testbuch B")).toBeInTheDocument();
      expect(screen.getByText("Autor A")).toBeInTheDocument();
      expect(screen.getByText("9.99 €")).toBeInTheDocument();
    });
  });
});
