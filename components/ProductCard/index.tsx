import { Image } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { ProductCardProps } from "./types";

const ProductCard = ({
    product,
    size = 'large'
}: ProductCardProps) => {
    return (
        <Box
            padding={'size-4'}
            backgroundColor={"background"}
        >
            <Image src={product.imageUrl} alt={`Image for ${product.name}`}/>
            <Text>{product.name}</Text>
            <Text>R$ {product.salePrice.toFixed(2)}</Text>
        </Box>
    )
}

export default ProductCard;