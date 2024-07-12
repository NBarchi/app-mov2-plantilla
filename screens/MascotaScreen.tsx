import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
///// FIREBASE
import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from '../config/Config'


export default function MascotaScreen() {
    const [id, setid] = useState("")
    const [nombre, setnombre] = useState("")
    const [especie, setespecie] = useState("")
    const [edad, setedad] = useState("")


    /////GUARDAR
    function guardarMascota() {
        set(ref(db, 'mascotas/' + id), {
          name: nombre,
          especie: especie,
          edad: edad
        });
      }

    /////EDITAR
    function editarMascota() {
        update(ref(db, 'mascotas/' + id), {
            name: nombre,
            especie: especie,
            edad: edad
          });
    }

    function leerMascota() {
        const starCountRef = ref(db, 'mascotas/' + id);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            if(data==null){
                Alert.alert("ERROR", "Mascota no encontrada")
                setid("")
                setnombre("")
                setespecie("")
                setedad("")
            }else{
                setnombre(data.name)
                setespecie(data.especie)
                setedad(data.edad)
            } 
        });
    }

    /////ELIMINAR
    function eliminarMascota() {
        remove(ref(db, 'mascotas/' + id));
    }


    return (
        <ScrollView>
        <View style={styles.container}>
            {/*------------------ GUARDAR -------------------------- */}
            <View style={styles.guardar}>
                <Text style={styles.tiulos}>GUARDAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.txt}
                    onChangeText={(texto)=> setid(texto)}
                />
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.txt}
                    onChangeText={(texto)=> setnombre(texto)}

                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.txt}
                    onChangeText={(texto)=> setespecie(texto)}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.txt}
                    onChangeText={(texto)=> setedad(texto)}
                />
                <Button title='Guardar' onPress={()=>guardarMascota()}/>
            </View>

            

            {/*------------------ EDITAR-------------------------- */}
            <View style={styles.editar}>
                <Text style={styles.tiulos}>EDITAR</Text>
                <View style={styles.fila}>
                    <TextInput
                        placeholder='Ingresar id'
                        style={{ width: '25%', backgroundColor: '#6666', borderRadius: 10 }}
                        onChangeText={(texto)=> setid(texto)}
                        value={id}
                    />
                    <Button title='buscar' color={'#299979'} onPress={()=>leerMascota()}/>
                </View>
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.txt}
                    onChangeText={(texto)=> setnombre(texto)}
                    value={nombre}
                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.txt}
                    onChangeText={(texto)=> setespecie(texto)}
                    value={especie}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.txt}
                    onChangeText={(texto)=> setedad(texto)}
                    value={edad}
                />
                <Button title='Editar' color={'green'} onPress={()=>editarMascota()}/>
            </View>

           

            {/*------------------ ELIMINAR------------------------- */}
            <View style={styles.eliminar}>
                <Text style={styles.tiulos}>ELIMINAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.txt}
                    onChangeText={(texto)=> setid(texto)}

                />

                <Button title='ELIMINAR' color={'red'} onPress={()=>eliminarMascota()}/>
            </View>

            

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        gap:30,
        marginTop:20
    }, 

    tiulos: {
        fontSize: 25
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    guardar: {
        width:'90%',
        padding:10,
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth:1,
        alignItems:'center',
        gap:10
    },
    editar: {
        width:'90%',
        padding:10,
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth:1,
        alignItems:'center',
        gap:10
        
    },
    eliminar: {
        width:'90%',
        padding:10,
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth:1,
        alignItems:'center',
        marginBottom:40,
        gap:10
    },
    txt: {
        width: '70%',
        backgroundColor: '#6666',
        height: 35,
        borderRadius: 10,
        margin:1
    }
    
})