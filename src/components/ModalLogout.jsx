import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ModalPoup from './ModalPoup'
import { useAuth } from '../context/authContext'

const ModalLogout = () => {

    const [visible, setVisible] = useState(false)

    const navigation = useNavigation();

    const { logout } = useAuth();


    const handlePreviewLogout = () => {
        setVisible(true)
    }

    const handleLogout = async () => {
        const resLogout = await logout();
        if (resLogout) {
            navigation.navigate('Login');
        }
    }

    return (
        <>
            <TouchableOpacity onPress={handlePreviewLogout}>
                <MaterialCommunityIcons name="logout" size={35} color="red" />
            </TouchableOpacity>

            <ModalPoup visible={visible}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '100%', height: 40, alignItems: 'flex-end', justifyContent: 'center', }}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{ width: 40, textAlign: "center", fontSize: 30 }}>x</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 30, flexDirection: "column" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center' }}>
                            ¿Confirmas que deseas cerrar sesión?
                        </Text>

                        <View style={{ flexDirection: "row", gap: 10, marginTop: 30 }}>

                            <TouchableOpacity style={{ ...styles.logoutBtn, backgroundColor: "white" }} onPress={() => setVisible(false)} >
                                <Text style={{ ...styles.modalText, color: "#fa310ab5" }}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} >
                                <Text style={styles.modalText}>Cerrar sesión</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </ModalPoup>
        </>
    )
}

export default ModalLogout

const styles = StyleSheet.create({
    logoutBtn: {
        backgroundColor: "#fa310ab5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    modalText: {
        color: "white",
        fontSize: 18,
    },
})