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
    KeyboardAvoidingView,
    
} from 'react-native';
import { useRouter } from 'expo-router'
import { useAuth } from '../context/AuthContext';
import { Feather } from '@expo/vector-icons'; 

export default function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');

    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    const handleRegisterPress = async () => {
        if (!email || !password || !name || !confirmPassword) {
            if(!isDesktop){
                Alert.alert("Error", "Please, fill all fields.");
            }
            else{
                setErrorMessage("Please, fill all fields.");
            }
            return;
        }
        if (password!=confirmPassword){
          if(!isDesktop){
                Alert.alert("Error", "The passwords are not equal.");
            }
            else{
                setErrorMessage("The passwords are not equal.");
            }
            return;
        }
        setIsLoading(true);
        try {
          setErrorMessage("");
            await register(name, email, password);
        } catch (error: any) {
            if(!isDesktop){
                Alert.alert(error.response?.data?.message || error.message || "Ocorreu um erro desconhecido.");
            }
            else{
                setErrorMessage(error.response?.data?.message || error.message || "Ocorreu um erro desconhecido.");
            }
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
                    <Text style={styles.title}>Register In to continue</Text>

                    <Text style={styles.inputLabel}>Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            keyboardType="default"
                            autoCapitalize="none"
                        />
                        <Feather name="user" size={20} color="#888" style={styles.inputIcon} />
                    </View>

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
                    <View style={[styles.inputContainer, {marginBottom: 0,}]}>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <Feather name="lock" size={20} color="#888" style={styles.inputIcon} />
                    </View>
                    <Text style={[styles.inputLabel, {marginTop: 6}]}>Confirm your password</Text>

                    <View style={[styles.inputContainer, {marginBottom: 0,}]}>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                        <Feather name="lock" size={20} color="#888" style={styles.inputIcon} />
                    </View>
                    {errorMessage ? (
                        <Text style={styles.errorMessages}>
                            {errorMessage}
                        </Text>
                    ) : (
                        <></>
                    )}
                    

                    <TouchableOpacity>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.signInButton} 
                        onPress={handleRegisterPress}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.signInButtonText}>Register</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginLink} onPress={() => router.navigate('/login')}>
                        <Text style={styles.loginText}>
                            Already have an account? <Text style={styles.loginTextHighlight}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                {isDesktop && (
                    <View style={styles.imageContainer}>
                        <Image style={styles.desktopImage}
                                source={require('../assets/images/barber_shop.jpg')}
                                resizeMode="cover"/>
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
    loginLink: {
        marginTop: 32,
        alignItems: 'center',
    },
    loginText: {
        color: '#A0AEC0',
        fontSize: 14,
    },
    loginTextHighlight: {
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
        width: '100%',
    },
    errorMessages:{
        color: '#FF2C2C',
        fontSize: 14,
        fontWeight: 'bold',
    }
});