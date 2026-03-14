import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api";
import formatDate from "../utils/date";
import { Pill } from 'lucide-react-native';

export default function VetPetPrescriptionScreen({ route }) {
    const { petId } = route.params;
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(false);

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
       <Pill size={20} color={"#e47b24"}/> {formatDate(item.date)}
      </Text>

      <Text style={styles.label}>Nombre: 
       <Text style={styles.info}> {item.medication.name}</Text>
      </Text>

      <Text style={styles.label}>Dosis:
        <Text style={styles.info}> {item.medication.dose}</Text>
      </Text>

      <Text style={styles.label}>Frecuencia:
        <Text style={styles.info}> {item.medication.frequency}</Text>
      </Text>

      {item.notes && (
        <>
          <Text style={styles.label}>Notas:
            <Text style={styles.info}> {item.notes}</Text>
          </Text>
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
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f2f2f2"
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    margin: 16
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
    fontSize: 18,
    fontWeight: "normal"
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

  text:{
    fontSize:15
  },

});