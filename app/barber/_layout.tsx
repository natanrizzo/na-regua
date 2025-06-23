import { Stack } from 'expo-router';

export default function BarberLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Painel do Administrador' }} />
    </Stack>
  );
}