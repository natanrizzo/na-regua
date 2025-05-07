import Text from "@/components/Text";
import { useRouter } from "expo-router";
import { View } from "react-native";


export default function HomeScreen() {
    const router = useRouter();

    return (
        <View>
            <Text >Home Screen</Text>
        </View>
    );
}