import AppNavigator from "./src/navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import api from "./src/api/api";

export default function App() {

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };

    loadToken();
  }, []);

  return <AppNavigator />;
}