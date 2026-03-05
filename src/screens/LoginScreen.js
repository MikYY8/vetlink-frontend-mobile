import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";
import api from "../api/api";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {

    console.log("LOGIN CLICK");

    try {

      const res = await api.post("/users/login", {
        email,
        password
      });

      console.log("SERVER RESPONSE:", res.data);

      // si tu backend devuelve token o user
      if (res.data) {
        navigation.navigate("Home");
      }

    } catch (err) {

      console.log("LOGIN ERROR:", err);

      if (err.response) {
        console.log("ERROR DATA:", err.response.data);
        setError(err.response.data.message || "Login incorrecto");
      } else {
        setError("No se pudo conectar al servidor");
      }

    }
  };

  return (
    <View style={{ padding: 20 }}>

      <Text>Email</Text>
      <TextInput
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      {error ? <Text style={{color:"red"}}>{error}</Text> : null}

      <Button title="Login" onPress={login} />

    </View>
  );
}