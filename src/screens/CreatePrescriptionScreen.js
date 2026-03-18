import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import api from "../api/api";

export default function CreatePrescriptionScreen({ route, navigation }) {
    const { appointmentId } = route.params;

    const [formData, setFormData] = useState({
        name: "",
        dose: "",
        frequency: "",
        notes: ""
    });

    const [error, setError] = useState({});

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // limpiar error al escribir
        setError(prev => ({
            ...prev,
            [name]: null
        }));
    };

    const validate = () => {
        let newErrors = {};

        ["name", "dose", "frequency"].forEach(field => {
            if (!formData[field]) {
                newErrors[field] = "El campo no puede quedar vacío";
            }
        });

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            await api.post("/prescription/new-prescription", {
                appointmentId,
                medication: {
                    name: formData.name,
                    dose: formData.dose,
                    frequency: formData.frequency
                },
                notes: formData.notes
            });

            // alert("Receta creada correctamente");
            navigation.goBack();

        } catch (err) {
            alert(err?.response?.data?.message || "No se pudo crear la receta");
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.label}>Medicamento</Text>
            <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
            />
            {error.name && <Text style={styles.error}>{error.name}</Text>}

            <Text style={styles.label}>Dosis</Text>
            <TextInput
                style={styles.input}
                value={formData.dose}
                onChangeText={(text) => handleChange("dose", text)}
            />
            {error.dose && <Text style={styles.error}>{error.dose}</Text>}

            <Text style={styles.label}>Frecuencia</Text>
            <TextInput
                style={styles.input}
                value={formData.frequency}
                onChangeText={(text) => handleChange("frequency", text)}
            />
            {error.frequency && <Text style={styles.error}>{error.frequency}</Text>}

            <Text style={styles.label}>Notas</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.notes}
                onChangeText={(text) => handleChange("notes", text)}
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

    error:{
        color:"red",
        marginTop:4
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