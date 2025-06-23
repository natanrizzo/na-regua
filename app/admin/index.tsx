import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList,
    SafeAreaView 
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const mockBarbers = [
  { id: '1', name: 'Carlos Almeida', specialty: 'Corte Clássico & Barba' },
  { id: '2', name: 'Mariana Lima', specialty: 'Coloração & Penteados' },
  { id: '3', name: 'Ricardo Neves', specialty: 'Navalha & Desenhos' },
  { id: '4', name: 'Beatriz Costa', specialty: 'Cortes Modernos' },
];

export default function AdminHomeScreen() {
    const { logout, user } = useAuth();
    const router = useRouter();

    const renderBarberItem = ({ item }: { item: typeof mockBarbers[0] }) => (
        <View style={styles.barberItemContainer}>
            <View>
                <Text style={styles.barberName}>{item.name}</Text>
                <Text style={styles.barberSpecialty}>{item.specialty}</Text>
            </View>
            <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={() => router.push(`/admin`)}
            >
                <Text style={styles.detailsButtonText}>Detalhes</Text>
            </TouchableOpacity>
        </View>
    );

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

                <Text style={styles.listHeader}>Barbeiros Cadastrados</Text>
                <FlatList
                    data={mockBarbers}
                    renderItem={renderBarberItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                    ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum barbeiro cadastrado.</Text>}
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
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        padding: 20,
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
    listHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#495057',
        marginBottom: 10,
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
    barberName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
    },
    barberSpecialty: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    detailsButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
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