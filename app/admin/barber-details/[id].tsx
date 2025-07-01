import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, FlatList, SafeAreaView,
    ActivityIndicator, Image, Platform,
    Alert,
    TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { getBarberById, getAppointments, deleteAppointment } from '@/api/admin';
import { Feather } from '@expo/vector-icons';

type Service = {
    id: string;
    name: string;
    price: number;
};
type User = {
    id: string;
    name: string;
    email: string;
};
type Appointment = {
    id: string;
    dateTime: string;
    client: User;
    service: Service;
};

export default function BarberDetailsScreen() {
    const { id } = useLocalSearchParams();
    const barberId = Array.isArray(id) ? id[0] : id;

    const [barber, setBarber] = useState<User | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!barberId) return;

        const loadData = async () => {
            try {
                const [barberData, appointmentsData] = await Promise.all([
                getBarberById(barberId),
                getAppointments({ barberId: barberId })
            ]);

                setBarber(barberData);
                if (Array.isArray(appointmentsData)) {
                    setAppointments(appointmentsData);
                }
            } catch (error) {
                console.error("Erro ao carregar dados do barbeiro:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [barberId]);
    const handleDeleteAppointment = (appointmentId: string, clientName: string) => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza de que deseja deletar o agendamento de ${clientName}?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sim, Deletar", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            await deleteAppointment(appointmentId);
                            setAppointments(prev => prev.filter(app => app.id !== appointmentId));
                            Alert.alert("Sucesso", "Agendamento deletado.");
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível deletar o agendamento.");
                        }
                    }
                }
            ]
        );
    };
    const renderAppointmentItem = ({ item }: { item: Appointment }) => {
        const date = new Date(item.dateTime);
        const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        return (
            <View style={styles.appointmentCard}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{formattedDate}</Text>
                    <Text style={styles.timeText}>{formattedTime}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.clientName}>{item.client.name}</Text>
                    <Text style={styles.serviceName}>{item.service.name}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteAppointment(item.id, item.client.name)}>
                    <Feather name="trash-2" size={24} color="#D9534F" />
                </TouchableOpacity>
            </View>
        );
    };

    if (isLoading) {
        return <SafeAreaView style={styles.centeredContainer}><ActivityIndicator size="large" /></SafeAreaView>;
    }

    if (!barber) {
        return <SafeAreaView style={styles.centeredContainer}><Text>Barbeiro não encontrado.</Text></SafeAreaView>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ title: barber.name }} />
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={renderAppointmentItem}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <View style={styles.avatarContainer}>
                            <Feather name="user" size={40} color="#6D5FFD" />
                        </View>
                        <Text style={styles.barberNameHeader}>{barber.name}</Text>
                        <Text style={styles.barberEmailHeader}>{barber.email}</Text>
                        <Text style={styles.sectionTitle}>Próximos Agendamentos</Text>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Este barbeiro não possui agendamentos futuros.</Text>
                }
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#E9E7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    barberNameHeader: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    barberEmailHeader: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3748',
        alignSelf: 'flex-start',
    },
    appointmentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
            android: { elevation: 3 },
            web: { boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' }
        }),
    },
    dateContainer: {
        alignItems: 'center',
        marginRight: 16,
        paddingRight: 16,
        borderRightWidth: 1,
        borderRightColor: '#EDF2F7',
    },
    dateText: {
        fontSize: 14,
        color: '#718096',
    },
    timeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    detailsContainer: {
        flex: 1,
    },
    clientName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
    },
    serviceName: {
        fontSize: 14,
        color: '#718096',
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        color: '#A0AEC0',
    },
});