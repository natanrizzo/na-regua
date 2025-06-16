import { Stack } from 'expo-router';

export default function BarberLayout() {
  // Este layout aplica um header com título a todas as telas dentro de /admin/*
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Painel do Administrador' }} />
      <Stack.Screen name="addbarber" options={{ title: 'Adicionar Barbeiro' }} />
    </Stack>
  );
}