import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export default function EditUserScreen({ route, navigation }) {
    const { ownerId } = route.params;
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

        const res = await api.get(`/users/get-user/${ownerId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setFormData(res.data.data);

        } catch (error) {
        console.log("Error usuario:", error.response?.data);
        }
    };

    const handleChange = (name, value) => {
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = async () => {
        try {

        const token = await AsyncStorage.getItem("token");

        await api.put(`/users/update-user/${ownerId}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        alert("Usuario actualizado con éxito");

        navigation.goBack();

        } catch (error) {
        console.log("Error update:", error.response?.data);
        }
    };

    return (
        <View style={styles.container}>

        <Text style={styles.title}>Editar usuario</Text>

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
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
        />

        <TextInput
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
        fontSize:22,
        fontWeight:"bold",
        marginBottom:20
    },

    input:{
        backgroundColor:"#fff",
        padding:12,
        borderRadius:8,
        marginBottom:15
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
