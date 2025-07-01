import type React from "react"
import { useState, useEffect } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    Dimensions,
} from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { getOccupiedSlots, getServices, OccupiedMap } from "@/api/service"
import { NavigationParams } from "@/types/NavigationParams"
import { Service } from "@/types/Service"

type TimePickerNavigationProp = StackNavigationProp<NavigationParams, "TimePicker">
type TimePickerRouteProp = RouteProp<NavigationParams, "TimePicker">

interface CalendarDay {
    date: Date
    dateString: string
    isCurrentMonth: boolean
    isToday: boolean
    hasOccupiedSlots: boolean
    isDisabled: boolean
}

const { width } = Dimensions.get("window")
const CALENDAR_WIDTH = width - 32

const TimePicker: React.FC = () => {
    const navigation = useNavigation<TimePickerNavigationProp>()
    const route = useRoute<TimePickerRouteProp>()
    const { selectedServiceIds } = route.params

    const [services, setServices] = useState<Service[]>([])
    const [occupiedSlots, setOccupiedSlots] = useState<OccupiedMap>({})
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [showTimeModal, setShowTimeModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
        setLoading(true)
        setError(null)

        const [servicesData, occupiedData] = await Promise.all([
            getServices(),
            getOccupiedSlots(selectedServiceIds),
        ])

        const selectedServices = servicesData.filter((service) => selectedServiceIds.includes(service.id))

        setServices(selectedServices)
        setOccupiedSlots(occupiedData)
        } catch (err) {
        setError("Failed to load time slots. Please try again.")
        console.error("Error fetching data:", err)
        } finally {
        setLoading(false)
        }
    }

    const generateCalendarDays = (): CalendarDay[] => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const startDate = new Date(firstDay)
        startDate.setDate(startDate.getDate() - firstDay.getDay())

        const days: CalendarDay[] = []
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        for (let i = 0; i < 42; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)

        const dateString = date.toISOString().split("T")[0]
        const isCurrentMonth = date.getMonth() === month
        const isToday = date.getTime() === today.getTime()
        const isPast = date < today

        const hasOccupiedSlots = Object.values(occupiedSlots).some((slots) =>
            slots.some((slot) => slot.startsWith(dateString)),
        )

        days.push({
            date,
            dateString,
            isCurrentMonth,
            isToday,
            hasOccupiedSlots,
            isDisabled: isPast || !isCurrentMonth,
        })
        }

        return days
    }

    const generateTimeSlotsForDate = (dateString: string): string[] => {
        const slots: string[] = []
        const selectedDate = new Date(dateString + "T00:00:00")

        for (let hour = 9; hour <= 18; hour++) {
        const slotDate = new Date(selectedDate)
        slotDate.setHours(hour, 0, 0, 0)
        slots.push(slotDate.toISOString())
        }

        return slots
    }

    const isTimeSlotOccupied = (slot: string): boolean => {
        return selectedServiceIds.some((serviceId) => occupiedSlots[serviceId]?.includes(slot))
    }

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        })
    }

    const formatTime = (isoString: string): string => {
        const date = new Date(isoString)
        return date.toLocaleTimeString("pt-BR", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
        })
    }

    const handleDateSelect = (day: CalendarDay) => {
        if (day.isDisabled) return

        setSelectedDate(day.dateString)
        setShowTimeModal(true)
    }

    const handleTimeSelect = (timeSlot: string) => {
        if (isTimeSlotOccupied(timeSlot)) {
        Alert.alert("Slot Unavailable", "This time slot is already booked.")
        return
        }

        setSelectedDateTime(timeSlot)
        setShowTimeModal(false)
    }

    const handleContinue = () => {
        if (!selectedDateTime) {
        Alert.alert("No Time Selected", "Please select a date and time slot to continue.")
        return
        }

        navigation.navigate("OrderSummary", {
        selectedServices: services,
        selectedDateTime,
        })
    }

    const navigateMonth = (direction: "prev" | "next") => {
        const newMonth = new Date(currentMonth)
        if (direction === "prev") {
        newMonth.setMonth(currentMonth.getMonth() - 1)
        } else {
        newMonth.setMonth(currentMonth.getMonth() + 1)
        }
        setCurrentMonth(newMonth)
    }

    if (loading) {
        return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading available times...</Text>
        </View>
        )
    }

    if (error) {
        return (
        <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
            <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
        </View>
        )
    }

    const calendarDays = generateCalendarDays()
    const timeSlots = selectedDate ? generateTimeSlotsForDate(selectedDate) : []

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Selecione a Data do Agendamento</Text>

        <View style={styles.servicesContainer}>
            <Text style={styles.sectionTitle}>Serviços Selecionados:</Text>
            {services.map((service) => (
            <Text key={service.id} style={styles.serviceItem}>
                • {service.name} ({service.duration} min)
            </Text>
            ))}
        </View>

        <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => navigateMonth("prev")} style={styles.navButton}>
                <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
                {currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            </Text>
            <TouchableOpacity onPress={() => navigateMonth("next")} style={styles.navButton}>
                <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.weekHeader}>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
                <Text key={day} style={styles.weekDay}>
                {day}
                </Text>
            ))}
            </View>

            <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
                <TouchableOpacity
                key={index}
                style={[
                    styles.calendarDay,
                    !day.isCurrentMonth && styles.calendarDayInactive,
                    day.isToday && styles.calendarDayToday,
                    day.hasOccupiedSlots && styles.calendarDayOccupied,
                    day.isDisabled && styles.calendarDayDisabled,
                    selectedDate === day.dateString && styles.calendarDaySelected,
                ]}
                onPress={() => handleDateSelect(day)}
                disabled={day.isDisabled}
                >
                <Text
                    style={[
                    styles.calendarDayText,
                    !day.isCurrentMonth && styles.calendarDayTextInactive,
                    day.isToday && styles.calendarDayTextToday,
                    day.isDisabled && styles.calendarDayTextDisabled,
                    selectedDate === day.dateString && styles.calendarDayTextSelected,
                    ]}
                >
                    {day.date.getDate()}
                </Text>
                {day.hasOccupiedSlots && day.isCurrentMonth && !day.isDisabled && <View style={styles.occupiedDot} />}
                </TouchableOpacity>
            ))}
            </View>
        </View>

        <Modal
            visible={showTimeModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowTimeModal(false)}
        >
            <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                    Selecione a hora de {selectedDate && formatDate(new Date(selectedDate + "T00:00:00"))}
                </Text>
                <TouchableOpacity onPress={() => setShowTimeModal(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
                </View>

                <ScrollView style={styles.timeSlotsContainer}>
                {timeSlots.map((slot) => {
                    const isOccupied = isTimeSlotOccupied(slot)
                    const isSelected = selectedDateTime === slot

                    return (
                    <TouchableOpacity
                        key={slot}
                        style={[
                        styles.timeSlot,
                        isOccupied && styles.timeSlotOccupied,
                        isSelected && styles.timeSlotSelected,
                        ]}
                        onPress={() => handleTimeSelect(slot)}
                        disabled={isOccupied}
                    >
                        <Text
                        style={[
                            styles.timeSlotText,
                            isOccupied && styles.timeSlotTextOccupied,
                            isSelected && styles.timeSlotTextSelected,
                        ]}
                        >
                        {formatTime(slot)}
                        </Text>
                        {isOccupied && <Text style={styles.occupiedLabel}>Unavailable</Text>}
                    </TouchableOpacity>
                    )
                })}
                </ScrollView>
            </View>
            </View>
        </Modal>

        {selectedDateTime && (
            <View style={styles.bottomContainer}>
            <Text style={styles.selectedTimeText}>
                Selecionado: {formatDate(new Date(selectedDateTime))} às {formatTime(selectedDateTime)}
            </Text>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continuar</Text>
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
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
        color: "#333",
    },
    servicesContainer: {
        backgroundColor: "white",
        margin: 16,
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    serviceItem: {
        fontSize: 16,
        color: "#666",
        marginBottom: 4,
    },
    calendarContainer: {
        backgroundColor: "white",
        margin: 16,
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    calendarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    navButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
    },
    navButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#007AFF",
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    weekHeader: {
        flexDirection: "row",
        marginBottom: 10,
    },
    weekDay: {
        flex: 1,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
        color: "#666",
        paddingVertical: 8,
    },
    calendarGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    calendarDay: {
        width: `${100 / 7}%`,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    calendarDayInactive: {
        opacity: 0.3,
    },
    calendarDayToday: {
        backgroundColor: "#e3f2fd",
        borderRadius: 20,
    },
    calendarDayOccupied: {
        backgroundColor: "#fff3e0",
    },
    calendarDayDisabled: {
        opacity: 0.3,
    },
    calendarDaySelected: {
        backgroundColor: "#007AFF",
        borderRadius: 20,
    },
    calendarDayText: {
        fontSize: 16,
        color: "#333",
    },
    calendarDayTextInactive: {
        color: "#ccc",
    },
    calendarDayTextToday: {
        color: "#007AFF",
        fontWeight: "bold",
    },
    calendarDayTextDisabled: {
        color: "#ccc",
    },
    calendarDayTextSelected: {
        color: "white",
        fontWeight: "bold",
    },
    occupiedDot: {
        position: "absolute",
        bottom: 4,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#FF9500",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "70%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        flex: 1,
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        color: "#666",
    },
    timeSlotsContainer: {
        padding: 20,
    },
    timeSlot: {
        backgroundColor: "#f8f9fa",
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    timeSlotOccupied: {
        backgroundColor: "#f5f5f5",
        opacity: 0.6,
    },
    timeSlotSelected: {
        backgroundColor: "#007AFF",
        borderColor: "#007AFF",
    },
    timeSlotText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
    },
    timeSlotTextOccupied: {
        color: "#999",
    },
    timeSlotTextSelected: {
        color: "white",
        fontWeight: "600",
    },
    occupiedLabel: {
        fontSize: 12,
        color: "#FF3B30",
        fontWeight: "500",
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
    },
    selectedTimeText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 12,
        textAlign: "center",
    },
    continueButton: {
        backgroundColor: "#34C759",
        paddingVertical: 12,
        borderRadius: 8,
    },
    continueButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
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

export default TimePicker
