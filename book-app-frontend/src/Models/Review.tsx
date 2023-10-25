import { Book } from "./Book";

interface Review {
    id: number;
    content: string;
    creationDate: string;
    book: Book;
    userId: string;
    username: string;
  }

export type {
    Review
}