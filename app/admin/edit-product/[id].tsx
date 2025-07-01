
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView,
    ScrollView, Alert, ActivityIndicator, Platform
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getProductById, updateProduct, deleteProduct, ProductPayload } from '@/api/admin';

export default function EditProductScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const productId = Array.isArray(id) ? id[0] : id;

    const [name, setName] = useState('');
    const [salePrice, setsalePrice] = useState('');
    const [profit, setProfit] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!productId) {
            Alert.alert("Erro", "ID do produto inválido.");
            router.back();
            return;
        }

        const fetchProductData = async () => {
            try {
                const data = await getProductById(productId);
                setName(data.name);
                setsalePrice(data.salePrice.toString());
                setProfit(data.profit.toString());
                setImageUrl(data.imageUrl || '');
            } catch (error) {
                Alert.alert("Erro", "Não foi possível carregar os dados do produto.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, [productId]);

    const handleUpdate = async () => {
        const salePriceAsNumber = parseFloat(salePrice.replace(',', '.'));
        const profitAsNumber = parseFloat(profit.replace(',', '.'));

        if (!name.trim() || isNaN(salePriceAsNumber) || isNaN(profitAsNumber)) {
            Alert.alert("Erro de Validação", "Por favor, preencha todos os campos corretamente.");
            return;
        }

        setIsSaving(true);
        try {
            const payload: Partial<ProductPayload> = { name, salePrice: salePriceAsNumber, profit: profitAsNumber };
            await updateProduct(productId, payload);
            Alert.alert("Sucesso!", "Produto atualizado.");
            router.back();
        } catch (error: any) {
            Alert.alert("Erro ao Salvar", error.message || "Não foi possível atualizar o produto.");
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleDelete = () => {
        Alert.alert(
            "Deletar Produto",
            `Você tem certeza que deseja deletar "${name}"? Esta ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sim, Deletar", style: "destructive", onPress: async () => {
                    setIsDeleting(true);
                    try {
                        await deleteProduct(productId);
                        Alert.alert("Sucesso", "Produto deletado.");
                        router.back();
                    } catch (error: any) {
                        Alert.alert("Erro ao Deletar", error.message || "Não foi possível deletar o produto.");
                    } finally {
                        setIsDeleting(false);
                    }
                }}
            ]
        );
    };

    if (isLoading) {
        return <SafeAreaView style={styles.centeredContainer}><ActivityIndicator size="large" /></SafeAreaView>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ title: `Editando: ${name || 'Produto'}` }} />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerTitle}>Editar Produto</Text>
                
                <Text style={styles.inputLabel}>Nome do Produto</Text>
                <View style={styles.inputContainer}><TextInput value={name} onChangeText={setName} style={styles.input} /></View>
                
                <Text style={styles.inputLabel}>Preço de Venda (R$)</Text>
                <View style={styles.inputContainer}><TextInput value={salePrice} onChangeText={setsalePrice} style={styles.input} keyboardType="decimal-pad" /></View>
                
                <Text style={styles.inputLabel}>Lucro (R$)</Text>
                <View style={styles.inputContainer}><TextInput value={profit} onChangeText={setProfit} style={styles.input} keyboardType="decimal-pad" /></View>
                
                
                <TouchableOpacity style={styles.saveButton} onPress={handleUpdate} disabled={isSaving || isDeleting}>
                    {isSaving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Salvar Alterações</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} disabled={isSaving || isDeleting}>
                    {isDeleting ? <ActivityIndicator color="#D9534F" /> : <Text style={styles.deleteButtonText}>Deletar Produto</Text>}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flexGrow: 1,
        padding: 24
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#1A202C'
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A5568',
        marginBottom: 8
    },
    inputContainer: {
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        marginBottom: 20
    },
    input: {
        height: 55,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#2D3748'
    },
    saveButton: { 
        backgroundColor: '#6D5FFD',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10 
    },
    saveButtonText: { 
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    deleteButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#FFDAD6'
    },
    deleteButtonText: {
        color: '#D9534F',
        fontSize: 16,
        fontWeight: 'bold'
    },
});