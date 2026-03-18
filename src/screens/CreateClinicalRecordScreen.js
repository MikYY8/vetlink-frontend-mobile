import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import api from "../api/api";

export default function CreateClinicalRecordScreen({ route, navigation }) {
    const { appointmentId } = route.params;

    const [formData, setFormData] = useState({
        reason: "",
        diagnosis: "",
        treatment: "",
        notes: ""
    });

    const [error, setError] = useState({});

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // limpia error mientras escribe
        setError(prev => ({
            ...prev,
            [name]: null
        }));
    };

    const validate = () => {
        let newErrors = {};

        ["reason", "diagnosis", "treatment"].forEach(field => {
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
            await api.post("/clinicalRecord/new-clinical-record", {
                appointmentId,
                ...formData
            });

            // alert("Registro clínico creado correctamente");
            navigation.goBack();

        } catch (err) {
            alert(err?.response?.data?.message || "No se pudo crear el registro");
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.label}>Motivo de la consulta</Text>
            <TextInput
                style={styles.input}
                value={formData.reason}
                onChangeText={(text) => handleChange("reason", text)}
            />
            {error.reason && <Text style={styles.error}>{error.reason}</Text>}

            <Text style={styles.label}>Diagnóstico</Text>
            <TextInput
                style={styles.input}
                value={formData.diagnosis}
                onChangeText={(text) => handleChange("diagnosis", text)}
            />
            {error.diagnosis && <Text style={styles.error}>{error.diagnosis}</Text>}

            <Text style={styles.label}>Tratamiento</Text>
            <TextInput
                style={styles.input}
                value={formData.treatment}
                onChangeText={(text) => handleChange("treatment", text)}
            />
            {error.treatment && <Text style={styles.error}>{error.treatment}</Text>}

            <Text style={styles.label}>Notas</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.notes}
                onChangeText={(text) => handleChange("notes", text)}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar registro clínico</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f2f2f2"
    },

    label: {
        fontWeight: "bold",
        marginTop: 10
    },

    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        marginTop: 5
    },

    textArea: {
        height: 90,
        textAlignVertical: "top"
    },

    error: {
        color: "red",
        marginTop: 4
    },

    button: {
        marginTop: 25,
        backgroundColor: "#F4A261",
        padding: 14,
        borderRadius: 10,
        alignItems: "center"
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    }
});