import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, Button, Alert,
    SafeAreaView, ActivityIndicator, ScrollView, Platform,
    KeyboardAvoidingView,
    useWindowDimensions,
    TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getServiceById, updateService } from '@/api/admin';

export default function EditServiceScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const serviceId = Array.isArray(id) ? id[0] : id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;
    useEffect(() => {
        if (!serviceId) {
            Alert.alert("Erro", "ID do serviço não encontrado.");
            router.back();
            return;
        }

        const fetchServiceData = async () => {
            try {
                const data = await getServiceById(serviceId);
                
                setName(data.name);
                setPrice(data.price.toString());
                setDuration(data.duration.toString());
            } catch (error) {
                Alert.alert("Erro", "Não foi possível carregar os dados do serviço.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceData();
    }, [serviceId]);

    const handleUpdate = async () => {
        const priceAsNumber = parseFloat(price.replace(',', '.'));
        const durationAsNumber = parseInt(duration, 10);

        if (!name || isNaN(priceAsNumber) || isNaN(durationAsNumber)) {
            Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
            return;
        }

        setIsSaving(true);
        try {
            await updateService(serviceId, {
                name,
                price: priceAsNumber,
                duration: durationAsNumber,
            });
            Alert.alert("Sucesso!", "Serviço atualizado com sucesso.");
            router.back();
        } catch (error: any) {
            Alert.alert("Erro ao Salvar", error.message || "Não foi possível atualizar o serviço.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.centeredContainer}>
                <ActivityIndicator size="large" />
                <Text>Carregando Serviço...</Text>
            </SafeAreaView>
        );
    }

    return (
        <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.outerContainer}
                >
            <View style={[styles.mainContainer, isDesktop ? styles.desktopContainer : {}]}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Stack.Screen options={{ title: `Editando: ${name || 'Serviço'}` }} />

                    <Text style={styles.headerTitle}>Editar Serviço</Text>

                    <Text style={styles.inputLabel}>Nome do Serviço</Text>
                    <View style={styles.inputContainer}>
                        <TextInput value={name} onChangeText={setName} style={styles.input} />
                    </View>

                    <Text style={styles.inputLabel}>Preço (R$)</Text>
                    <View style={styles.inputContainer}>
                        <TextInput value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
                    </View>

                    <Text style={styles.inputLabel}>Duração (min)</Text>
                    <View style={styles.inputContainer}>
                        <TextInput value={duration} onChangeText={setDuration} style={styles.input} keyboardType="numeric" />
                    </View>

                    {isSaving ? (
                        <ActivityIndicator size="large" style={{ marginTop: 20 }}/>
                    ) : (
                        <TouchableOpacity 
                            style={styles.saveButton} 
                            onPress={handleUpdate}
                            disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                    ) : (
                                    <Text style={styles.saveButtonText}>Salvar</Text>
                                    )}
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </SafeAreaView>
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
    },
    desktopContainer: {
        flexDirection: 'row', 
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A5568',
        marginBottom: 8,
    },
    inputContainer: {
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        marginBottom: 20,
    },
    input: {
        height: 50,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#6D5FFD', 
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50, 
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    
});