import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator,
    Platform
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { addProduct, ProductPayload } from '@/api/admin';

export default function AddProductScreen() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [profit, setProfit] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCurrencyChange = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const cleanedText = text.replace(/[^0-9,.]/g, '').replace(',', '.');
        const parts = cleanedText.split('.');
        if (parts.length > 2 || (parts[1] && parts[1].length > 2)) {
            return;
        }
        setter(cleanedText);
    };

    const handleSaveProduct = async () => {
        const salePriceAsNumber = parseFloat(salePrice);
        const profitAsNumber = parseFloat(profit);

        if (!name.trim() || !salePrice.trim() || !profit.trim()) {
            Alert.alert("Erro de Validação", "Os campos de nome, preço e lucro são obrigatórios.");
            return;
        }
        if (isNaN(salePriceAsNumber) || isNaN(profitAsNumber)) {
            Alert.alert("Erro de Validação", "Preço e Lucro devem ser números válidos.");
            return;
        }

        setIsLoading(true);
        try {
            const payload: ProductPayload = {
                name,
                salePrice: salePriceAsNumber,
                profit: profitAsNumber,
            };
            if (imageUrl.trim()) {
                payload.imageUrl = imageUrl.trim();
            }

            await addProduct(payload);
            Alert.alert("Sucesso!", "Novo produto adicionado com sucesso.");
            router.back();
        } catch (error: any) {
            Alert.alert("Erro ao Salvar", error.message || "Não foi possível adicionar o produto.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ title: 'Adicionar Produto' }} />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerTitle}>Novo Produto</Text>
                
                <Text style={styles.inputLabel}>Nome do Produto</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Ex: Pomada Modeladora" value={name} onChangeText={setName} style={styles.input}/>
                </View>

                <Text style={styles.inputLabel}>Preço de Venda (R$)</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Ex: 45.50" value={salePrice} onChangeText={(text) => handleCurrencyChange(text, setSalePrice)} style={styles.input} keyboardType="decimal-pad"/>
                </View>

                <Text style={styles.inputLabel}>Lucro (R$)</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Ex: 20.00" value={profit} onChangeText={(text) => handleCurrencyChange(text, setProfit)} style={styles.input} keyboardType="decimal-pad"/>
                </View>

                <Text style={styles.inputLabel}>Nome da Imagem (Opcional)</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Ex: image1.jpg"
                        value={imageUrl}
                        onChangeText={setImageUrl}
                        style={styles.input}
                        autoCapitalize="none"
                    />
                </View>
                
                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={handleSaveProduct}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Feather name="plus-circle" size={20} color="#fff" />
                            <Text style={styles.saveButtonText}>Salvar Produto</Text>
                        </>
                    )}
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flexGrow: 1,
        padding: 24,
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
        marginBottom: 32,
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
        borderRadius: 12,
        marginBottom: 20,
    },
    input: {
        height: 55,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#2D3748',
    },
    saveButton: {
        flexDirection: 'row',
        backgroundColor: '#6D5FFD',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});