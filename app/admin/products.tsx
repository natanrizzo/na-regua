import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getProducts } from '@/api/admin';

type Product = {
    id: string;
    name: string;
    salePrice: number;
    profit: number;
};


export default function ManageProductsScreen() {
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProducts(); 

                if (Array.isArray(productsData)) {
                    setProducts(productsData);
                }
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } 
        };

        fetchProducts();
    }, []);
    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={styles.productItemContainer}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="bottle-tonic-outline" size={24} color="#4A5568" />
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDetails}>
                    {`Preço: ${item.salePrice} • Lucro: ${item.profit}`}
                </Text>
            </View>
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => router.push({
                    pathname: '/admin/edit-product/[id]',
                    params: { id: item.id }
                })}
            >
                <Feather name="edit-2" size={20} color="#4A5568" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item.id}
                style={styles.list}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Gerenciar Produtos</Text>
                        <Text style={styles.headerSubtitle}>
                            Adicione ou edite os produtos do seu estoque.
                        </Text>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
                }
            />
            {/* Botão de Adicionar flutuante */}
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => router.push('/admin/add-product')}
            >
                <Feather name="plus" size={24} color="#fff" />
                <Text style={styles.addButtonText}>Adicionar Produto</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    list: {
        paddingHorizontal: 20,
    },
    headerContainer: {
        paddingTop: 24,
        paddingBottom: 16,
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
    productItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginTop: 12,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
            android: { elevation: 3 },
            web: { boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' }
        }),
    },
    iconContainer: {
        backgroundColor: '#F0F4F7',
        padding: 12,
        borderRadius: 50,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
    },
    productDetails: {
        fontSize: 14,
        color: '#718096',
        marginTop: 4,
    },
    editButton: {
        padding: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        flexDirection: 'row',
        backgroundColor: '#6D5FFD',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: { shadowColor: '#6D5FFD', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
            android: { elevation: 8 },
            web: { boxShadow: '0 4px 14px rgba(109, 95, 253, 0.3)' }
        }),
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#A0AEC0',
        fontSize: 16,
    },
});