export interface IProductCard {
    id: string
    createdAt: string
    name: string
    color: string
    image: string
    price: number
    isNew: boolean
    sizes: string[]
    isFavorite: boolean
}
