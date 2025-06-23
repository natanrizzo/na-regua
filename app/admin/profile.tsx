import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function profileScreen() {
    const { logout } = useAuth();
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Button title="Sair (Logout)" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});