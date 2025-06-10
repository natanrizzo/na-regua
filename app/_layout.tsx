// app/_layout.tsx
import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Text, View } from 'react-native';

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAuthenticated) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading]); // O efeito roda sempre que esses valores mudam

  // Mostra uma tela de carregamento simples enquanto o contexto verifica o token
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  // Define as telas que o navegador pode acessar.
  // A lógica acima cuidará de mostrar a tela correta.
  return (
      <Stack screenOptions={{ headerShown: false }} />
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}