import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function PetDetailScreen({ route }) {
  const { petId } = route.params;
  const [pet, setPet] = useState(null);

  useEffect(() => {
    getPet();
  }, []);

  const getPet = async () => {
    const res = await api.get(`/owner/pets/mypet/${petId}`);
    setPet(res.data.data);
  };

  if (!pet) return <Text>Cargando...</Text>;

  return (
    <View>
      <Text>{pet.name}</Text>
      <Text>{pet.breed}</Text>
      <Text>{pet.age}</Text>
    </View>
  );
}