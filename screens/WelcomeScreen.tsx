import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAuth, signOut } from 'firebase/auth';

export default function WelcomeScreen({ navigation }: any) {

  function cerrarSesion(){
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Cierre de sesion exitoso');
      navigation.navigate("Login")
      
      }).catch((error) => {
      // An error happened.
      
      });
  }


  return (
    <View style={styles.container}>
      <Text style={{fontSize:30, marginBottom:20}}>Welcome</Text>
      <Button title='Cerrar Sesion' color={'blue'} onPress={()=>cerrarSesion()}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center'
  },
})