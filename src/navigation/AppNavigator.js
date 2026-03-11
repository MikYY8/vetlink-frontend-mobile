import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PetDetailScreen from "../screens/PetDetailScreen";
import AddPetScreen from "../screens/AddPetScreen";
import EditPetScreen from "../screens/EditPetScreen";
import MakeAppointmentScreen from "../screens/MakeAppointmentScreen"
import OwnerAppointmentScreen from "../screens/OwnerAppointmentsScreen"
import PetClinicalRecordScreen from "../screens/PetClinicalRecordScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PetDetail" component={PetDetailScreen} options={{ title: "Mascota" }}/>
        <Stack.Screen name="AddPet" component={AddPetScreen} options={{ title: "Agregar Mascota" }}/>
        <Stack.Screen name="EditPet" component={EditPetScreen} options={{ title: "Editar Mascota" }}/>
        <Stack.Screen name="MakeAppointment" component={MakeAppointmentScreen} options={{ title: "Agendar Turno" }}/>
        <Stack.Screen name="OwnerAppointments" component={OwnerAppointmentScreen} options={{ title: "Turnos" }}/>
        <Stack.Screen name="PetClinicalRecord" component={PetClinicalRecordScreen} options={{ title: "Registro clínico" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}