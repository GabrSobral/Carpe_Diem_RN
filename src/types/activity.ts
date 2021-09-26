import { Category } from "./category";

export interface ActivitiesProps{
  id : string;
  title : string;
  body: string;
  description: string;
  files: any[]
  category : Category
}