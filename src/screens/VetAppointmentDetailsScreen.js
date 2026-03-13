import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api";
import formatDate from "../utils/date";
import { appointmentTypeMap, speciesMap } from "../utils/translation";

export default function VetAppointmentDetailsScreen({ route, navigation }) {

  const { appointmentId } = route.params;
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================

  const fetchAppointment = async () => {
    setLoading(true);

    try {
      const res = await api.get(`/appointment/dashboard/details/${appointmentId}`);
      setAppointment(res.data.data);

    } catch (err) {
      console.log("Error fetching appointment details:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  // ================= UPDATE STATUS =================

  const updateStatus = async (status) => {
    try {

      await api.patch(`/appointment/status/${appointmentId}`, {
        status
      });

      Alert.alert("Éxito", "Estado del turno actualizado");

      navigation.goBack(); // volver a agenda

    } catch (err) {
      console.log("Error updating status:", err);
      Alert.alert("Error", "No se pudo actualizar el turno");
    }
  };

  const confirmComplete = () => {
    Alert.alert(
      "Confirmar",
      "¿Marcar turno como completado?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => updateStatus("COMPLETED") }
      ]
    );
  };

  const confirmCancel = () => {
    Alert.alert(
      "Confirmar",
      "¿Cancelar turno?",
      [
        { text: "No", style: "cancel" },
        { text: "Sí", onPress: () => updateStatus("CANCELLED") }
      ]
    );
  };

  if (!appointment) return null;

  // ================= UI =================

  return (
    <View style={styles.container}>

      <Text style={styles.pet}>
        {appointment.pet?.name} • {speciesMap[appointment.pet?.species]}
      </Text>

      <Text style={styles.owner}>
        Dueño/a: {appointment.owner?.firstName} {appointment.owner?.lastName}
      </Text>

      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.info}>{formatDate(appointment.date)}</Text>

      <Text style={styles.label}>Hora</Text>
      <Text style={styles.info}>{appointment.time}</Text>

      <Text style={styles.label}>Tipo</Text>
      <Text style={styles.info}>{appointmentTypeMap[appointment.type]}</Text>

      <Text style={styles.label}>Detalles</Text>
      <Text style={styles.info}>{appointment.details || "-"}</Text>

      {/* BOTONES */}

      <TouchableOpacity style={styles.completeButton} onPress={confirmComplete}>
        <Text style={styles.buttonText}>Finalizar turno</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={confirmCancel}>
        <Text style={styles.buttonText}>Cancelar turno</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          navigation.navigate("VetPetClinicalHistory", {
            petId: appointment.pet._id
          })
        }
      >
        <Text style={styles.buttonText}>Ver historial clínico</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          navigation.navigate("CreateClinicalRecord", {
            appointmentId,
            petId: appointment.pet._id
          })
        }
      >
        <Text style={styles.buttonText}>Agregar registro clínico</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          navigation.navigate("CreatePrescription", {
            appointmentId,
            petId: appointment.pet._id
          })
        }
      >
        <Text style={styles.buttonText}>Agregar receta</Text>
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

  pet:{
    fontSize:22,
    fontWeight:"bold"
  },

  owner:{
    fontSize:18,
    marginBottom:15
  },

  label:{
    fontWeight:"bold",
    marginTop:10
  },

  info:{
    fontSize:16
  },

  completeButton:{
    marginTop:20,
    backgroundColor:"#4CAF50",
    padding:12,
    borderRadius:10,
    alignItems:"center"
  },

  cancelButton:{
    marginTop:10,
    backgroundColor:"#E53935",
    padding:12,
    borderRadius:10,
    alignItems:"center"
  },

  secondaryButton:{
    marginTop:10,
    backgroundColor:"#444",
    padding:12,
    borderRadius:10,
    alignItems:"center"
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  }

});