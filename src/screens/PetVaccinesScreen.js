import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import formatDate from "../utils/date";
import api from "../api/api";
import { Syringe } from "lucide-react-native";

export default function PetVaccinesScreen({ route }) {
    const { pet } = route.params;
    const petId = pet._id;
    const [activeTab, setActiveTab] = useState("schedule");
    const [schedule, setSchedule] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // ================= FETCH =================

    const fetchSchedule = async()=>{
        setLoading(true);
        try{
            const res = await api.get(`/vaccines/schedule/${petId}`)
            setSchedule(res.data.data);
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    };

    const fetchHistory = async()=>{
        setLoading(true);
        try{
            const res = await api.get(`/vaccines/history/${petId}`)
            setHistory(res.data.data);
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    };

    // ================= EFFECT =================

    useEffect(()=>{
        if(activeTab==="schedule") fetchSchedule();
        if(activeTab==="history") fetchHistory();
    },[activeTab]);

    // ================= RENDER ITEMS =================

    const renderSchedule = ({item}) =>(
        <View style={styles.card}>
            <Text style={styles.title}>
                <Syringe size={20} color={"#e47b24"}/> {item.vaccineName}
            </Text>

            <Text style={styles.label}>Última aplicación:
                <Text style={styles.info}> {formatDate(item.lastAppliedDate)}</Text>
            </Text>

            <Text style={styles.label}>Próxima dosis:
                <Text style={styles.info}> {formatDate(item.nextDueDate)}</Text>
            </Text>
        </View>
    );

    const renderHistory = ({item}) =>(
        <View style={styles.card}>
            <Text style={styles.title}>
                <Syringe size={20} color={"#e47b24"}/> {item.vaccineName}
            </Text>

            <Text style={styles.label}>Fecha aplicada:
                <Text style={styles.info}> {formatDate(item.appliedDate)}</Text>
            </Text>

            <Text style={styles.label}>Veterinario:
                <Text style={styles.info}> {item.vet.firstName} {item.vet.lastName}</Text>
            </Text>

            {item.notes && (
                <>
                    <Text style={styles.label}>Notas:
                        <Text style={styles.info}>{item.notes}</Text>
                    </Text>
                </>
            )}
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
                        activeTab==="schedule" && styles.activeTab
                    ]}
                    onPress={()=>setActiveTab("schedule")}
                >
                    <Text style={styles.tabText}>
                        Próximas
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
                data={activeTab==="schedule" ? schedule : history}
                keyExtractor={(item)=>item._id}
                renderItem={activeTab==="schedule" ? renderSchedule : renderHistory}
                ListEmptyComponent={
                    !loading && (
                        <Text style={styles.emptyText}>
                            {activeTab === "schedule"
                            ? "No hay vacunas programadas para esta mascota"
                            : "No hay vacunas registradas para esta mascota"}
                        </Text>
                    )
                }
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

    title:{
        fontSize:22,
        color:"#e47b24",
        fontWeight:"bold"
    },

    label:{
        fontWeight:"bold",
        fontSize:18,
        margin: 5
    },

    info:{
        fontSize:18,
        fontWeight: "normal"
    },

    emptyText:{
        textAlign:"center",
        marginTop:40,
        color:"#666"
    }
});