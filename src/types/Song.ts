import { Author } from "@/types/Author";

export type Song = {
  id: string;
  title: string;
  duration: string;
  imageUrl: string;
  fileUrl: string;
  authors: Author[];
}