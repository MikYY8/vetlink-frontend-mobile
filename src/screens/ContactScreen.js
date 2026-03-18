import { View, StyleSheet, Text } from "react-native";


export default function ContactScreen() {

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Contacto</Text>
            <Text style={styles.title2}>Email: 
                <Text style={styles.info}> veterinaria@vetlink.com</Text></Text>
                
            <Text style={styles.title2}>Whatsapp para consultas: 
                <Text style={styles.info}> 11-2345-6789</Text></Text> 
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        paddingBottom: 50,
        borderRadius: 30,
        marginTop: 10
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin:16
    },
    title2:{
        fontSize: 18,
        marginLeft: 16,
        marginBottom: 5,
        fontWeight: "bold"
    },
    info:{
        fontSize: 18,
        marginLeft: 16,
        marginBottom: 5,
        fontWeight: "normal"
    }

})
