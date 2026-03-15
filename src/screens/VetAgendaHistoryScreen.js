import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { statusMap } from "../utils/translation";

export default function VetAgendaHistoryScreen({ navigation }) {
    const [agenda, setAgenda] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    useEffect(() => {
        fetchAgenda();
    }, []);

    const fetchAgenda = async (filters = {}) => {
        try {
            setLoading(true);
            const { status, fromDate, toDate } = filters;
            let query = "";

            if (status) query += `status=${status}`;

            if (fromDate) {
                query += `${query ? "&" : ""}from=${fromDate.toISOString().split("T")[0]}`;
            }

            if (toDate) {
                query += `${query ? "&" : ""}to=${toDate.toISOString().split("T")[0]}`;
            }

            const res = await api.get(`/appointment/vet-agenda?${query}`);
            setAgenda(res.data.data);
        } catch (error) {
            console.log("Error agenda:", error);
        }
        setLoading(false);
    };

    const clearFilters = () => {
        setStatus("");
        setFromDate(null);
        setToDate(null);
        fetchAgenda({}); 
    };

    const renderAppointment = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()} — {item.time}
            </Text>

            <Text style={styles.pet}>
                {item.pet?.name || "Mascota eliminada"}
            </Text>

            <Text style={styles.owner}>
                Dueño/a: {item.owner?.firstName} {item.owner?.lastName || "Usuario eliminado"}
            </Text>

            <Text style={styles.status}>
                Estado: {statusMap[item.status]}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation} />

            <Text style={styles.title}>Historial de turnos</Text>

            {/* FILTROS */}

            <View style={styles.filters}>
                <Text>Estado</Text>

                <Picker
                    selectedValue={status}
                    onValueChange={(value) => setStatus(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Todos" value="" />
                    <Picker.Item label="Programado" value="SCHEDULED" />
                    <Picker.Item label="Completado" value="COMPLETED" />
                    <Picker.Item label="Cancelado" value="CANCELLED" />
                </Picker>

                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowFromPicker(true)}
                >
                    <Text>
                        Desde: {fromDate ? fromDate.toLocaleDateString() : "Seleccionar"}
                    </Text>
                </TouchableOpacity>

                {showFromPicker && (
                    <DateTimePicker
                        value={fromDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowFromPicker(false);
                            if (date) setFromDate(date);
                        }}
                    />
                )}

                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowToPicker(true)}
                >
                    <Text>
                        Hasta: {toDate ? toDate.toLocaleDateString() : "Seleccionar"}
                    </Text>
                </TouchableOpacity>

                {showToPicker && (
                    <DateTimePicker
                        value={toDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowToPicker(false);
                            if (date) setToDate(date);
                        }}
                    />
                )}

                <View style={{flexDirection:"row", gap:10}}>
                    <TouchableOpacity style={styles.filterButton} onPress={() => fetchAgenda({ status, fromDate, toDate })}>
                        <Text style={{color:"#fff"}}>Aplicar filtros</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                        <Text style={{color:"#fff"}}>Limpiar filtros</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* LISTA */}

            <FlatList
                data={agenda}
                keyExtractor={(item) => item._id}
                renderItem={renderAppointment}
                contentContainerStyle={{ paddingBottom: 40 }}
                ListEmptyComponent={
                    !loading && (
                        <Text style={styles.emptyText}>
                            No hay turnos con esos filtros
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
backgroundColor:"#f7f7f7"
},

title:{
fontSize:24,
fontWeight:"bold",
textAlign:"center",
marginVertical:10,
color:"#F4A261"
},

filters:{
backgroundColor:"#fff",
margin:15,
padding:15,
borderRadius:10
},

picker:{
backgroundColor:"#eee",
marginBottom:10
},

dateButton:{
backgroundColor:"#eee",
padding:10,
marginBottom:10,
borderRadius:5
},

filterButton:{
backgroundColor:"#F4A261",
padding:12,
alignItems:"center",
borderRadius:8
},

card:{
backgroundColor:"#fff",
marginHorizontal:20,
marginVertical:8,
padding:15,
borderRadius:10
},

date:{
fontWeight:"bold"
},

pet:{
fontSize:18,
fontWeight:"bold"
},

owner:{
color:"#444"
},

status:{
marginTop:5
},

emptyText:{
textAlign:"center",
marginTop:40,
color:"#666"
},

clearButton:{
backgroundColor:"#777",
padding:12,
alignItems:"center",
borderRadius:8
}

});