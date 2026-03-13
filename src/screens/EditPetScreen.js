import { ScrollView, Text, StyleSheet } from "react-native";
import PetForm from "../components/PetForm";
import api from "../api/api";
import { Pencil } from 'lucide-react-native';

export default function EditPetScreen({ route, navigation }) {
    const { pet } = route.params;

    const updatePet = async (data) => {

        const formData = new FormData();

        Object.keys(data).forEach(key=>{
            if(key!=="photo"){
                formData.append(key,data[key]);
            };
        });

        if(data.photo){
            formData.append("photo",{
                uri:data.photo.uri,
                type:"image/jpeg",
                name:"pet.jpg"
            });
        };

        await api.put(`/owner/pets/${pet._id}`,formData,{
            headers:{ "Content-Type":"multipart/form-data" }
        });

        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}><Pencil size={20} color={"#E76F51"}/> Editar mascota</Text>
            <PetForm initialData={pet} submitText="Guardar cambios" onSubmit={updatePet}/>
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