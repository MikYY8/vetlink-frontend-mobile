import PetForm from "../components/PetForm";
import api from "../api/api";

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
        <PetForm initialData={pet} submitText="Guardar cambios" onSubmit={updatePet}/>
    );
};
