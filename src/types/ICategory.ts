import { type Sort } from "../store/slices/filterSlice";

export interface ICategory {
    _id: string;
    title: string;
    image: string;
    sizes: string[];
    colors: string[];
    sortBy: Sort[];
}
