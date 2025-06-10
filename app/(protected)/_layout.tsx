
import { Stack } from 'expo-router';

export default function ProtectedStackLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            {/* Adicione outras telas protegidas aqui */}
        </Stack>
    );
}