import { ScrollView, Text, StyleSheet } from "react-native";
import PetForm from "../components/PetForm";
import api from "../api/api";
import { Cross } from 'lucide-react-native';

export default function AddPetScreen({ navigation }) {
    const createPet = async (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key=>{
            if(key!=="photo"){
                formData.append(key,data[key]);
            }
        });

        if(data.photo){
            formData.append("photo",{
                uri:data.photo.uri,
                type:"image/jpeg",
                name:"pet.jpg"
            });
        };

        await api.post("/owner/pets/add", formData, {
            headers:{ "Content-Type":"multipart/form-data" }
        });

        navigation.navigate("Home");
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}><Cross size={20} color={"#E76F51"}/> Agregar mascota</Text>
            <PetForm submitText="Crear mascota" onSubmit={createPet}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"#f7f7f7"
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        color: "#E76F51",
        margin: "auto"
    },
})