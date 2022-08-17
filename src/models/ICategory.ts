import {Sort} from "../store/slices/filterSlice";

export interface ICategory {
    id: number,
    name: string,
    image: string,
	sizes: string[],
	colors: string[],
    sortBy: Sort[]
}
