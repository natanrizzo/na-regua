import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Platform
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getBarbers } from '@/api/admin';

type Barber = {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function AdminHomeScreen() {
    const { user } = useAuth();
    const router = useRouter();

    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBarbers = async () => {
            setIsLoading(true);
            try {
                const barbersData = await getBarbers(); 

                if (Array.isArray(barbersData)) {
                    setBarbers(barbersData);
                }
            } catch (error) {
                console.error("Erro ao buscar barbeiros:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBarbers();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text>Carregando Barbeiros...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.welcomeTitle}>Bem-vindo,</Text>
                        <Text style={styles.adminName}>{user?.name || 'Admin'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/admin/profile')}>
                        <Feather name="user" size={28} color="#333" />
                    </TouchableOpacity>
                </View>

                
                <Text style={styles.listHeader}>Barbeiros Cadastrados</Text>
                <FlatList
                data={barbers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.barberItem}>
                        <View>
                            <Text style={styles.barberName}>{item.name}</Text>
                            <Text style={styles.barberEmail}>{item.email}</Text>
                        </View>
                        <TouchableOpacity style={styles.detailsButton} onPress={() => router.push({
                            pathname: '/admin/barber-details/[id]',
                            params: { id: item.id }
                        })}>
                            <Text>Detalhes</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum barbeiro encontrado.</Text>}
                />
                <TouchableOpacity 
                    style={styles.addBarberButton} 
                    onPress={() => router.push('/admin/newBarber')}
                >
                    <Feather name="plus-circle" size={20} color="#fff" />
                    <Text style={styles.addBarberButtonText}>Adicionar Novo Barbeiro</Text>
                </TouchableOpacity>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/admin/products')}>
                        <MaterialCommunityIcons name="bottle-tonic-plus-outline" size={32} color="#34D399" />
                        <Text style={styles.actionCardTitle}>Editar Produtos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/admin/services')}>
                        <Feather name="edit" size={32} color="#FBBF24" />
                        <Text style={styles.actionCardTitle}>Editar Serviços</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    welcomeTitle: {
        fontSize: 18,
        color: '#718096',
    },
    adminName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A202C',
    },

    addBarberButton: {
        flexDirection: 'row',
        backgroundColor: '#6D5FFD',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        marginTop:12,
        ...Platform.select({
            ios: { shadowColor: '#6D5FFD', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
            android: { elevation: 5 },
            web: { boxShadow: '0 4px 14px rgba(109, 95, 253, 0.3)' }
        }),
    },
    addBarberButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginTop: 20,
        backgroundColor: '#FFF1F0',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFDAD6',
    },
    logoutButtonText: {
        color: '#D9534F',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    
    listHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 16,
    },
    barberItem: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EDF2F7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    barberName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
    },
    barberEmail: {
        fontSize: 14,
        color: '#718096',
        marginTop: 4,
    },
    detailsButton: {
        backgroundColor: '#F0F4F7',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    detailsButtonText: {
        color: '#4A5568',
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        padding: 20,
        color: '#A0AEC0',
        fontSize: 16,
    },

    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    actionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        width: '48%',
        borderWidth: 1,
        borderColor: '#EDF2F7',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
            android: { elevation: 3 },
            web: { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }
        }),
    },
    actionCardTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 12,
        color: '#2D3748',
        textAlign: 'center',
    },
});