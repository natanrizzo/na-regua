
import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, Platform, TextInput } from 'react-native';

export default function HomeScreen() {
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
            style={styles.container}
        >
            <View>
                <View style={styles.container}>
                    <Text style={styles.title}>New barber</Text>
                </View>
                <View>
                    <TextInput value={name} onChangeText={setName} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={password} onChangeText={setPassword} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={confirmPassword} onChangeText={setConfirmPassword} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={country} onChangeText={setCountry} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={state} onChangeText={setState} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={city} onChangeText={setCity} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={postalCode} onChangeText={setPostalCode} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={street} onChangeText={setStreet} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={number} onChangeText={setNumber} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
                <View>
                    <TextInput value={complement} onChangeText={setComplement} autoCapitalize='none' keyboardType='default'>
                    </TextInput>
                </View>
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
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    
});