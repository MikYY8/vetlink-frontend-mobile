import { StyleSheet, View, TextInput, Text, ImageBackground,
        Dimensions, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PawPrint } from 'lucide-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("role");
      // console.log("TOKEN: " + token)
      // console.log("ROLE: " + role)

      if (token) {
        // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (role === "OWNER") navigation.replace("Home");
        if (role === "VET") navigation.replace("VetHome");
      }
    };

    checkLogin();
  }, []);

  const login = async () => {
    // console.log("BANDERA LOGIN QUE LE PASA A ESTO")
    try {
      const res = await api.post("/users/login", {
        email,
        password
      });

      if (!email || !password) {
        setError("Completá todos los campos");
      return;
      }

      // console.log("SERVER RESPONSE:", res.data);
      const token = res.data.data.accesstoken;
      const role = res.data.data.role;
      // console.log(role)
      // guardar token en el telefono
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("role", role);

      // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // navigation.replace("Home")

      if (role === "OWNER") navigation.replace("Home");
      if (role === "VET") navigation.replace("VetHome");  

    } catch (err) {
      setError("LOGIN ERROR:", err);

      if (err.response) {
        setError("ERROR DATA:", err.response.data);
        setError(err.response.data.message || "Email o contraseña incorrectos");
      } else {
        setError("No se pudo conectar al servidor");
      };
    };
  };

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

return (
  <ImageBackground
    source={require("../assets/background.png")}
    resizeMode="cover"
    style={styles.img}>
    
    <View style={styles.card}>

      <Text style={styles.title}> <PawPrint color={"#333333"} /> Iniciar sesión</Text>

      <TextInput
        keyboardType="email-address"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#666"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          autoCapitalize="none"
          style={styles.passwordInput}
          placeholder="Contraseña"
          placeholderTextColor="#666"
        />

        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="#777"
          style={styles.eyeIcon}
          onPress={toggleShowPassword}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

    </View>
  </ImageBackground>
  );
};

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#F4A261",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#333333",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#E76F51",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#F4A261",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    paddingRight: 45, // espacio para el icono
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 10,
  },

});
