import { Button, StyleSheet, Text, View, TextInput, Alert} from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';



export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function login() {
    
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Drawer")

        // ...
      })
      .catch((error) => {
        console.log(error.code);
    
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/invalid/credential":
            Alert.alert("Error", "Las credenciales son incorrectas");
            break;
          case "auth/missing-password":
            Alert.alert("Error", "Falta contraseña");
            break;
          case "auth/invalid-email":
            Alert.alert("Error", "Ingrese un correo valido");
            break;
          default:
            Alert.alert("Error", "Contactenos");
            break;
      }
      });


  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginBottom:10}}>Login</Text>

      <TextInput
        placeholder='Ingresa tu correo electrónico'
        onChangeText={(texto) => (setCorreo(texto))}
        value={correo}
        keyboardType='email-address'
        style={styles.input}
      />
      <TextInput
        placeholder='Ingresa contraseña'
        value={contrasenia}
        onChangeText={(texto) => (setContrasenia(texto))}
        style={styles.input}
      />

      <Button title='Ingresar' onPress={() => login() }/>

      <Text onPress={() => navigation.navigate('Registro')} style={{marginTop:10}}>¿No tienes una cuenta? Regístrate </Text>
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