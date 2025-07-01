import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ServiceCardTypes } from "./types";

const ServiceCard = (props: ServiceCardTypes) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.price}>R$ {props.price.toFixed(2)}</Text>
            <Text style={styles.description}>{props.duration}</Text>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333",
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
        color: "#2a9d8f",
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
        lineHeight: 20,
    },
    button: {
        backgroundColor: "#e76f51",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
});

export default ServiceCard;
