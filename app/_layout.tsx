import { theme } from "@/themes";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";


export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'poppinsRegular': require('../assets/fonts/Poppins-Regular.ttf'),
        'poppinsBold': require('../assets/fonts/Poppins-Bold.ttf')
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack initialRouteName="index">
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="componentTest/index" options={{ title: "Testing" }} />
                <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
            </Stack>
        </ThemeProvider>
    )
}