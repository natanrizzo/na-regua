import { Product } from "@/types/Product";

type ProductCardSize = 'small' | 'large'

export type ProductCardProps = {
    size: ProductCardSize;
    product: Product;
}