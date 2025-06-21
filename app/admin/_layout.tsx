import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Admin Panel', headerShown: false}} />
      <Stack.Screen name="index" options={{ title: 'Painel do Administrador'}} />
      <Stack.Screen name="newBarber" options={{ title: 'New Barber', headerShown: false}} />
    </Stack>
  );
}