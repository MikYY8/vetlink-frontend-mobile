import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import api from "../api/api";
import { appointmentTypeMap } from "../utils/translation";
import { ClipboardClock } from 'lucide-react-native';

export default function AppointmentForm({ pet, onSubmit }) {
    const [type, setType] = useState("");
    const [vet, setVet] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [details, setDetails] = useState("");
    const [vaccineName, setVaccineName] = useState("");

    const [vets, setVets] = useState([]);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [vaccines, setVaccines] = useState([]);

    const [error, setError] = useState({});
    const [success, setSuccess] = useState("");

    const validate = () => {
        let newErrors = {}; // guardamos errores, luego los transferimos a setError
        if(!type) {newErrors.type = "Seleccione un tipo de turno"};
        if(!vet) {newErrors.vet = "Seleccione un veterinario disponible para el turno"};
        if(!date) {newErrors.date = "Seleccione un día disponible"};
        if(!time) {newErrors.time = "Ingrese un horario disponible"};

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ================= VETS =================

    useEffect(()=>{
        if(!type) return;

        const fetchVets = async()=>{
            const res = await api.get(`/appointment/vets-by-type?type=${type}`);
            setVets(res.data.data);
        };
        fetchVets();
    },[type]);

    // ================= DATES =================

    useEffect(()=>{
        if(!vet) return;

        const fetchDates = async()=>{
            const res = await api.get(`/appointment/availability/dates/${vet}`);
            setDates(res.data.data);
        };
        fetchDates();
    },[vet]);

    // ================= TIMES =================

    useEffect(()=>{
        if(!vet || !date) return;

        const fetchTimes = async()=>{
            const res = await api.get(`/appointment/availability/times/${vet}/${date}`);
            setTimes(res.data);
        };
        fetchTimes();
    },[date]);

    // ================= VACCINES =================

    useEffect(()=>{
        if(type !== "VACCINATION") return;

        const fetchVaccines = async()=>{
            const res = await api.get(`/appointment/vaccines?species=${pet.species}`);
            setVaccines(res.data.data);
        };
        fetchVaccines();
    },[type]);

    // ================= SUBMIT =================

    const handleSubmit = () => {
        if (!validate()) return;

        onSubmit({ petId:pet._id, vetId:vet, date, time, type, vaccineName, details });
    };

    useEffect(() => {
        setVet(null);
        setDate(null);
        setTime(null);
        setVaccineName("");
        setDetails("");
        setDates([]);
        setTimes([]);
    }, [type]);

    useEffect(() => {
        setDate(null);
        setTime(null);
        setTimes([]);
    }, [vet]);

    useEffect(() => {
        setTime(null);
    }, [date]);

    // ================= UI =================

    return(
        <View style={styles.container}>
            <Text style={styles.title}><ClipboardClock size={24} color={"#E76F51"} /> Agendar turno</Text>

            <Text style={styles.label}>Tipo de turno</Text>

            <View style={styles.row}>
                {["CONSULTATION","CONTROL","VACCINATION","SURGERY"].map(t=>(
                    <TouchableOpacity
                        key={t}
                        style={[styles.option,type===t && styles.selected]}
                        onPress={()=>setType(t)}    
                    >
                        <Text>{appointmentTypeMap[t]}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {error.type && <Text style={{color: "red"}} >{error.type}</Text>}

            {type==="VACCINATION" && (
                <>
                    <Text style={styles.label}>Vacuna</Text>

                    {vaccines.map(v=>(
                        <TouchableOpacity
                            key={v.name}
                            style={[styles.option,vaccineName===v.name && styles.selected]}
                            onPress={()=>setVaccineName(v.name)}
                        >
                            <Text>{v.name}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            )}

            {type && (
                <>
                    <Text style={styles.label}>Veterinario</Text>

                    {vets.length === 0 && (
                        <Text style={styles.error}>
                            No hay veterinarios disponibles para este tipo de turno
                        </Text>
                    )}

                    {vets.map(v=>(
                        <TouchableOpacity
                            key={v._id}
                            style={[styles.option,vet===v._id && styles.selected]}
                            onPress={()=>setVet(v._id)}
                        >
                            <Text>{v.firstName} {v.lastName}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            )}

            {error.vet && <Text style={{color: "red"}} >{error.vet}</Text>}


            {vet && (
                <>
                    <Text style={styles.label}>Fecha</Text>

                    {dates.length === 0 && (
                        <Text style={styles.error}>
                            No se encontraron fechas disponibles para el veterinario seleccionado
                        </Text>
                    )}

                    {dates.map(d=>(
                        <TouchableOpacity
                            key={d}
                            style={[styles.option,date===d && styles.selected]}
                            onPress={()=>setDate(d)}
                        >
                            <Text>{d}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            )}

            {error.date && <Text style={{color: "red"}} >{error.date}</Text>}

            {date && (
                <>
                    <Text style={styles.label}>Horario</Text>

                    {times.length === 0 && (
                        <Text style={styles.error}>
                            No hay horarios disponibles para esta fecha
                        </Text>
                    )}

                    {times.map(t=>(
                        <TouchableOpacity
                            key={t.time}
                            style={[styles.option,time===t.time && styles.selected]}
                            onPress={()=>setTime(t.time)}
                        >
                            <Text>{t.time}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            )}

            {error.time && <Text style={{color: "red"}} >{error.time}</Text>}

            <Text style={styles.label}>Detalles</Text>

            <TextInput
                style={styles.input}
                value={details}
                onChangeText={setDetails}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Reservar turno</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        color: "#E76F51",
        margin: "auto"
    },
    label:{
        marginTop:15,
        marginBottom:5,
        fontWeight:"600"
    },
    row:{
        flexDirection:"row",
        flexWrap:"wrap",
        gap:10,
    },
    option:{
        backgroundColor:"#fff",
        padding:10,
        borderRadius:8,
        marginBottom:10
    },
    selected:{
        backgroundColor:"#e89b5c"
    },
    input:{
        backgroundColor:"#fff",
        padding:10,
        borderRadius:8
    },
    // price:{
    //     marginTop:15,
    //     fontWeight:"bold"
    // },
    button:{
        backgroundColor:"#333",
        padding:15,
        borderRadius:10,
        alignItems:"center",
        marginTop:20,
        marginBottom:100,
    },
    buttonText:{
        color:"#fff",
        fontWeight:"bold"
    },
    error:{
        color:"red",
        marginBottom:10
    },
});
