import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import ToastNotification from './ToastNotification';
import Loading from './Loading';
import { useAuth } from "../context/authContext";

const Login = () => {

    const { signin, errors, isAuthenticated, loading } = useAuth();

    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [message, setMessage] = useState("");

    const [showToast, setShowToast] = useState(false);

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


    const sendMessage = (message) => {
        setMessage(message)
        setShowToast(true);
        setTimeout(() => {
            setMessage("");
            setShowToast(false);
        }, 5000);
    }

    const handleLogin = async () => {
        if (!username) {
            sendMessage("Falta el usuario")
            return
        }
        if (!password) {
            sendMessage("Falta la contraseña")
            return
        }
        await signin({
            "username": username.trim(),
            "password": password.trim()
        });

    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleUsername = (text) => setUsername(text)

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

                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ width: 250, height: 250, objectFit: 'contain' }}
                            source={require('../../assets/logo.png')}
                        />
                    </View>
                    <Image
                        style={{ height: 300, objectFit: 'fill' }}
                        source={require("../../assets/banner.png")}
                    />

                    <View style={{ marginBottom: 100 }}></View>

                    <View style={styles.inputView} >
                        <View style={styles.inputPass} >

                            <Feather
                                style={{
                                    position: "absolute",
                                    left: -10,
                                }}
                                name="user"
                                size={24}
                                color="white"
                            />

                            <TextInput
                                style={styles.inputText2}
                                placeholder="Usuario"
                                placeholderTextColor="white"
                                onChangeText={handleUsername}
                                value={username}
                            />

                        </View>

                    </View>

                    <View style={styles.inputView} >

                        <View style={styles.inputPass} >

                            <Feather
                                style={{
                                    position: "absolute",
                                    left: -10,
                                }}

                                name="lock" size={24} color="white" />

                            <TextInput
                                secureTextEntry={showPassword}
                                style={styles.inputText2}
                                placeholder="Contraseña"
                                placeholderTextColor="white"
                                onChangeText={text => setPassword(text)}
                                value={password}
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
                        onPress={handleLogin}
                        style={styles.loginBtn}>
                        <Text style={styles.loginText}>Iniciar</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ height: 50 }}
                        onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupText}>¡No tienes una cuenta? Registrate</Text>
                    </TouchableOpacity>


                </View>

            </ScrollView>
        </>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
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
        width: "120%",
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(103, 114, 148, 0.16)',
        padding: 10,
        paddingLeft: 50,
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
        right: -10,
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
        color: "#000",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "500",
        letterSpacing: -0.3,
    },
    descripcion: {
        color: "#677294",
        textAlign: "center",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        letterSpacing: -0.3
    }
});
export default Login;