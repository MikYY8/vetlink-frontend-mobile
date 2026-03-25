# VetLink Frontend Mobile

![VetLink Logo](./assets/logo-vetlink.png)

## Descripción
VetLink Frontend Mobile es una aplicación móvil desarrollada en React Native para la gestión de una clínica veterinaria. Permite a los usuarios gestionar turnos, registros clínicos, recetas, y más, proporcionando una experiencia intuitiva y eficiente tanto para veterinarios como para dueños de mascotas.

## Características principales
- **Gestión de mascotas:** Agregar, editar y visualizar información de las mascotas.
- **Turnos:** Crear, gestionar y visualizar turnos.
- **Registros clínicos:** Crear y consultar historiales clínicos de las mascotas.
- **Recetas:** Crear y consultar recetas médicas.
- **Interfaz amigable:** Navegación intuitiva y diseño atractivo.

## Requisitos previos
- Node.js (versión 14 o superior)
- Expo CLI (instalado globalmente)
- Android Studio o Xcode (para emuladores)
- Dispositivo físico o emulador configurado

## Instalación
1. Clonar este repositorio:
   ```bash
   git clone 
   ```
2. Navegar al directorio del proyecto:
   ```bash
   cd vetlink-frontend-mobile
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```

## Uso
1. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
2. Para ejecutar en un dispositivo Android:
   ```bash
   npm run android
   ```
3. Para ejecutar en un dispositivo iOS:
   ```bash
   npm run ios
   ```
4. Para ejecutar en un navegador web:
   ```bash
   npm run web
   ```

## Estructura del proyecto
```
vetlink-frontend-mobile/
├── App.js
├── app.json
├── eas.json
├── index.js
├── package.json
├── assets/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   └── utils/
```

## Configuración de EAS
El proyecto utiliza **Expo Application Services (EAS)** para la construcción y despliegue de la aplicación. La configuración se encuentra en el archivo `eas.json`.

### Comandos de construcción
- **Desarrollo:**
  ```bash
  eas build --profile development --platform android
  ```
- **Producción:**
  ```bash
  eas build --profile production --platform android
  ```

## Dependencias principales
- [React Native](https://reactnative.dev/): Framework para el desarrollo de aplicaciones móviles.
- [Expo](https://expo.dev/): Plataforma para construir aplicaciones React Native.
- [Axios](https://axios-http.com/): Cliente HTTP para realizar solicitudes a la API.
- [React Navigation](https://reactnavigation.org/): Biblioteca para la navegación en aplicaciones React Native.
- [Async Storage](https://github.com/react-native-async-storage/async-storage): Almacenamiento local para datos persistentes.

---

¡Gracias por contribuir a VetLink! 🐾
