import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { getServices } from '@/api/admin';

type Service = {
    id: string;
    name: string;
    price: number;
    duration: number;
};

export default function ServiceScreen() {
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);

    useEffect(()=>{
        const fetchServices = async () =>{
            try{
                const servicesData = await getServices();
                setServices(servicesData);
            }
            catch(err: any){
                throw err;
            }
        }
        fetchServices();
    },[])

    const renderServiceItem = ({ item }: { item: Service }) => (
        <View style={styles.serviceItemContainer}>
            <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.serviceDetails}>
                    {`R$ ${item.price.toFixed(2).replace('.', ',')} • ${item.duration} min`}
                </Text>
            </View>
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => router.push({
                    pathname: '/admin/edit-service/[id]',
                    params: { id: item.id }
                })}
            >
                <Feather name="edit-2" size={20} color="#4A5568" />

            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={services}
                    renderItem={renderServiceItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                    ListHeaderComponent={
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerTitle}>Gerenciar Serviços</Text>
                            <Text style={styles.headerSubtitle}>
                                Adicione, edite ou remova os serviços que você oferece.
                            </Text>
                        </View>
                    }
                    ListFooterComponent={
                        <TouchableOpacity 
                            style={styles.addButton}
                            onPress={() => router.push('/admin/add-service')}
                        >
                            <Feather name="plus" size={22} color="#fff" />
                            <Text style={styles.addButtonText}>Adicionar Novo Serviço</Text>
                        </TouchableOpacity>
                    }
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhum serviço cadastrado.</Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 20,
    },
    headerContainer: {
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#EDF2F7',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#718096',
        marginTop: 4,
    },
    serviceItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EDF2F7',
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
    },
    serviceDetails: {
        fontSize: 14,
        color: '#718096',
        marginTop: 4,
    },
    editButton: {
        padding: 10,
        backgroundColor: '#F7FAFC',
        borderRadius: 50,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#6D5FFD',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 40,
        elevation: 3,
        shadowColor: '#6D5FFD',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#A0AEC0',
        fontSize: 16,
    },
});