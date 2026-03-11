import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function MyAppointmentsScreen({ route, navigation }) {

const { pet } = route.params;
const petId = pet._id;
const [activeTab,setActiveTab] = useState("scheduled");
const [scheduled,setScheduled] = useState([]);
const [history,setHistory] = useState([]);
const [loading,setLoading] = useState(false);


// ================= FETCH =================

const fetchScheduled = async()=>{

setLoading(true);

try{

const res = await api.get(`/appointment/my-appointments?petId=${petId}`)

setScheduled(res.data.data);

}catch(err){

console.log(err);

}

setLoading(false);

};

const fetchHistory = async()=>{

setLoading(true);

try{

const res = await api.get(`/appointment/my-appointments/history?petId=${petId}`)

setHistory(res.data.data);

}catch(err){

console.log(err);

}

setLoading(false);

};


// ================= EFFECT =================

useEffect(()=>{

if(activeTab==="scheduled") fetchScheduled();
if(activeTab==="history") fetchHistory();

},[activeTab]);


// ================= RENDER ITEM =================

const renderAppointment = ({item}) =>(

<View style={styles.card}>

<Text style={styles.pet}>
{item.pet.name} ({item.pet.species})
</Text>

<Text>
Vet: {item.vet.firstName} {item.vet.lastName}
</Text>

<Text>
Fecha: {item.date}
</Text>

<Text>
Hora: {item.time}
</Text>

<Text>
Estado: {item.status}
</Text>

</View>

);


// ================= UI =================

return(

<View style={styles.container}>

{/* TABS */}

<View style={styles.tabs}>

<TouchableOpacity
style={[
styles.tab,
activeTab==="scheduled" && styles.activeTab
]}
onPress={()=>setActiveTab("scheduled")}
>

<Text style={styles.tabText}>
Programados
</Text>

</TouchableOpacity>

<TouchableOpacity
style={[
styles.tab,
activeTab==="history" && styles.activeTab
]}
onPress={()=>setActiveTab("history")}
>

<Text style={styles.tabText}>
Historial
</Text>

</TouchableOpacity>

</View>


{/* LISTA */}

<FlatList
data={activeTab==="scheduled" ? scheduled : history}
keyExtractor={(item)=>item._id}
renderItem={renderAppointment}
/>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f2f2f2"
},

tabs:{
flexDirection:"row",
marginTop:20,
marginHorizontal:20
},

tab:{
flex:1,
padding:12,
backgroundColor:"#444",
alignItems:"center",
borderTopLeftRadius:10,
borderTopRightRadius:10
},

activeTab:{
backgroundColor:"#fff"
},

tabText:{
fontWeight:"bold"
},

card:{
backgroundColor:"#fff",
marginHorizontal:20,
marginVertical:10,
padding:15,
borderRadius:10
},

pet:{
fontWeight:"bold",
fontSize:16
}

});