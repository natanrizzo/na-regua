import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView,
    ActivityIndicator, ScrollView, Platform
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { getAppointmentById } from '@/api/barber'; 
import { Feather } from '@expo/vector-icons';

type Service = { id: string; name: string; price: number; };
type User = { id: string; name: string; email: string; };
type Appointment = {
    id: string;
    dateTime: string;
    client: User;
    service: Service;
};

const InfoCard = ({ icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <Feather name={icon} size={20} color="#6D5FFD" />
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <View style={styles.cardContent}>
            {children}
        </View>
    </View>
);

export default function AppointmentDetailsScreen() {
    const { id } = useLocalSearchParams();
    const appointmentId = Array.isArray(id) ? id[0] : id;

    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!appointmentId) return;

        const fetchAppointmentDetails = async () => {
            try {
                const data = await getAppointmentById(appointmentId);
                setAppointment(data);
            } catch (error) {
                console.error("Erro ao carregar detalhes do agendamento:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointmentDetails();
    }, [appointmentId]);
    
    if (isLoading) {
        return <SafeAreaView style={styles.centeredContainer}><ActivityIndicator size="large" /></SafeAreaView>;
    }

    if (!appointment) {
        return <SafeAreaView style={styles.centeredContainer}><Text>Agendamento não encontrado.</Text></SafeAreaView>;
    }

    const date = new Date(appointment.dateTime);
    const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const formattedWeekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ title: `Agendamento de ${appointment.client.name}` }} />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerTitle}>Detalhes do Agendamento</Text>

                <InfoCard icon="calendar" title="Data">
                    <Text style={styles.mainInfoText}>{formattedDate}</Text>
                    <Text style={styles.subInfoText}>{formattedWeekday.charAt(0).toUpperCase() + formattedWeekday.slice(1)} às {formattedTime}</Text>
                </InfoCard>

                <InfoCard icon="user" title="Cliente">
                    <Text style={styles.mainInfoText}>{appointment.client.name}</Text>
                    <Text style={styles.subInfoText}>{appointment.client.email}</Text>
                </InfoCard>
                
                <InfoCard icon="scissors" title="Serviço">
                    <Text style={styles.mainInfoText}>{appointment.service.name}</Text>
                    <Text style={styles.subInfoText}>
                        Preço: R$ {appointment.service.price.toFixed(2).replace('.', ',')}
                    </Text>
                </InfoCard>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    container: {
        flexGrow: 1,
        padding: 24,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A202C',
        marginBottom: 24,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10 },
            android: { elevation: 5 },
            web: { boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)' }
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EDF2F7',
        paddingBottom: 12,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
        marginLeft: 12,
    },
    cardContent: {},
    mainInfoText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1A202C',
    },
    subInfoText: {
        fontSize: 16,
        color: '#718096',
        marginTop: 4,
    },
});