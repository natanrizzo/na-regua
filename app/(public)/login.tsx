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
import { useAuth } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons'; 

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');

    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    const handleLoginPress = async () => {
        if (!email || !password) {
            if(!isDesktop){
                Alert.alert("Error", "Please, enter your email and password.");
            }
            else{
                setErrorMessage("Please, enter your email and password.");
            }
            //Alert do react não está funcionando na WEB, criei o CustomAlert, porém acho que fica 
            //Muita coisa na tela em WEB
            //Talvez nem sjea bom a pena colocar alerta, mas vamos vendo
            return;
        }
        setIsLoading(true);
        try {
            await login(email.toLowerCase(), password);
        } catch (error: any) {
            if(!isDesktop){
                Alert.alert("Login error", "Something went wrong.");
            }
            else{
                setErrorMessage("wrong credentials");
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
                        source={require('@/assets/images/appLogo.png')} 
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
                    <View style={[styles.inputContainer, {marginBottom: 0,}]}>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
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

                    <TouchableOpacity style={styles.registerLink} onPress={() => router.navigate('/register')}>
                        <Text style={styles.registerText}>
                            Don't have any account? <Text style={styles.registerTextHighlight}>Register</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                {isDesktop && (
                    <View style={styles.imageContainer}>
                        <Image style={styles.desktopImage}
                                source={require('@/assets/images/barber_shop.jpg')}
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
        marginTop:20,
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
        width: '100%',
    },
    errorMessages:{
        color: '#FF2C2C',
        fontSize: 14,
        fontWeight: 'bold',
    }
});