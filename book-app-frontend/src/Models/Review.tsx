import { Book } from "./Book";
import { User } from "./User";

interface Review {
    id: number;
    content: string;
    creationDate: string;
    userName: string;
    userId: string;
  }

export type {
    Review
}