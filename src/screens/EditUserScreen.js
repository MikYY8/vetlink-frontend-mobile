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

    const [error, setError] = useState({});

    const validate = () => {
        let newErrors = {}; // guardamos errores, luego los transferimos a setError
        if(!formData.firstName) {newErrors.firstName = "El campo no puede quedar vacío"};
        if(!formData.lastName) {newErrors.lastName = "El campo no puede quedar vacío"};
        if(!formData.email) {newErrors.email = "El campo no puede quedar vacío"};

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const userToken = await getUserFromToken();
            const res = await api.get(`/users/get-user/${userToken.id}`);
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
        if (!validate()) return;

        const userToken = await getUserFromToken();
        const dataToSend = { ...formData };

        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        // alert("Se han guardado sus datos");
        await api.put(`/users/update-user/${userToken.id}`, dataToSend);

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

        {error.firstName && <Text style={{color: "red"}} >{error.firstName}</Text>}

        <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={formData.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
        />

        {error.lastName && <Text style={{color: "red"}} >{error.lastName}</Text>}

        <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
        />

        {error.email && <Text style={{color: "red"}} >{error.email}</Text>}

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
