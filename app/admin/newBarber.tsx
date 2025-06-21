
import React from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function HomeScreen() {
    
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
                    
            <View style={styles.container}>
                <Text style={styles.title}>New barber</Text>
            </View>
        </KeyboardAvoidingView>
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