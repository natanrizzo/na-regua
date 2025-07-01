import React, { useState, useEffect, useMemo } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, FlatList,
    SafeAreaView, Platform, ActivityIndicator, Alert
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getProducts } from '@/api/barber';

type Product = {
    id: string;
    name: string;
    salePrice: number;
};

type OrderState = {
    [productId: string]: number;
};
export default function OrderProductsScreen() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [order, setOrder] = useState<OrderState>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                if (Array.isArray(data)) setProducts(data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddItem = (productId: string) => {
        setOrder((prev: OrderState) => ({ ...prev, [productId]: 1 }));
    };

    const handleIncrement = (productId: string) => {
        setOrder(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    };

    const handleDecrement = (productId: string) => {
        setOrder(prev => {
            const newOrder = { ...prev };
            if (newOrder[productId] > 1) {
                newOrder[productId]--;
            } else {
                delete newOrder[productId];
            }
            return newOrder;
        });
    };

    

    const renderProductItem = ({ item }: { item: Product }) => {
        const quantityInOrder = order[item.id] || 0;

        return (
            <View style={styles.productItemContainer}>
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productDetails}>{item.salePrice}</Text>
                </View>
                
                {quantityInOrder === 0 ? (
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddItem(item.id)}>
                        <Feather name="plus" size={16} color="#fff" />
                        <Text style={styles.addButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.quantitySelector}>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(item.id)}>
                            <Feather name={quantityInOrder === 1 ? 'trash-2' : 'minus'} size={20} color="#6D5FFD" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantityInOrder}</Text>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(item.id)}>
                            <Feather name="plus" size={20} color="#6D5FFD" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    if (isLoading) {
        return <SafeAreaView style={styles.centered}><ActivityIndicator size="large" /></SafeAreaView>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ title: 'Pedir Produtos' }}/>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item.id}
                style={styles.list}
                contentContainerStyle={{ paddingBottom: 120 }}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Catálogo de Produtos</Text>
                        <Text style={styles.headerSubtitle}>Selecione os itens e quantidades para fazer um novo pedido.</Text>
                    </View>
                }
            />
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.confirmButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    list: {
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: {
        paddingVertical: 24,
        paddingTop: 16
    },
    headerTitle: {
        fontSize: 28,
        fontWeight:'bold',
        color: '#1A202C'
    },

    headerSubtitle: {
        fontSize: 16,
        color: '#718096',
        marginTop: 4 },

    productItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12, 
        marginBottom: 12,

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2 
            },
            shadowOpacity: 0.05,
            shadowRadius: 5 },
            android: {
                elevation: 3
            },
            web: {
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' 
            }
        }),
    },
    productInfo: { 
        flex: 1,
        marginRight: 10 },
    productName: { 
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748' },
    productDetails: { 
        fontSize: 14,
        color: '#718096',
        marginTop: 4
    },
    addButton: {
        flexDirection: 'row', 
        backgroundColor: '#E9E7FF',
        paddingVertical: 8, 
        paddingHorizontal: 12, 
        borderRadius: 20, 
        alignItems: 'center',
    },
    addButtonText: { 
        color: '#6D5FFD', 
        fontWeight: 'bold', 
        marginLeft: 4 
    },

    quantitySelector: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#F0F4F7', 
        borderRadius: 20,
    },
    quantityButton: { 
        padding: 10 
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold', 
        color: '#1A202C',
        minWidth: 40,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    confirmButton: {
        backgroundColor: '#6D5FFD',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
});