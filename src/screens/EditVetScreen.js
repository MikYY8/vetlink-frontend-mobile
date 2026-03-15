import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { getUserFromToken } from "../utils/auth";
import { Picker } from "@react-native-picker/picker";

export default function EditVetScreen({ navigation }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialty: "GENERAL",
        acceptsConsultations: false,
        password: ""
    });

    useEffect(() => {
        getVet();
    }, []);

    const getVet = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userToken = await getUserFromToken();

            const res = await api.get(`/users/get-vet/${userToken.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const vet = res.data.data;

            setFormData({
                firstName: vet.firstName || "",
                lastName: vet.lastName || "",
                email: vet.email || "",
                phone: vet.phone || "",
                specialty: vet.specialty || "GENERAL",
                acceptsConsultations: vet.acceptsConsultations || false,
                password: ""
            });

        } catch (error) {
            console.log("Error vet:", error);
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
            const userToken = await getUserFromToken();
            const token = await AsyncStorage.getItem("token");
            const dataToSend = { ...formData };

            if (!dataToSend.password) {
                delete dataToSend.password;
            }

            await api.put(`/users/update-vet/${userToken.id}`, dataToSend, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Veterinario actualizado con éxito");
            navigation.goBack();

        } catch (error) {
            console.log("Error actualizando vet:", error);
        }
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
            style={styles.input}
            placeholder="Teléfono"
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            />

            <Text style={styles.label}>Especialidad</Text>

            <Picker
            selectedValue={formData.specialty}
            onValueChange={(itemValue) => handleChange("specialty", itemValue)}
            style={styles.picker}
            >

            <Picker.Item label="General" value="GENERAL" />
            <Picker.Item label="Cirugía" value="SURGERY" />
            <Picker.Item label="Dermatología" value="DERMATOLOGY" />
            <Picker.Item label="Cardiología" value="CARDIOLOGY" />
            <Picker.Item label="Oncología" value="ONCOLOGY" />

            </Picker>

            <View style={styles.switchContainer}>

            <Text style={styles.label}>Aceptar consultas</Text>

            <Switch
            value={formData.acceptsConsultations}
            onValueChange={(value) => handleChange("acceptsConsultations", value)}
            />

            </View>

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
color:"#E76F51",
textAlign:"center"
},

input:{
backgroundColor:"#fff",
padding:12,
borderRadius:8,
marginBottom:15,
fontSize:16
},

label:{
fontSize:16,
fontWeight:"bold",
marginBottom:5
},

picker:{
backgroundColor:"#fff",
marginBottom:15
},

switchContainer:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:20
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