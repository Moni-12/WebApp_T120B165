import { Author } from "./Author";

interface Book {
    id: number;
    title: string;
    description: string;
    releaseDate: Date;
    genre: string;
    author: Author;
  }

export type {
    Book
}