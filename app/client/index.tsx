import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { Service } from "@/types/Service"
import { NavigationParams } from "@/types/NavigationParams"
import { getServices } from "@/api/service";
import { useAuth } from "@/context/AuthContext"

type ServicesListNavigationProp = StackNavigationProp<NavigationParams, "ServicesList">

const ServicesList: React.FC = () => {
  const { logout } = useAuth();
  const navigation = useNavigation<ServicesListNavigationProp>()
  const [services, setServices] = useState<Service[]>([])
  const [cart, setCart] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const servicesData = await getServices()
      setServices(servicesData)
    } catch (err) {
      setError("Failed to load services. Please try again.")
      console.error("Error fetching services:", err)
    } finally {
      setLoading(false)
    }
  }

  const toggleServiceInCart = (serviceId: string) => {
    const newCart = new Set(cart)
    if (newCart.has(serviceId)) {
      newCart.delete(serviceId)
    } else {
      newCart.add(serviceId)
    }
    setCart(newCart)
  }

  const handleSelectTime = () => {
    if (cart.size === 0) {
      Alert.alert("No Services Selected", "Please select at least one service before proceeding.")
      return
    }

    navigation.navigate("TimePicker", {
      selectedServiceIds: Array.from(cart),
    })
  }

  const formatPrice = (price: number): string => {
    return `R$${price.toFixed(2)}`
  }

  const renderServiceCard = ({ item }: { item: Service }) => {
    const isInCart = cart.has(item.id)

    return (
      <View style={styles.serviceCard}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.servicePrice}>{formatPrice(item.price)}</Text>
          <Text style={styles.serviceDuration}>{item.duration} minutos</Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, isInCart && styles.addButtonSelected]}
          onPress={() => toggleServiceInCart(item.id)}
        >
          <Text style={[styles.addButtonText, isInCart && styles.addButtonTextSelected]}>
            {isInCart ? "Remover" : "Adicionar ao Carrinho"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading services...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchServices}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossos Serviços</Text>
      <Button title="Sair (Logout)" onPress={logout} />
      <FlatList
        data={services}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      {cart.size > 0 && (
        <View style={styles.bottomContainer}>
          <Text style={styles.cartCount}>
            {cart.size} serviço{cart.size !== 1 ? "s" : ""} selecionados
          </Text>
          <TouchableOpacity style={styles.selectTimeButton} onPress={handleSelectTime}>
            <Text style={styles.selectTimeButtonText}>Selecione o Horário</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  serviceCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF",
    marginBottom: 2,
  },
  serviceDuration: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
  },
  addButtonSelected: {
    backgroundColor: "#FF3B30",
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  addButtonTextSelected: {
    color: "white",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e1e5e9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartCount: {
    fontSize: 16,
    color: "#666",
  },
  selectTimeButton: {
    backgroundColor: "#34C759",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  selectTimeButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
  },
})

export default ServicesList
