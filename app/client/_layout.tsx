import { Stack } from 'expo-router';

export default function ClientLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Painel do Administrador' }} />
      <Stack.Screen name="addbarber" options={{ title: 'Adicionar Barbeiro' }} />
    </Stack>
  );
}