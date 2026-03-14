import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import api from "../api/api";

export default function CreateClinicalRecordScreen({ route, navigation }) {
    const { appointmentId } = route.params;
    const [reason, setReason] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async () => {
        // if (!reason || !diagnosis) {
        //     Alert.alert("Error", "Rellene los campos obligatorios");
        //     return;
        // };

        try {
            await api.post("/clinicalRecord/new-clinical-record", {
                appointmentId,
                reason,
                diagnosis,
                treatment,
                notes
            });

            Alert.alert("Éxito", "Registro clínico creado correctamente");
            navigation.goBack();

        } catch (err) {
            console.log("Create clinical record error:", err);

            Alert.alert(
                "Error",
                err?.response?.data?.message || "No se pudo crear el registro"
            );
        };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Motivo de la consulta</Text>
            <TextInput
                style={styles.input}
                value={reason}
                onChangeText={setReason}
            />

            <Text style={styles.label}>Diagnóstico</Text>
            <TextInput
                style={styles.input}
                value={diagnosis}
                onChangeText={setDiagnosis}
            />

            <Text style={styles.label}>Tratamiento</Text>
            <TextInput
                style={styles.input}
                value={treatment}
                onChangeText={setTreatment}
            />

            <Text style={styles.label}>Notas</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar registro clínico</Text>
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