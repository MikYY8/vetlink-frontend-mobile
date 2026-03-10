import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import api from "../api/api";

export default function AddPetScreen({ navigation }) {
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [sex, setSex] = useState("");
    const [breed, setBreed] = useState("");
    const [color, setColor] = useState("");
    const [isNeutered, setIsNeutered] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [ageInputType, setAgeInputType] = useState("DATE");
    const [birthDate, setBirthDate] = useState("");
    const [ageValue, setAgeValue] = useState("");
    const [ageUnit, setAgeUnit] = useState("MONTHS");


    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
    });

    console.log(result);

    if (!result.canceled) {
    setPhoto(result.assets[0]);
    }
  };

    const addPet = async () => {
        try{
            let finalBirthDate;
            let isEstimated = false;

            if (ageInputType === "DATE"){
                finalBirthDate = birthDate;
            } else {
                const today = new Date();
                const birth = new Date(today);

                if(ageUnit === "MONTHS"){
                    birth.setMonth(today.getMonth() - ageValue);
                }else{
                    birth.setFullYear(today.getFullYear() - ageValue);
                };

                finalBirthDate = birth.toISOString();
                isEstimated = true;
            };

            const data = new FormData();

            data.append("name",name);
            data.append("birthDate",finalBirthDate);
            data.append("isEstimated",isEstimated);
            data.append("sex",sex);
            data.append("species",species);
            data.append("breed",breed);
            data.append("color",color);
            data.append("isNeutered",isNeutered);

            if(photo){
                data.append("photo",{
                    uri:photo.uri,
                    type:"image/jpeg",
                    name: "pet.jpg"
                });
            };

            await api.post("/owner/pets/add", data, {
                headers:{ "Content-Type":"multipart/form-data" }
            });

            navigation.navigate("Home");
        }catch(err){
            console.log(err.response?.data || err);
        };
    };

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Agregar mascota</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Edad</Text>

            <View style={styles.row}>
                <TouchableOpacity
                    style={[
                    styles.option,
                    ageInputType === "DATE" && styles.optionSelected
                    ]}
                    onPress={()=>setAgeInputType("DATE")}
                >
                    <Text>Fecha exacta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                    styles.option,
                    ageInputType === "AGE" && styles.optionSelected
                    ]}
                    onPress={()=>setAgeInputType("AGE")}
                >
                    <Text>Edad aprox.</Text>
                </TouchableOpacity>
            </View>

            {ageInputType === "DATE" && (
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={birthDate}
                    onChangeText={setBirthDate}
                />
            )}

            {ageInputType === "AGE" && (
                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, {width:"48%"}]}
                        placeholder="Edad"
                        keyboardType="numeric"
                        value={ageValue}
                        onChangeText={setAgeValue}
                    />

                    <TouchableOpacity
                        style={[
                        styles.option,
                        {width:"48%"}
                        ]}
                        onPress={()=>setAgeUnit(ageUnit === "MONTHS" ? "YEARS" : "MONTHS")}
                    >
                        <Text>{ageUnit==="MONTHS" ? "Meses" : "Años"}</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text style={styles.label}>Sexo</Text>

            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.option,sex==="M" && styles.optionSelected]}
                    onPress={()=>setSex("M")}
                >
                    <Text>Macho</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.option,sex==="F" && styles.optionSelected]}
                    onPress={()=>setSex("F")}
                >
                    <Text>Hembra</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Especie</Text>

            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.option,species==="DOG" && styles.optionSelected]}
                    onPress={()=>setSpecies("DOG")}
                >
                    <Text>Perro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.option,species==="CAT" && styles.optionSelected]}
                    onPress={()=>setSpecies("CAT")}
                >
                    <Text>Gato</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Raza"
                value={breed}
                onChangeText={setBreed}
            />

            <TextInput
                style={styles.input}
                placeholder="Color"
                value={color}
                onChangeText={setColor}
            />

            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.option,isNeutered && styles.optionSelected]}
                    onPress={()=>setIsNeutered(true)}
                >
                    <Text>Castrado</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.option,!isNeutered && styles.optionSelected]}
                    onPress={()=>setIsNeutered(false)}
                >
                    <Text>No castrado</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {photo ? (
                    <Image source={{uri:photo.uri}} style={styles.image}/>
                ) : (
                    <Text>Seleccionar foto</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={addPet}
            >
                <Text style={styles.buttonText}>Crear mascota</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"#f7f7f7",
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:20
    },
    imagePicker:{
        height:120,
        borderRadius:12,
        backgroundColor:"#fff",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:20
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:12
    },
    input:{
        backgroundColor:"#fff",
        padding:12,
        borderRadius:10,
        marginBottom:15,
    },
    label:{
        fontWeight:"600",
        marginBottom:6
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:15
    },
    option:{
        backgroundColor:"#fff",
        padding:12,
        borderRadius:10,
        width:"48%",
        alignItems:"center"
    },
    optionSelected:{
        backgroundColor:"#e89b5c"
    },
    button:{
        backgroundColor:"#333",
        padding:16,
        borderRadius:10,
        alignItems:"center",
        marginTop:10,
        marginBottom: 100,
    },
    buttonText:{
        color:"#fff",
        fontWeight:"bold"
    },
});