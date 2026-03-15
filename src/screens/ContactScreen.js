import { View, TouchableOpacity, StyleSheet, Image, Modal, Text } from "react-native";
import { Menu, LogOut } from "lucide-react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export default function ContactScreen({ navigation }) {


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Contacto</Text>
            <Text style={styles.info}>Email: veterinaria@vetlink.com</Text>
            <Text style={styles.info}>Whatsapp para consultas: 11-2345-6789</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        paddingBottom: 50,
        borderRadius: 30,
        marginTop: 10
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin:16
    },
    info:{
        fontSize: 18,
        marginLeft: 16,
        marginBottom: 5
    }

})
