import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";
import api from "../api/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const login = () => {
        const res = fetch("http://192.168.43.100:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: "test@test.com",
            password: "123456"
        })
        })
        .then(r => r.json())
        .then(d => console.log("OK:", d))
        .catch(e => console.log("FETCH ERROR:", e));
    }

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput onChangeText={setEmail} style={{ borderWidth: 1 }} />

      <Text>Password</Text>
      <TextInput secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1 }} />

      <Button title="Login" onPress={login} />
    </View>
  );
}