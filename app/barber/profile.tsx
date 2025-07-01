import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Alert
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            "Sair da Conta",
            "Você tem certeza de que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Sim, Sair", 
                    onPress: logout,
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Meu Perfil</Text>

                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Feather name="user" size={32} color="#6D5FFD" />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user?.name || 'Carregando...'}</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={handleLogout}
                >
                    <Feather name="log-out" size={20} color="#D9534F" />
                    <Text style={styles.logoutButtonText}>Sair da conta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    container: {
        flex: 1,
        padding: 24,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A202C',
        marginBottom: 30,
    },
    profileCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
            web: {
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
            }
        }),
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E9E7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 'auto',
        backgroundColor: '#FFF1F0',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFDAD6',
    },
    logoutButtonText: {
        color: '#D9534F',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});