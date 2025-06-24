
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { registerBarber } from '@/api/admin';
import { View, Text, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, Platform, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function AddBarberScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [complement, setComplement] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegisterPress = async () =>{
        if (!name || !email || !password || !confirmPassword || !street || !number || !city || !state || !postalCode || !country) {
            if(!isDesktop){
                Alert.alert("Erro", "Preencha todos os campos.");
            }
            else{
                setErrorMessage("Preencha todos os campos.");
            }
            console.log(errorMessage);
            return;
        }
        if (password!=confirmPassword){
            if(!isDesktop){
                Alert.alert("Erro", "As senhas são diferentes.");
            }
            else{
                setErrorMessage("As senhas são diferentes.");
            }
            console.log(errorMessage);
            return;
        }
        setIsLoading(true);
        
        try{
            setErrorMessage("");
            await registerBarber(name, email, password, city, country, postalCode, state, street, number, complement);
            router.navigate('/admin');
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
                <Text style={styles.title}>Novo Barbeiro</Text>

                <Text style={styles.inputLabel}>Nome</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Nome completo" placeholderTextColor={"#d0d1cf"} value={name} onChangeText={setName} style={styles.input} />
                </View>

                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="email@exemplo.com" placeholderTextColor={"#d0d1cf"} value={email} onChangeText={setEmail} style={styles.input} keyboardType='email-address' autoCapitalize='none' />
                </View>

                <Text style={styles.inputLabel}>Senha</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Senha" placeholderTextColor={"#d0d1cf"} value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
                </View>

                <Text style={styles.inputLabel}>Confirmar Senha</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Confirme a senha" placeholderTextColor={"#d0d1cf"} value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry />
                </View>
                {/*Talvez adicionar alguma função de CEP aqui depois*/}
                <Text style={styles.inputLabel}>CEP</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="CEP" placeholderTextColor={"#d0d1cf"} value={postalCode} onChangeText={setPostalCode} style={styles.input} keyboardType="numeric" />
                </View>
                <Text style={styles.inputLabel}>País</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="País" placeholderTextColor={"#d0d1cf"} value={country} onChangeText={setCountry} style={styles.input} />
                </View>
                
                <Text style={styles.inputLabel}>Estado</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Estado" placeholderTextColor={"#d0d1cf"} value={state} onChangeText={setState} style={styles.input} />
                </View>

                <Text style={styles.inputLabel}>Cidade</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Cidade" placeholderTextColor={"#d0d1cf"} value={city} onChangeText={setCity} style={styles.input} />
                </View>


                <Text style={styles.inputLabel}>Rua</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Rua / Avenida" placeholderTextColor={"#d0d1cf"} value={street} onChangeText={setStreet} style={styles.input} />
                </View>

                <Text style={styles.inputLabel}>Número</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Número" placeholderTextColor={"#d0d1cf"} value={number} onChangeText={setNumber} style={styles.input} keyboardType="numeric" />
                </View>

                <Text style={styles.inputLabel}>Complemento</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Apto, bloco, etc. (opcional)" placeholderTextColor={"#d0d1cf"} value={complement} onChangeText={setComplement} style={styles.input} />
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
                    onPress={handleRegisterPress}
                    disabled={isLoading}
                >
                    {isLoading ? (
                    <ActivityIndicator color="#fff" />
                    ) : (
                    <Text style={styles.signInButtonText}>Adicionar Barbeiro</Text>
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