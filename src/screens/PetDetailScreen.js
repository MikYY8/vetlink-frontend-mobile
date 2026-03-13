import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api";
import { speciesMap } from "../utils/translation"
import { calcularEdad } from "../utils/dateUtils";

export default function PetDetailScreen({ route, navigation }) {

  const { petId } = route.params;
  const [pet, setPet] = useState(null);

  const getPet = async () => {
    try {
      const res = await api.get(`/owner/pets/mypet/${petId}`);
      setPet(res.data.data);
    } catch (error) {
      console.log("Error mascota:", error.response?.data);
    }
  };

  useEffect(() => {
    getPet();
  }, []);

  if (!pet) {
    return (
      <View style={styles.loading}>
        <Text>Cargando mascota...</Text>
      </View>
    );
  }

  function formatearEdad(pet) {
    if (!pet.birthDate) return "Edad desconocida";
    const { years, months } = calcularEdad(pet.birthDate);
    let texto = "";

    if (years > 0) {
      texto = `${years} año(s)`;
        if (months > 0) texto += ` y ${months} mes(es)`;
        } else {
            texto = `${months} mes(es)`;
        };

        if (pet.isEstimated) texto += " (estimado)";
        return texto;
    };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.profile}>

        <Image
          source={{ uri: pet.photoUrl || "https://i.imgur.com/4AiXzf8.jpeg" }}
          style={styles.image}/>

        <Text style={styles.name}>{pet.name}</Text>

        <Text style={styles.species}>
          {speciesMap[pet.species] || pet.species} • {pet.breed}
        </Text>

      </View>

      {/* INFO */}

      <View style={styles.infoCard}>

        <Text style={styles.info}>Edad: <Text style={styles.info2}>{formatearEdad(pet)}</Text></Text>
        <Text style={styles.info}>Sexo: <Text style={styles.info2}>{pet.sex}</Text></Text>
        <Text style={styles.info}>Color: <Text style={styles.info2}>{pet.color}</Text></Text>
        <Text style={styles.info}>Castrado: <Text style={styles.info2}>{pet.isNeutered ? "Sí" : "No"}</Text></Text>

      </View>

      {/* BOTONES */}

      <View style={styles.buttonsContainer}>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate("EditPet", { pet })}
        >
          <Text style={styles.buttonText}>Editar info</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton2}
          onPress={() => navigation.navigate("MakeAppointment", { pet })}
        >
          <Text style={styles.buttonText}>Agendar turno</Text>
        </TouchableOpacity>

        <View style={styles.gridButtons}>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("OwnerAppointments", { pet })}
          >
            <Text style={styles.secondaryText}>Historial de turnos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("PetClinicalRecord", { petId: pet._id})}
          >
            <Text style={styles.secondaryText}>Registro clínico</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("PetPrescriptions", { petId: pet._id})}
          >
            <Text style={styles.secondaryText}>Recetas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("PetVaccines", { pet })}
          >
            <Text style={styles.secondaryText}>Vacunas</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f7f7f7"
  },
  loading:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  profile:{
    alignItems:"center",
    marginTop:30,
    marginBottom:20
  },
  image:{
    width:170,
    height:170,
    borderRadius:90,
    marginBottom:10,
  },
  name:{
    fontSize:26,
    fontWeight:"bold"
  },
  species:{
    fontSize:16,
    color:"#666"
  },
  infoCard:{
    backgroundColor:"#fff",
    marginHorizontal:20,
    padding:20,
    borderRadius:12,
    marginBottom:20,
    elevation:3
  },
  info:{
    fontSize:16,
    marginBottom:8,
    fontWeight: "bold"
  },
  info2:{
    fontWeight: "normal"
  },
    buttonsContainer:{
    paddingHorizontal:20,
    paddingBottom:30
  },
  primaryButton:{
    backgroundColor:"#e89b5c",
    padding:15,
    borderRadius:10,
    alignItems:"center",
    marginBottom:15
  },
  primaryButton2:{
    backgroundColor:"#464646",
    padding:15,
    borderRadius:10,
    alignItems:"center",
    marginBottom:15
  },
  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  },
  gridButtons:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },
  secondaryButton:{
    backgroundColor:"#fff",
    width:"48%",
    padding:15,
    borderRadius:10,
    marginBottom:15,
    alignItems:"center",
    elevation:2
  },
  secondaryText:{
    fontWeight:"600"
  },
});