import { ScrollView } from "react-native";
import AppointmentForm from "../components/AppointmentForm";
import api from "../api/api";

export default function MakeAppointmentScreen({ route, navigation }) {
    const { pet } = route.params;

    const createAppointment = async(data)=>{
        try{
            api.post("/appointment/make-appointment", data);
            navigation.navigate("Home");
        }catch(err){
            console.log(err.response?.data || err);
        };
    };

    return(
        <ScrollView>
            <AppointmentForm pet={pet} onSubmit={createAppointment}/>
        </ScrollView>
    );
};
