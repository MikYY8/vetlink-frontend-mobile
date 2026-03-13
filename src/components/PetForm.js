import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function PetForm({ initialData = {}, onSubmit, submitText }) {

    const [name, setName] = useState(initialData.name || "");
    const [species, setSpecies] = useState(initialData.species || "");
    const [sex, setSex] = useState(initialData.sex || "");
    const [breed, setBreed] = useState(initialData.breed || "");
    const [color, setColor] = useState(initialData.color || "");
    const [isNeutered, setIsNeutered] = useState(initialData.isNeutered || false);

    const [photo, setPhoto] = useState(null);
    const [existingPhoto, setExistingPhoto] = useState(initialData.photoUrl || null);

    const [ageInputType, setAgeInputType] = useState("DATE");
    const [birthDate, setBirthDate] = useState(
    initialData.birthDate ? initialData.birthDate.split("T")[0] : ""
    );

    const [ageValue, setAgeValue] = useState("");
    const [ageUnit, setAgeUnit] = useState("MONTHS");

    const pickImage = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Se necesita permiso para acceder a la galería");
            return;
        };

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.7
        });

        if (!result.canceled) setPhoto(result.assets[0]);
    };

    const handleSubmit = () => {
        let finalBirthDate;
        let isEstimated = false;

        if(ageInputType === "DATE") {
            finalBirthDate = birthDate;
        }else{
            const today = new Date();
            const birth = new Date(today);

            if(ageUnit === "MONTHS"){
                birth.setMonth(today.getMonth() - ageValue);
            }else{
                birth.setFullYear(today.getFullYear() - ageValue);
            };

            finalBirthDate = birth.toISOString();
            isEstimated = true;
        }

        onSubmit({ name, species, sex, breed, color, isNeutered, 
            photo, birthDate: finalBirthDate, isEstimated
        });
    };

    return(
    <ScrollView style={styles.container}>

        <Text style={styles.label}>Nombre</Text>

        <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
        />

        <Text style={styles.label}>Edad</Text>

        <View style={styles.row}>
            <TouchableOpacity
                style={[styles.option, ageInputType==="DATE" && styles.optionSelected]}
                onPress={()=>setAgeInputType("DATE")}
            >
                <Text>Fecha exacta</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, ageInputType==="AGE" && styles.optionSelected]}
                onPress={()=>setAgeInputType("AGE")}
            >
                <Text>Edad aprox.</Text>
            </TouchableOpacity>
        </View>

        {ageInputType==="DATE" && (
            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={birthDate}
                onChangeText={setBirthDate}
            />
        )}

        {ageInputType==="AGE" && (
        <View style={styles.row}>
            <TextInput
                style={[styles.input,{width:"48%"}]}
                placeholder="Edad"
                keyboardType="numeric"
                value={ageValue}
                onChangeText={setAgeValue}
            />

            <TouchableOpacity
                style={[styles.option,{width:"48%"}]}
                onPress={()=>setAgeUnit(ageUnit==="MONTHS" ? "YEARS" : "MONTHS")}
            >
                <Text>{ageUnit==="MONTHS" ? "Meses":"Años"}</Text>
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

        <Text style={styles.label}>Raza</Text>

        <TextInput
            style={styles.input}
            placeholder="Raza"
            value={breed}
            onChangeText={setBreed}
        />

        <Text style={styles.label}>Color</Text>

        <TextInput
            style={styles.input}
            placeholder="Color"
            value={color}
            onChangeText={setColor}
        />

        <Text style={styles.label}>Estado de castración</Text>

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

        <Text style={styles.label}>Agregar una foto</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>

        {photo ? (
            <Image source={{uri:photo.uri}} style={styles.image}/>
        ) : existingPhoto ? (
            <Image source={{uri:existingPhoto}} style={styles.image}/>
        ) : (
            <Text>Seleccionar foto</Text>
        )}

        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
        >
            <Text style={styles.buttonText}>{submitText}</Text>
        </TouchableOpacity>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"#f7f7f7"
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
        marginBottom:15
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
        marginBottom:100
    },
    buttonText:{
        color:"#fff",
        fontWeight:"bold"
    }
});