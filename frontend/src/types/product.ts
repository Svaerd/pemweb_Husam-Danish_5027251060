export interface Product {
    id: number
    name: string
    price: number
}

export type ProductValues = Omit<Product, "id">
