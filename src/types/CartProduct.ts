import { type ICategory } from "./ICategory";

export interface CartProduct {
    _id: string;
    category: ICategory;
    productId: string;
    name: string;
    color: string;
    image: string;
    price: string;
    size: string;
    count: number;
}
