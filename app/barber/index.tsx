import React, { useState, useEffect, useMemo } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, FlatList,
    ScrollView, SafeAreaView, ActivityIndicator, Platform
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAppointments } from '@/api/barber';

type Transaction = { id: string; amount: number; };
type Service = { id: string; name: string; price: number; duration: number; };
type User = { id: string; name: string; email: string; role: string };
type Appointment = {
    id: string;
    serviceId: string;
    clientId: string;
    barberId: string;
    dateTime: string;
    barber: User;
    client: User;
    service: Service;
    transactions: Transaction[];
};
type GroupedAppointments = { [key: string]: Appointment[]; };


const groupAppointmentsByDay = (appointments: Appointment[]): GroupedAppointments => {
  return appointments.reduce((acc: GroupedAppointments, appointment) => {
    const dayKey = new Date(appointment.dateTime).toISOString().split('T')[0];
    if (!acc[dayKey]) {
      acc[dayKey] = [];
    }
    acc[dayKey].push(appointment);
    return acc;
  }, {});
};
const formatDateHeader = (dateString: string): string => {
    const inputDate = new Date(dateString + 'T00:00:00');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (inputDate.getTime() === today.getTime()) {
        return `Hoje, ${inputDate.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
        })}`;
    }

    if (inputDate.getTime() === tomorrow.getTime()) {
        return `Amanhã, ${inputDate.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
        })}`;
    }

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };
    const formattedDate = inputDate.toLocaleDateString('pt-BR', options);
    
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default function BarberHomeScreen() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {

            setIsLoading(true);
            try {
                const appointmentsData = await getAppointments();
                if (Array.isArray(appointmentsData)) {
                    setAppointments(appointmentsData);
                }
            } catch(err) {
                console.error("Erro ao carregar agendamentos na tela:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [user]);

    const groupedAppointments = useMemo(() => groupAppointmentsByDay(appointments), [appointments]);
    const upcomingDays = Object.keys(groupedAppointments).sort().slice(0, 3);

    const renderAppointmentItem = ({ item }: { item: Appointment }) => {
        const time = new Date(item.dateTime).toLocaleTimeString('pt-BR', {
            hour: '2-digit', minute: '2-digit'
        });

        return (
            <TouchableOpacity style={styles.appointmentCard} onPress={() => router.push({
                            pathname: '/barber/appointment-details/[id]',
                            params: { id: item.id }
                        })}>
                <Text style={styles.appointmentTime}>{time}</Text>
                <View style={styles.appointmentDetails}>
                    <Text style={styles.appointmentClient}>{item.client.name}</Text>
                    <Text style={styles.appointmentService}>{item.service.name}</Text>
                </View>
                <Feather name="chevron-right" size={24} color="#A0AEC0" />
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.safeArea, {justifyContent: 'center', alignItems: 'center'}]}>
                <ActivityIndicator size="large" />
                <Text style={{marginTop: 10}}>Carregando sua agenda...</Text>
            </SafeAreaView>
        );
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.welcomeTitle}>Bem-vindo,</Text>
                        <Text style={styles.barberName}>{user?.name || 'Barbeiro'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/barber/profile')}>
                        <Feather name="user" size={28} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.scheduleContainer}>
                    <Text style={styles.sectionTitle}>Sua Agenda</Text>
                    {upcomingDays.length > 0 ? (
                        upcomingDays.map(date => (
                            <View key={date} style={styles.dayBlock}>
                                <Text style={styles.dayTitle}>{formatDateHeader(date)}</Text>
                                <FlatList
                                    data={groupedAppointments[date]}
                                    renderItem={renderAppointmentItem}
                                    keyExtractor={(item) => item.id}
                                    scrollEnabled={false}
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={{textAlign: 'center', paddingVertical: 20, color: 'gray'}}>Você não tem agendamentos futuros.</Text>
                    )}

                </View>
                
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/barber/products')}>
                        <MaterialCommunityIcons name="bottle-tonic-plus-outline" size={32} color="#34D399" />
                        <Text style={styles.actionCardTitle}>Pedir Produtos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/barber/services')}>
                        <Feather name="edit" size={32} color="#FBBF24" />
                        <Text style={styles.actionCardTitle}>Editar Serviços</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F6F8',
    },
    container: {
        flex: 1,
        padding: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A202C',
        marginBottom:-4
    },
    scheduleContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
            web: {
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }
        }),
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    dayBlock: {
        marginBottom: 24,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4A5568',
        marginBottom: 12,
        textTransform: 'capitalize',
    },
    barberName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    appointmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: '#EDF2F7',
    },
    appointmentTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6D5FFD',
        width: 60,
    },
    appointmentDetails: {
        flex: 1,
        marginLeft: 16,
    },
    appointmentClient: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
    },
    appointmentService: {
        fontSize: 14,
        color: '#718096',
    },
    fullScheduleButton: {
        backgroundColor: '#EDF2F7',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 10,
    },
    fullScheduleButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A5568',
    },
    actionsContainer: {
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '48%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
            },
            android: {
                elevation: 5,
            },
            web: {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }
        }),
    },
    actionCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 12,
        color: '#2D3748',
    },
});