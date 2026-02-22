import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api";

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

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Mis Mascotas</Text>

      <FlatList
        data={pets}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PetDetail", { petId: item._id })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}