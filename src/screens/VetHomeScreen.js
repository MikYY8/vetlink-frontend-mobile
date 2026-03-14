import { View, ScrollView, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api";
import formatDate from "../utils/date";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appointmentTypeMap, speciesMap, statusMap } from "../utils/translation";
import { Menu, LogOut, PawPrint } from "lucide-react-native";

export default function VetHomeScreen({ navigation }) {

  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================

  const fetchAgenda = async () => {
    setLoading(true);
    try {
      const res = await api.get("/appointment/vet-agenda/today");
      setAgenda(res.data.data);
    } catch (err) {
      console.log("Error fetching vet agenda:", err);
    }
    setLoading(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigation.replace("Login");
  };

  // ================= EFFECT =================

  useEffect(() => {
    fetchAgenda();
  }, []);

  // ================= RENDER ITEM =================

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "#1E88E5";
      case "COMPLETED":
        return "#43A047";
      case "CANCELLED":
        return "#E53935";
      default:
        return "#000";
    }
  };

  const renderAppointment = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("VetAppointmentDetails", {
          appointmentId: item._id,
        })
      }
    >
      <Text style={styles.time}>{item.time}</Text>

      <Text style={styles.pet}>
        {item.pet.name} • {speciesMap[item.pet.species]}
      </Text>

      <Text style={styles.owner}>
        Dueño/a: {item.owner.firstName} {item.owner.lastName}
      </Text>

      <Text style={styles.type}>
        {appointmentTypeMap[item.type]}
      </Text>

      <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
        {statusMap[item.status]}
      </Text>

    </TouchableOpacity>
  );

  // ================= UI =================

  return (
      <View style={styles.agenda}>
          <View style={styles.navbar}>
      
              <TouchableOpacity>
                <Menu size={28} color="#333"/>
              </TouchableOpacity>
      
              <Image
              source={require("../assets/logo-vetlink.png")}
              style={styles.logo}/>
      
              <TouchableOpacity onPress={logout}>
                <LogOut size={26} color="#333"/>
              </TouchableOpacity>
      
          </View>
              <Text style={styles.title}>Agenda de hoy</Text>

              <FlatList
                data={agenda}
                keyExtractor={(item) => item._id}
                renderItem={renderAppointment}
                contentContainerStyle={{ paddingBottom: 40 }}
                ListEmptyComponent={
                  !loading && (
                    <Text style={styles.emptyText}>
                      No hay turnos programados para hoy
                    </Text>
                  )
                }
              />
      </View>
  );
}

const styles = StyleSheet.create({
  agenda: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  navbar:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    padding:15,
    backgroundColor:"#fff",
    elevation:4
  },

  logo:{
    width:120,
    height:40,
    resizeMode:"contain"
  },

  title:{
    fontSize:24,
    fontWeight:"bold",
    paddingHorizontal:20,
    marginTop:15,
    margin: "auto",
    color: "#F4A261"
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    borderRadius: 10
  },

  time: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e47b24"
  },

  pet: {
    fontSize: 18,
    fontWeight: "bold"
  },

  owner: {
    fontSize: 16,
    color: "#444"
  },

  type: {
    marginTop: 5,
    fontSize: 16
  },

  status:{
    fontWeight: "bold",
    fontSize: 16
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#666"
  }

});