import { Book } from "./Book";
import { User } from "./User";

interface Review {
    id: number;
    content: string;
    creationDate: string;
    book: Book;
    user: User;
  }

export type {
    Review
}