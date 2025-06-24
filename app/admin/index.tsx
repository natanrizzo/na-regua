import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { getBarbers } from '@/api/admin';

type Barber = {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function AdminHomeScreen() {
    const { logout, user } = useAuth();
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
                    <TouchableOpacity onPress={() => router.push('/admin')}>
                        <Feather name="user" size={28} color="#333" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.addBarberButton} 
                    onPress={() => router.push('/admin/newBarber')}
                >
                    <Feather name="plus-circle" size={20} color="#fff" />
                    <Text style={styles.addBarberButtonText}>Adicionar Novo Barbeiro</Text>
                </TouchableOpacity>

                <FlatList
                data={barbers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.barberItem}>
                        <View>
                            <Text style={styles.barberName}>{item.name}</Text>
                            <Text style={styles.barberEmail}>{item.email}</Text>
                        </View>
                        <TouchableOpacity style={styles.detailsButton}>
                            <Text>Detalhes</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListHeaderComponent={<Text style={styles.listHeader}>Barbeiros Cadastrados</Text>}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum barbeiro encontrado.</Text>}
            />

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Feather name="log-out" size={20} color="#D9534F" />
                    <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    listHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    barberItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    barberName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    barberEmail: {
        fontSize: 14,
        color: 'gray',
    },
    detailsButton: {
        backgroundColor: '#e9ecef',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    welcomeTitle: {
        fontSize: 18,
        color: '#6c757d',
    },
    adminName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#343a40',
    },
    addBarberButton: {
        flexDirection: 'row',
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addBarberButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    list: {
        flex: 1,
    },
    barberItemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    barberSpecialty: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    detailsButtonText: {
        color: '#343a40',
        fontWeight: '600',
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#6c757d',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginTop: 10,
        backgroundColor: '#FADBD8',
        borderRadius: 12,
    },
    logoutButtonText: {
        color: '#D9534F',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});