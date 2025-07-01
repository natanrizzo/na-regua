import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, SafeAreaView } from "react-native"
import { useRoute, type RouteProp } from "@react-navigation/native"
import type { NavigationParams } from "@/types/NavigationParams"

import { useAuth } from '@/context/AuthContext';
import { createAppointment } from "@/api/client";
type OrderSummaryRouteProp = RouteProp<NavigationParams, "OrderSummary">

const OrderSummary: React.FC = () => {
  const route = useRoute<OrderSummaryRouteProp>()
  const { selectedServices, selectedDateTime } = route.params
  const { user } = useAuth()


  const formatPrice = (price: number) => `R$${price.toFixed(2)}`

  const formatDateTime = (isoString: string) =>
    new Date(isoString).toLocaleDateString("pt-BR", {
      weekday: "long", year: "numeric", month: "long",
      day: "numeric", hour: "numeric", minute: "2-digit",
    })

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0)
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0)

  const handleConfirm = async () => {
  if (!user || !user.sub) {
      Alert.alert("Erro de Autenticação", "Não foi possível identificar o usuário. Por favor, faça login novamente.");
      return;
    }

    try {
      const appointmentPromises = selectedServices.map(service => 
        createAppointment(user.sub, service.id, selectedDateTime)
      );
      await Promise.all(appointmentPromises);

      Alert.alert(
        "Agendamento Confirmado",
        "Seus serviços foram agendados com sucesso!",
        [{ text: "OK" }] 
      );

    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      Alert.alert(
        "Erro no Agendamento",
        "Não foi possível realizar o agendamento de um ou mais serviços. Por favor, tente novamente."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>

      <View style={styles.scrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hora Marcada</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.dateTimeText}>{formatDateTime(selectedDateTime)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Serviços Selecionados</Text>
            {selectedServices.map((s) => (
              <View key={s.id} style={styles.serviceRow}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{s.name}</Text>
                  <Text style={styles.serviceDuration}>{s.duration} minutos</Text>
                </View>
                <Text style={styles.servicePrice}>{formatPrice(s.price)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumo</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duração Total:</Text>
              <Text style={styles.summaryValue}>{totalDuration} minutos</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Número de Serviços:</Text>
              <Text style={styles.summaryValue}>{selectedServices.length}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Preço Total:</Text>
              <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notas Importantes</Text>
            <Text style={styles.noteText}>• Chegue com pelo menos 10 minutos de antecedência.</Text>
            <Text style={styles.noteText}>• Cancelamentos devem ser feitos pelo menos 24 horas antes</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>
            Confirmar Agendamento - {formatPrice(totalPrice)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa"
  },
  title: {
    fontSize: 24, 
  fontWeight: "bold", 
  textAlign: "center",
  marginVertical: 20,
  color: "#333"
},

  scrollWrapper: {
    flex: 1, 
    marginHorizontal: 16
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600", color: "#333",
    marginBottom: 12
  },
  timeContainer: {
    backgroundColor: "#f0f8ff",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF" 
  },
  dateTimeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF"
  },

  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  serviceInfo: {
    flex: 1
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2
  },
  serviceDuration: {
    fontSize: 14,
    color: "#666"
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF"
  },

  summaryRow: {
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666"
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333"
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginTop: 8,
    paddingTop: 12
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333"
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34C759"
  },

  noteText: { fontSize: 14,
    color: "#666",
    marginBottom: 4,
    lineHeight: 20 
  },

  bottomContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e1e5e9"
  },
  confirmButton: {
    backgroundColor: "#34C759",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#34C759",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
})

export default OrderSummary;