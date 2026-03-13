import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import formatDate from "../utils/date";
import api from "../api/api";
import { appointmentTypeMap, appointmentIconMap, specialtyMap, statusMap } from "../utils/translation"


export default function MyAppointmentsScreen({ route, navigation }) {
    const { pet } = route.params;
    const petId = pet._id;
    const [activeTab, setActiveTab] = useState("scheduled");
    const [scheduled, setScheduled] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const renderAppointment = ({item}) => {

        const Icon = appointmentIconMap[item.type] || Stethoscope;

        return (
            <View style={styles.card}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    {Icon && <Icon size={20} color="#E76F51" />}
                    <Text style={styles.type}> {appointmentTypeMap[item.type]}</Text>
                </View>

                <Text style={styles.label}>Veterinario:
                    <Text style={styles.info}> {item.vet.firstName} {item.vet.lastName} • {specialtyMap[item.vet.specialty]}</Text>
                </Text>

                <Text style={styles.label}>Fecha:
                    <Text style={styles.info}> {formatDate(item.date)}</Text>
                </Text>

                <Text style={styles.label}>Hora:
                    <Text style={styles.info}> {item.time}</Text>
                </Text>

                <Text style={styles.label}>Estado:
                    <Text style={styles.info}> {statusMap[item.status]}</Text>
                </Text>

                <Text style={styles.label}>Detalles:
                    <Text style={styles.info}> {item.details || "-"} </Text>
                </Text>
            </View>
        );
    };

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
                ListEmptyComponent={
                    !loading && (
                        <Text style={styles.emptyText}>
                            {activeTab === "scheduled"
                            ? "No tienes turnos programados para esta mascota"
                            : "No hay historial de turnos para esta mascota"}
                        </Text>
                    )
                }
            />
        </View>
    );
};

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
        backgroundColor:"#666666",
        alignItems:"center",
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },

    activeTab:{
        backgroundColor:"#F4A261"
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
    },
    emptyText:{
        textAlign:"center",
        marginTop:40,
        color:"#666"
    },
    label:{
        fontWeight: "bold",
        fontSize: 18,
        margin: 5
    },
    info:{
        fontSize: 18,
        fontWeight: "normal"
    },
    type:{
        fontSize: 20,
        color: "#e47b24",
        fontWeight: "bold",
    }
});
