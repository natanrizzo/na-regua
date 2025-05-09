import ProductCard from "@/components/ProductCard";
import Text from "@/components/Text";
import { View } from "react-native";

export default function ComponentTest() {
    return (
        <View>
            <Text>Testing components...</Text>
            <ProductCard product={{
                id: 'a',
                name: "Product",
                profit: 15,
                salePrice: 13,
                }} />
        </View>
    )
}