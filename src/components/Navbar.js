import { View, TouchableOpacity, StyleSheet, Image, Modal, Text } from "react-native";
import { Menu, LogOut } from "lucide-react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { getUserFromToken } from "../utils/auth";


export default function Navbar({ navigation }) {

    const [menuVisible, setMenuVisible] = useState(false);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const loadUser = async () => {
    //         const data = await getUserFromToken();
    //         setUser(data);
    //     };

    //     loadUser();
    // }, []);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userToken = await getUserFromToken();

            const res = await api.get(`/users/get-user/${userToken.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(res.data.data);

        } catch (error) {
            console.log("Error trayendo usuario:", error);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return(
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Menu size={28} color="#333"/>
            </TouchableOpacity>

            <Image
                source={require("../assets/logo-vetlink.png")}
                style={styles.logo}
            />

            <TouchableOpacity onPress={logout}>
                <LogOut size={26} color="#333"/>
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={menuVisible}
                onRequestClose={() => setMenuVisible(false)}
            >

                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menu}>
                        <Text style={styles.name}>
                            ¡Bienvenido/a, {user?.firstName} {user?.lastName}!
                        </Text>

                        <TouchableOpacity
                            onPress={() => {
                                setMenuVisible(false);
                                navigation.navigate("EditUser");
                            }}
                        >
                            <Text style={styles.option}>Editar mis datos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setMenuVisible(false);
                                navigation.navigate("Contact");
                            }}
                        >
                            <Text style={styles.option}>Contacto</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f7f7f7"
    },
    navbar:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:15,
        backgroundColor:"#fff",
        elevation:4
    },
    logo:{
        width:120,
        height:40,
        resizeMode:"contain"
    },


    overlay:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.3)",
        justifyContent:"flex-start"
    },
    menu:{
        backgroundColor:"#fff",
        padding:20,
        width:250,
        margin: 10,
    },
    option:{
        fontSize:20,
        paddingVertical:10
    },
    name:{
        fontWeight:"bold",
        marginBottom:10,
        fontSize:20,
    }

})
