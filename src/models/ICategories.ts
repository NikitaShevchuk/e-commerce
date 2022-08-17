export interface ICategories {
    id: number,
    name: string,
    image: string,
	sizes: string[],
	colors: string[],
    sortBy: Array<{property: string, order: 'asc' | 'desc'}>
}
