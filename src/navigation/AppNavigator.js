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
import PrescriptionsScreen from "../screens/PrescriptionsScreen"
import PetVaccinesScreen from "../screens/PetVaccinesScreen";
import EditUserScreen from "../screens/EditUserScreen"
import ContactScreen from "../screens/ContactScreen"

import VetHomeScreen from "../screens/VetHomeScreen"
import VetAppointmentDetailsScreen from "../screens/VetAppointmentDetailsScreen"
import VetPetClinicalHistoryScreen from "../screens/VetPetClinicalHistoryScreen"
import VetPetPrescriptionScreen from "../screens/VetPetPrescriptionScreen"
import CreateClinicalRecordScreen from "../screens/CreateClinicalRecordScreen";
import CreatePrescriptionScreen from "../screens/CreatePrescriptionScreen"

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* RUTAS DEL OWNER */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PetDetail" component={PetDetailScreen} options={{ title: "Mascota" }}/>
        <Stack.Screen name="AddPet" component={AddPetScreen} options={{ title: "Agregar Mascota" }}/>
        <Stack.Screen name="EditPet" component={EditPetScreen} options={{ title: "Editar Mascota" }}/>
        <Stack.Screen name="MakeAppointment" component={MakeAppointmentScreen} options={{ title: "Agendar Turno" }}/>
        <Stack.Screen name="OwnerAppointments" component={OwnerAppointmentScreen} options={{ title: "Turnos" }}/>
        <Stack.Screen name="PetClinicalRecord" component={PetClinicalRecordScreen} options={{ title: "Registro clínico" }}/>
        <Stack.Screen name="PetPrescriptions" component={PrescriptionsScreen} options={{ title: "Recetas" }}/>
        <Stack.Screen name="PetVaccines" component={PetVaccinesScreen} options={{ title: "Vacunas" }}/>
        <Stack.Screen name="EditUser" component={EditUserScreen} options={{ title: "Editar mis datos" }}/>
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: "Contacto" }}/>
        
        {/* RUTAS DEL VETERINARIO */}
        <Stack.Screen name="VetHome" component={VetHomeScreen} options={{ title: "Agenda" }}/>
        <Stack.Screen name="VetAppointmentDetails" component={VetAppointmentDetailsScreen} options={{ title: "Detalles de turno" }}/>
        <Stack.Screen name="VetPetClinicalHistory" component={VetPetClinicalHistoryScreen} options={{ title: "Registro clínico" }}/>
        <Stack.Screen name="VetPetPrescription" component={VetPetPrescriptionScreen} options={{ title: "Recetas" }}/>
        <Stack.Screen name="CreateClinicalRecord" component={CreateClinicalRecordScreen} options={{ title: "Agregar registro clínico" }}/>
        <Stack.Screen name="CreatePrescription" component={CreatePrescriptionScreen} options={{ title: "Agregar receta" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}