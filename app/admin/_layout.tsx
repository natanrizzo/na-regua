import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Painel do Administrador'}} />
      <Stack.Screen name="newBarber" options={{ title: 'Adicionar Barbeiro'}} />
      <Stack.Screen name="services" options={{ title: 'Serviços'}} />
      <Stack.Screen name="add-service" options={{ title: 'Adicionar Serviço'}} />
      <Stack.Screen name="profile" options={{ title: 'Meu Perfil'}} />
      <Stack.Screen name="products" options={{ title: 'Produtos'}} />
    </Stack>
  );
}