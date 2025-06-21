import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Text, View } from 'react-native';

const routePermissions: { [key: string]: string[] } = {
  'admin':['Administrator'],
  'barbeiro':['Barber'],
  'client':['Client'],
}
const homeRoutes ={
  Administrator: '/admin/home',
  Barber: '/barber/home',
  Client: '/client/home',
} as const;
const ProtectedLayout = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const segments= useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    
    const inPublicGroup = segments[0] === '(public)';
    if (!isAuthenticated && !inPublicGroup) {
      router.replace('/(public)/login');
    }
    if(isAuthenticated && user){
      if(inPublicGroup){
        const homeRoute = homeRoutes[user.role] || '/';
        return router.replace(homeRoute);
      }
      const currentSection = segments[0];
      if (currentSection && routePermissions[currentSection]){
        const requiredRoles = routePermissions[currentSection];
        const hasPermission = requiredRoles.includes(user.role);

        if(!hasPermission){
          const homeRoute = homeRoutes[user.role] || '/';
          router.replace(homeRoute)
        }
      }
    }

  }, [isAuthenticated, isLoading, user, segments]); 

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
      <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="admin"/>
      <Stack.Screen name="barber"/>
      <Stack.Screen name="client"/>
      </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}