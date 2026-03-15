import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import api from "../api/api";

export default function CreatePrescriptionScreen({ route, navigation }) {
    const { appointmentId } = route.params;
    const [name, setName] = useState("");
    const [dose, setDose] = useState("");
    const [frequency, setFrequency] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async () => {
        // if (!name || !dose || !frequency) {
        // Alert.alert("Error", "Todos los campos del medicamento son obligatorios");
        // return;
        // }

        try {
            await api.post("/prescription/new-prescription", {
                appointmentId,
                medication: {
                    name,
                    dose,
                    frequency
                },
                notes
            });

            Alert.alert("Éxito", "Receta creada correctamente");
            navigation.goBack();

        } catch (err) {
            console.log("Create prescription error:", err);
            Alert.alert("Error", err?.response?.data?.message || "No se pudo crear la receta");
        };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Medicamento</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Dosis</Text>
            <TextInput
                style={styles.input}
                value={dose}
                onChangeText={setDose}
            />

            <Text style={styles.label}>Frecuencia</Text>
            <TextInput
                style={styles.input}
                value={frequency}
                onChangeText={setFrequency}
            />

            <Text style={styles.label}>Notas</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar receta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"#f2f2f2"
    },

    label:{
        fontWeight:"bold",
        marginTop:10
    },

    input:{
        backgroundColor:"#fff",
        padding:10,
        borderRadius:8,
        marginTop:5
    },

    textArea:{
        height:90,
        textAlignVertical:"top"
    },

    button:{
        marginTop:25,
        backgroundColor:"#F4A261",
        padding:14,
        borderRadius:10,
        alignItems:"center"
    },

    buttonText:{
        color:"#fff",
        fontWeight:"bold"
    }
});