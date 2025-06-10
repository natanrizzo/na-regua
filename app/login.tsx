import React, { useState } from 'react';
import { 
    View, 
    TextInput, 
    StyleSheet, 
    Text, 
    Alert, 
    Image,
    TouchableOpacity,
    useWindowDimensions,
    Platform,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Feather } from '@expo/vector-icons'; 

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    const handleLoginPress = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha o email e a senha.");
            return;
        }
        setIsLoading(true); 
        try {
            await login(email, password);
        } catch (error: any) {
            Alert.alert("Falha no Login", error.message || "Ocorreu um erro.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.outerContainer}
        >
            <View style={[styles.mainContainer, isDesktop ? styles.desktopContainer : {}]}>
                <View style={[styles.formContainer, isDesktop ? styles.desktopFormContainer : {}]}>
                    <Image 
                        style={styles.logoImage} 
                        source={require('../assets/images/appLogo.png')} 
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Sign In to continue</Text>

                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Feather name="mail" size={20} color="#888" style={styles.inputIcon} />
                    </View>

                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <Feather name="lock" size={20} color="#888" style={styles.inputIcon} />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.signInButton} 
                        onPress={handleLoginPress}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.signInButtonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerLink}>
                        <Text style={styles.registerText}>
                            Don't have any account? <Text style={styles.registerTextHighlight}>Register</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                {isDesktop && (
                    <View style={styles.imageContainer}>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#F0F4F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    desktopContainer: {
        flexDirection: 'row', 
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 24,
    },
    desktopFormContainer: {
        maxWidth: 450,
        height: '100%',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#E0E0E0',
    },
    logoImage: {
        width: 80,
        height: 80,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 14,
        color: '#4A5568',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    inputIcon: {
        paddingHorizontal: 16,
    },
    forgotPasswordText: {
        textAlign: 'right',
        color: '#4A90E2',
        fontWeight: '600',
        marginBottom: 24,
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
    registerLink: {
        marginTop: 32,
        alignItems: 'center',
    },
    registerText: {
        color: '#A0AEC0',
        fontSize: 14,
    },
    registerTextHighlight: {
        color: '#6D5FFD',
        fontWeight: 'bold',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6D5FFD', 
    },
    desktopImage: {
        width: '80%',
        height: '80%',
    },
});