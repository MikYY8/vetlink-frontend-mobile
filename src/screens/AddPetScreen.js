import PetForm from "../components/PetForm";
import api from "../api/api";

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
        <PetForm submitText="Crear mascota" onSubmit={createPet}/>
    );
};
