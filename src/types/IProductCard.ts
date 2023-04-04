import { type ICategory } from "./ICategory";

export interface IProductCard {
    _id: string;
    title: string;
    description: string;
    color: string;
    image: string;
    price: string;
    productIsNew: boolean;
    sizes: string[];
    isFavorite: boolean;
    category: ICategory;
    type: string;
}
