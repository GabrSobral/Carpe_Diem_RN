import { Category } from "./category";
import { File } from "./file";

export interface ActivitiesProps{
  id : string;
  title : string;
  body: string;
  description: string;
  files: File[]
  category : Category;
  created_at_feedback?: Date;
  updated_at_feedback?: Date;
  feedback: {
    feedback?: boolean;
    created_at?: Date
  };
}