import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";
import api from "../api/api";

export default function LoginScreen({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  fetch("http://192.168.43.100:3000/users/login", {

    const login = () => {
        fetch("http://192.168.43.100:3000/users/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
        })
        .then(r => r.json())
        .then(d => console.log("OK:", d))
        .catch(e => console.log("FETCH ERROR:", e));
    }

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput inputMode="email" autoCapitalize="none" onChangeText={setEmail} style={{ borderWidth: 1 }} />

      <Text>Password</Text>
      <TextInput autoCapitalize="none" secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1 }} />

      <Button title="Login" onPress={login} />
    </View>
  );
}

// { "code": 400, 
//   "data": 
//   [
//     {"location": "body",
//     "msg": "Email o contraseña incorrectos",
//     "path": "email", 
//     "type": "field",
//     "value": "email"}
//   ],  
//   "message": "Error: parámetros incorrectos", 
//   "success": false
// }