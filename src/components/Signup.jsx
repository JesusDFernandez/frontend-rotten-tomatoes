import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from './Loading';
import ToastNotification from './ToastNotification';
import { useAuth } from '../context/authContext';

const Signup = () => {

    const { signup, errors, loading, isAuthenticated } = useAuth();

    const [fullname, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordC, setPasswordC] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [message, setMessage] = useState("");



    const [showToast, setShowToast] = useState(false);

    const navigation = useNavigation();

    const sendMessage = (message) => {
        setMessage(message)
        setShowToast(true);
        setTimeout(() => {
            setMessage("");
            setShowToast(false);
        }, 5000);
    }



    const isFocused = useIsFocused();
    useEffect(() => {
        if (errors.length !== 0) {
            sendMessage(errors);
        }
    }, [errors])


    useEffect(() => {
        if (isAuthenticated && isFocused) {
            navigation.navigate("Dashboard");
        }

        return () => {
            setUsername("");
            setPassword("");
            setMessage("");
        }

    }, [isAuthenticated, isFocused]);



    const handleRegister = async () => {

        if (!fullname) {
            sendMessage("Falta el nombre completo")
            return
        }
        if (!username) {
            sendMessage("Falta el usuario")
            return
        }
        if (!password) {
            sendMessage("Falta la contraseña")
            return
        }
        if (!passwordC) {
            sendMessage("Falta la confirmación de la contraseña")
            return
        }

        if (password !== passwordC) {
            sendMessage("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.")
            return
        }
        await signup({
            "username": username.trim(),
            "fullname": fullname.trim(),
            "password": password.trim()
        })


    }


    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleCheckUsername = (text) => setUsername(text);


    return (

        <>
            {loading && <Loading visible={loading} />}

            {showToast && <ToastNotification message={message} />}

            <View style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#292929",
            }}></View>

            <ScrollView>

                <View style={styles.container}>

                    <Text style={styles.bienvenido}> Registro </Text>

                    <View style={styles.inputView} >
                        <View style={styles.inputPass} >

                            <TextInput
                                style={styles.inputText2}
                                placeholder="Nombre y Apellido"
                                placeholderTextColor="white"
                                onChangeText={text => setFullName(text)}
                            />

                        </View>

                    </View>
                    <View style={styles.inputView} >
                        <View style={styles.inputPass} >

                            <TextInput
                                style={styles.inputText2}
                                placeholder="Usuario"
                                placeholderTextColor="white"
                                onChangeText={handleCheckUsername}
                            />

                        </View>

                    </View>

                    <View style={styles.inputView} >

                        <View style={styles.inputPass} >

                            <TextInput
                                secureTextEntry={showPassword}
                                style={styles.inputText2}
                                placeholder="Contraseña"
                                placeholderTextColor="white"
                                onChangeText={text => setPassword(text)}
                            />

                            <MaterialCommunityIcons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="#aaa"
                                style={styles.icon}
                                onPress={handleShowPassword}
                            />

                        </View>

                    </View>

                    <View style={styles.inputView} >

                        <View style={styles.inputPass} >

                            <TextInput
                                secureTextEntry={showPassword}
                                style={styles.inputText2}
                                placeholder="Confirma la contraseña"
                                placeholderTextColor="white"
                                onChangeText={text => setPasswordC(text)}
                            />

                            <MaterialCommunityIcons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="#aaa"
                                style={styles.icon}
                                onPress={handleShowPassword}
                            />

                        </View>

                    </View>

                    <TouchableOpacity
                        onPress={handleRegister}
                        style={styles.loginBtn}>
                        <Text style={styles.loginText}>Registrar</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </>

    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 80,
        justifyContent: "center",
        alignItems: "center",
    },

    inputView: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,

    },
    inputText: {
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(103, 114, 148, 0.16)',
        padding: 10,
        color: "#677294",
        fontSize: 16,
        fontWeight: "300",
        letterSpacing: -0.3,
    },
    inputText2: {
        width: "130%",
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(103, 114, 148, 0.16)',
        padding: 10,
        color: "white",
        fontSize: 16,
        fontWeight: "300",
        letterSpacing: -0.3,
    },
    inputPass: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
    },
    icon: {
        position: "absolute",
        right: -15,
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        backgroundColor: "#fa310ab5",
        width: "80%",
        borderRadius: 12,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    signupText: {
        color: "#fa310ab5",
        fontSize: 14,
        fontWeight: "400",
        letterSpacing: -0.3
    },
    loginText: {
        color: "white",
        fontSize: 18,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },

    bienvenido: {
        color: "white",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "500",
        letterSpacing: -0.3,
        marginBottom: 50,

    },
    descripcion: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        marginBottom: 50,
        letterSpacing: -0.3,
    }
});
export default Signup;