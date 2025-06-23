import React, { useState } from 'react';

import { View, Text, Button, StyleSheet, KeyboardAvoidingView, Platform, TextInput, ScrollView } from 'react-native';

export default function AddBarberScreen() {
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
                    <TextInput placeholder="Nome completo" value={name} onChangeText={setName} style={styles.input} />
                </View>

                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="email@exemplo.com" value={email} onChangeText={setEmail} style={styles.input} keyboardType='email-address' autoCapitalize='none' />
                </View>

                <Text style={styles.inputLabel}>Senha</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Senha" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
                </View>

                <Text style={styles.inputLabel}>Confirmar Senha</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Confirme a senha" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry />
                </View>
                {/*Talvez adicionar alguma função de CEP aqui depois*/}
                <Text style={styles.inputLabel}>CEP</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="CEP" value={postalCode} onChangeText={setPostalCode} style={styles.input} keyboardType="numeric" />
                </View>
                <Text style={styles.inputLabel}>País</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="País" value={country} onChangeText={setCountry} style={styles.input} />
                </View>
                
                <Text style={styles.inputLabel}>Estado</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Estado" value={state} onChangeText={setState} style={styles.input} />
                </View>

                <Text style={styles.inputLabel}>Cidade</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Cidade" value={city} onChangeText={setCity} style={styles.input} />
                </View>


                <Text style={styles.inputLabel}>Rua</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Rua / Avenida" value={street} onChangeText={setStreet} style={styles.input} />
                </View>

                <Text style={styles.inputLabel}>Número</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Número" value={number} onChangeText={setNumber} style={styles.input} keyboardType="numeric" />
                </View>

                <Text style={styles.inputLabel}>Complemento</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Apto, bloco, etc. (opcional)" value={complement} onChangeText={setComplement} style={styles.input} />
                </View>

                <View style={{ marginTop: 20, marginBottom: 40 }}>
                    <Button title="Salvar Barbeiro" onPress={() => {  }} />
                </View>
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
});