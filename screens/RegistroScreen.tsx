import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';


export default function RegistroScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // ...
          navigation.navigate("Login")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
      
            console.log(errorCode);
            switch (errorCode) {
              case "auth/invalid/credential":
                Alert.alert("Error", "Las Credenciales son Incorrectas");
                break;
              case "auth/missing-password":
                Alert.alert("Error", "Ingrese la contraseña");
                break;
              case "auth/missing-email":
                Alert.alert("Error", "Ingrese el Correo");
                break;
              default:
                Alert.alert(errorCode, errorMessage);
                console.error(error);
                break;
            }
        });
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, marginBottom: 10}}>Register</Text>

            <TextInput
                placeholder='Ingresa tu correo electrónico'
                onChangeText={(texto) => (setCorreo(texto))}
                keyboardType='email-address'
                style={styles.input}
            />
            <TextInput
                placeholder='Ingresa contraseña'
                onChangeText={(texto) => (setContrasenia(texto))}
                style={styles.input}
            />

            <Button title='Registrar' onPress={() => registro()} />
            
            <Text onPress={()=>navigation.navigate("Login")} style={{marginTop:10}}>¿Ya tienes una cuenta? Iniciar Sesión</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    input:{
        height:40,
        width:'80%',
        borderWidth:4,
        borderRadius: 5,
        borderColor: 'whitesmoke',
        marginBottom:20,
        paddingLeft:10
    },

})