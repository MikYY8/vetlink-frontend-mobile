import { View, TouchableOpacity, StyleSheet, Image, Modal, Text } from "react-native";
import { Menu, LogOut } from "lucide-react-native"; 
import { useState, useEffect } from "react"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import api from "../api/api"; import { getUserFromToken } from "../utils/auth"; 

export default function Navbar({ navigation }) { 
    const [menuVisible, setMenuVisible] = useState(false); 
    const [user, setUser] = useState(null); 
    const [role, setRole] = useState(null); 
    
    useEffect(() => { 
        loadProfile(); 
    }, []); 
    
    const loadProfile = async () => { 
        try { 
            const token = await AsyncStorage.getItem("token"); 
            const userToken = await getUserFromToken(); 

            if (!userToken) {
                console.log("No user token");
            return;
            }

            console.log("ROLE DEL TOKEN:", userToken.role); 
            setRole(userToken.role); 
            let endpoint = ""; 
            
            if (userToken.role?.toUpperCase() === "OWNER") {
                endpoint = `/users/get-user/${userToken.id}`;
            }

            if (userToken.role?.toUpperCase() === "VET") {
                endpoint = `/users/get-vet/${userToken.id}`;
            }
            
            console.log("ENDPOINT:", endpoint); 
            
            const res = await api.get(endpoint, {
                 headers: { Authorization: `Bearer ${token}` }
            }); 
            
            setUser(res.data.data); 
        }catch (error) {
            console.log("Error trayendo perfil:", error); } 
        }; 
        
    const logout = async () => {
        await AsyncStorage.removeItem("token"); 
        delete api.defaults.headers.common["Authorization"]; 
        navigation.reset({ index: 0, routes: 
            [{ name: "Login" }], 
        }); 
    }; 
    
    return(
        <View style={styles.navbar}> 
            <TouchableOpacity onPress={() => setMenuVisible(true)}> 
                <Menu size={28} color="#333"/> 
            </TouchableOpacity> 
            
            <Image 
                source={require("../assets/logo-vetlink.png")} 
                style={styles.logo} /> 
            
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
                    
                    {role === "OWNER" && (
                        <>
                            <TouchableOpacity onPress={() => { setMenuVisible(false); 
                                navigation.navigate("EditUser"); }} 
                            > 
                                <Text style={styles.option}>Editar mis datos</Text> 
                            </TouchableOpacity> 

                            <TouchableOpacity onPress={() => { setMenuVisible(false); 
                                navigation.navigate("Contact"); }} 
                            > 
                                <Text style={styles.option}>Contacto</Text> 
                                
                            </TouchableOpacity> 
                        </>
                    )}
                        
                    {role === "VET" && ( 
                        <> 
                            <TouchableOpacity onPress={() => { setMenuVisible(false); 
                                navigation.navigate("EditVet"); }} 
                            > 
                                <Text style={styles.option}>Editar mis datos</Text> 
                            </TouchableOpacity> 
                            
                            <TouchableOpacity onPress={() => { setMenuVisible(false); 
                                navigation.navigate("VetAgendaHistory"); }} 
                            > 
                                <Text style={styles.option}>Historial de turnos</Text> 
                            </TouchableOpacity> 
                        </> 
                    )} 
                    
                </View> 
            </TouchableOpacity> 
        </Modal> 
    </View> ) 
} 
    
const styles = StyleSheet.create({
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
        margin:10, 
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
});