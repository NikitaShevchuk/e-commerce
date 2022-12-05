export interface IProductCard {
    id: string
    createdAt: string
    name: string
    description: string
    color: string
    image: string
    price: string
    isNew: boolean
    sizes: string[]
    isFavorite: boolean
    categoryId: string
    type: string
}
