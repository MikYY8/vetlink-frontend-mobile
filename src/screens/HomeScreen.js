import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu, LogOut, PawPrint } from "lucide-react-native";


export default function HomeScreen({ navigation }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPets();
  }, []);

  const getPets = async () => {
    try {
      const res = await api.get("/owner/pets/my-pets");
      setPets(res.data.data);
    } catch (error) {
      console.log("Error mascotas:", error.response?.data);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigation.replace("Login");
  };

  const renderPet = ({ item }) => (
    <View style={styles.petCard}>

      <Image
        source={{ uri: item.photoUrl || "https://i.imgur.com/4AiXzf8.jpeg" }}
        style={styles.petImage}
      />

      <Text style={styles.petName}>{item.name}</Text>

      <TouchableOpacity
        style={styles.petButton}
        onPress={() => navigation.navigate("PetDetail", { petId: item._id })}
      >
        <Text style={styles.petButtonText}>Ver info</Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>
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

      <Text style={styles.title}><PawPrint size={20} color="#F4A261"/> Mis Mascotas <PawPrint size={20} color="#F4A261"/></Text>

      <FlatList
      data={pets}
      keyExtractor={(item) => item._id}
      renderItem={renderPet}
      contentContainerStyle={styles.list}/>

      <TouchableOpacity style={styles.addButton} 
      onPress={() => navigation.navigate("AddPet")}
      >
        <Text style={styles.addButtonText}>+ Agregar mascota</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f7f7f7"
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
  list:{
    padding:20
  },
  petCard:{
    backgroundColor:"#fff",
    borderRadius:15,
    padding:20,
    marginBottom:20,
    alignItems:"center",
    elevation:3
  },
  petImage:{
    width:90,
    height:90,
    borderRadius:50,
    marginBottom:10
  },
  petName:{
    fontSize:18,
    fontWeight:"600",
    marginBottom:10
  },
  petButton:{
    backgroundColor:"#e89b5c",
    paddingVertical:8,
    paddingHorizontal:20,
    borderRadius:8
  },
  petButtonText:{
    color:"#fff",
    fontWeight:"600"
  },
  addButton:{
    backgroundColor:"#333",
    margin:20,
    padding:15,
    borderRadius:10,
    alignItems:"center"
  },
  addButtonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  },

});