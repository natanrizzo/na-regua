
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { addService } from '@/api/admin';
import { View, Text, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, Platform, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function AddServiceScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handlePriceChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9.,]/g, '').replace(',', '.');
        
        const parts = cleanedText.split('.');
        if (parts.length > 2) {
            return;
        }

        setPrice(cleanedText);
    };

    const handleDurationChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        setDuration(cleanedText);
    };
    const handleAddServicePress = async () =>{
        const priceAsNumber = parseFloat(price);
        const durationAsNumber = parseInt(duration, 10);

        if (isNaN(priceAsNumber) || isNaN(durationAsNumber)) {
            Alert.alert("Erro", "Valores de preço ou duração inválidos.");
            return;
        }
        if (!name || !price || !duration) {
            if(!isDesktop){
                Alert.alert("Erro", "Preencha todos os campos.");
            }
            else{
                setErrorMessage("Preencha todos os campos.");
            }
            console.log(errorMessage);
            return;
        }
        setIsLoading(true);
        
        try{
            setErrorMessage("");
            await addService(name, priceAsNumber, durationAsNumber );
            router.navigate('/barber');
        } catch(error: any){
            if(!isDesktop){
                Alert.alert(error.response?.data?.message || error.message || "Something went wrong")
            }
            else{
                setErrorMessage(error.response?.data?.message || error.message || "Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.outerContainer} 
        >
            <ScrollView
                contentContainerStyle={styles.formContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Novo Serviço</Text>

                <Text style={styles.inputLabel}>Nome</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Nome" placeholderTextColor={"#d0d1cf"} value={name} onChangeText={setName} style={styles.input} />
                </View>

                <Text style={styles.inputLabel}>Preço (R$)</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="40.00"
                        placeholderTextColor={"#d0d1cf"}
                        value={price}
                        onChangeText={handlePriceChange}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                </View>

                <Text style={styles.inputLabel}>Duração (min)</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Em minutos (ex: 30)"
                        placeholderTextColor={"#d0d1cf"}
                        value={duration}
                        onChangeText={handleDurationChange}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                </View>

                {errorMessage ? (
                    <Text style={styles.errorMessages}>
                        {errorMessage}
                    </Text>
                    ) : (
                    <></>
                    )}
                <TouchableOpacity 
                    style={styles.signInButton} 
                    onPress={handleAddServicePress}
                    disabled={isLoading}
                >
                    {isLoading ? (
                    <ActivityIndicator color="#fff" />
                    ) : (
                    <Text style={styles.signInButtonText}>Adicionar Serviço</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff', 
    },
    formContainer: {
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30, 
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        marginBottom: 20, 
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568',
        marginBottom: 8,
    },
    errorMessages:{
        color: '#FF2C2C',
        fontSize: 14,
        fontWeight: 'bold',
    },
    signInButton: {
        backgroundColor: '#6D5FFD', 
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50, 
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});