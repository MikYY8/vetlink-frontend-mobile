import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const getUserFromToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    
    if (!token) return null;

    const decoded = jwtDecode(token);

    return {
      id: decoded.id,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      role: decoded.role
    };

  } catch (error) {
    console.log("Token decode error:", error);
    return null;
  }
};
