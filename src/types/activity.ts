import { Category } from "./category";
import { File } from "./file";

export interface ActivitiesProps{
  id : string;
  title : string;
  body: string;
  description: string;
  files: File[]
  category : Category
}