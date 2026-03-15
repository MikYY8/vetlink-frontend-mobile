import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { getUserFromToken } from "../utils/auth";

export default function EditUserScreen({ navigation }) {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userToken = await getUserFromToken();

            const res = await api.get(`/users/get-user/${userToken.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const user = res.data.data;

            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                password: ""
            });

        } catch (error) {
            console.log("Error usuario:", error);
        }
    };

    const handleChange = (name, value) => {
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = async () => {
        const userToken = await getUserFromToken();
        const token = await AsyncStorage.getItem("token");
        const dataToSend = { ...formData };

        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        await api.put(`/users/update-user/${userToken.id}`, dataToSend, {
            headers: { Authorization: `Bearer ${token}` }
        });

        alert("Usuario actualizado con éxito");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>

        <Text style={styles.title}>Editar mis datos</Text>

        <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={formData.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
        />

        <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={formData.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
        />

        <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
        />

        <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"#f7f7f7"
    },

    title:{
        marginBottom:20,
        fontSize:24,
        fontWeight:"bold",
        color: "#E76F51",
        textAlign: "center"
    },

    input:{
        backgroundColor:"#fff",
        padding:12,
        borderRadius:8,
        marginBottom:15,
        fontSize: 16
    },

    button:{
        backgroundColor:"#F4A261",
        padding:15,
        borderRadius:10,
        alignItems:"center",
        marginTop:10
    },

    buttonBack:{
        backgroundColor:"#333",
        padding:15,
        borderRadius:10,
        alignItems:"center",
        marginTop:10
    },

    buttonText:{
        color:"#fff",
        fontWeight:"bold"
    }

});
