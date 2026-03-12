import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import formatDate from "../utils/date";
import api from "../api/api";

const PrescriptionsScreen = ({ route }) => {
  const { petId } = route.params;
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await api.get(`/prescription/pet/${petId}`);
        setPrescriptions(res.data.data);
      } catch (error) {
        console.log("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [petId]);

  const renderPrescription = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>
       {formatDate(item.date)}
      </Text>

      <Text style={styles.medicationName}>
       {item.medication.name}
      </Text>

      <Text style={styles.label}>Dosis:</Text>
      <Text style={styles.info}>{item.medication.dose}</Text>

      <Text style={styles.label}>Frecuencia:</Text>
      <Text style={styles.info}>{item.medication.frequency}</Text>

      {item.notes && (
        <>
          <Text style={styles.label}>Notas:</Text>
          <Text style={styles.info}>{item.notes}</Text>
        </>
      )}

      <Text style={styles.vet}>
        Veterinario: {item.vet.firstName} {item.vet.lastName} ({item.vet.specialty})
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {prescriptions.length === 0 ? (
        <Text>No hay recetas registradas.</Text>
      ) : (
        <FlatList
          data={prescriptions}
          keyExtractor={(item) => item._id}
          renderItem={renderPrescription}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default PrescriptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2
  },

  medicationName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6
  },

  label: {
    fontWeight: "bold",
    marginTop: 6,
    fontSize: 18,
  },

  info:{
    fontSize: 18
  },

  vet: {
    marginTop: 10,
    fontStyle: "italic",
    color: "gray"
  },

    date: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 20,
    color: "#e47b24",
  },
});