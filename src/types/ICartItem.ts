import { type IProductCard } from "./IProductCard";

export interface ICartItem {
    product: IProductCard;
    quantity: number;
    selectedSize: string;
}
