import { View, Text, StyleSheet, SectionList } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api";
import formatDate from "../utils/date";

export default function VetPetClinicalHistoryScreen({ route }) {
    const { petId } = route.params;
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecords = async () => {
        setLoading(true);

        try {
            const res = await api.get(`/clinicalRecord/pet/${petId}`);

            const grouped = groupRecordsByYear(res.data.data);
            setSections(grouped);

        } catch (err) {
            console.log("Error fetching clinical history:", err);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

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

  const renderRecord = ({ item }) => {

    return (
      <View style={styles.card}>

        <Text style={styles.date}>
          {formatDate(item.date)}
        </Text>

        <Text style={styles.label}>Motivo</Text>
        <Text style={styles.text}>{item.reason}</Text>

        <Text style={styles.label}>Diagnóstico</Text>
        <Text style={styles.text}>{item.diagnosis}</Text>

        <Text style={styles.label}>Tratamiento</Text>
        <Text style={styles.text}>{item.treatment || "-"}</Text>

        <Text style={styles.label}>Notas</Text>
        <Text style={styles.text}>{item.notes || "-"}</Text>

        <Text style={styles.vet}>
          Veterinario: {item.vet?.firstName} {item.vet?.lastName}
        </Text>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      {sections.length === 0 ? (
        <Text style={{margin:15}}>No hay registros clínicos para esta mascota.</Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item._id}
          renderItem={renderRecord}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.year}>• {title}</Text>
          )}
          contentContainerStyle={{ padding: 20 }}
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

  date:{
    fontWeight:"bold",
    fontSize:16,
    marginBottom:5
  },

  vet:{
    fontSize:14,
    marginBottom:10,
    color:"#555"
  },

  label:{
    fontWeight:"bold",
    marginTop:5
  },

  text:{
    fontSize:15
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
    fontSize: 18,
    fontWeight: "normal"
  },

  vet: {
    marginTop: 8,
    fontStyle: "italic",
    color: "gray",
    fontsize: 12
  }

});