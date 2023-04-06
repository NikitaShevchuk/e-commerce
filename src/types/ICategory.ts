import { type Sort } from "../store/slices/filter";

export interface ICategory {
    _id: string;
    title: string;
    image: string;
    sizes: string[];
    colors: string[];
    sortBy: Sort[];
}
