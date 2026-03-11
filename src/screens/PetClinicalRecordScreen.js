import { View, Text, SectionList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import formatDate from "../utils/date";
import api from "../api/api";

const PetClinicalRecordScreen = ({ route }) => {
  const { petId } = route.params;
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await api.get(`/clinicalRecord/pet/${petId}`);

        const grouped = groupRecordsByYear(res.data.data);
        setSections(grouped);

      } catch (error) {
        console.log("Error fetching clinical records:", error);
      }
    };

    fetchRecords();
  }, [petId]);

  const groupRecordsByYear = (records) => {
    const groups = {};

    records.forEach((record) => {
      const year = new Date(record.date).getFullYear();

      if (!groups[year]) groups[year] = [];
      groups[year].push(record);
    });

    return Object.keys(groups)
      .sort((a, b) => b - a)
      .map((year) => ({
        title: year,
        data: groups[year],
      }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>
        {formatDate(item.date)}
      </Text>

      <Text style={styles.label}>Motivo:</Text>
      <Text style={styles.info}>{item.reason}</Text>

      <Text style={styles.label}>Diagnóstico:</Text>
      <Text style={styles.info}>{item.diagnosis}</Text>

      <Text style={styles.label}>Tratamiento:</Text>
      <Text style={styles.info}>{item.treatment}</Text>

      <Text style={styles.label}>Notas:</Text>
      <Text style={styles.info}>{item.notes}</Text>

      <Text style={styles.vet}>
        Veterinario: {item.vet.firstName} {item.vet.lastName}
      </Text>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.year}>• {title}</Text>
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default PetClinicalRecordScreen;

const styles = StyleSheet.create({
  year: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  date: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 20,
    color: "#e47b24",
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
    marginTop: 8,
    fontStyle: "italic",
    color: "gray",
    fontsize: 12
  }
});