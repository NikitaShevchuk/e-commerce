import { Sort } from "../store/slices/filterSlice";

export interface ICategory {
    id: string;
    name: string;
    image: string;
    sizes: string[];
    colors: string[];
    sortBy: Sort[];
}
