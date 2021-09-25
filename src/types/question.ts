import { Category } from "./category";

export interface Question {
  id: string;
  body: string;
  category: Category;
}