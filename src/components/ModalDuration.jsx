import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ModalPoup from './ModalPoup'

const ModalDuration = ({ visible, setVisible, value, setValue }) => {

    const [filterFrom, setFilterFrom] = useState("");

    const [filterTo, setFilterTo] = useState("");

    useEffect(() => {
        setFilterFrom(value?.from);
        setFilterTo(value?.to);
    }, [value]);

    const handleDuration = () => {
        setVisible(false);
        setValue({
            from: filterFrom,
            to: filterTo
        });
    }
    const handleReset = () => {
        setFilterFrom("");
        setFilterTo("");
        setVisible(false);
        setValue({
            from: "",
            to: ""
        });
    }
    return (
        <>
            <ModalPoup visible={visible}>
                <View style={{ alignItems: 'center' }}>

                    <View style={{ width: '100%', marginBottom: 10, height: 40, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{ width: 40, textAlign: "center", fontSize: 30 }}>x</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 20, fontWeight: "bold", textTransform: "uppercase" }}>duración (minutos)</Text>
                    <View style={{ width: "100%", borderBottomColor: "black", borderBottomWidth: 1, marginTop: 10 }}></View>

                    <View style={{ marginVertical: 40, gap: 20 }}>

                        <View style={styles.search} >

                            <Text>Desde:</Text>

                            <TextInput
                                style={styles.inputText2}
                                placeholder="Ej. 60"
                                placeholderTextColor="#003f5c"
                                onChangeText={text => setFilterFrom(text)}
                                keyboardType="numeric"
                                value={filterFrom}
                            />

                        </View>

                        <View style={styles.search} >

                            <Text>Hasta:</Text>

                            <TextInput
                                style={styles.inputText2}
                                placeholder="Ej. 120"
                                placeholderTextColor="#003f5c"
                                onChangeText={text => setFilterTo(text)}
                                keyboardType="numeric"
                                value={filterTo}

                            />

                        </View>

                        <TouchableOpacity onPress={handleDuration}>
                            <View
                                style={styles.icon}

                            >
                                <AntDesign
                                    name="search1"
                                    size={24}
                                    color="white"
                                />
                            </View>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity onPress={handleReset}>
                        <Text>Resetear</Text>
                    </TouchableOpacity>

                </View>
            </ModalPoup >

        </>
    )
}

export default ModalDuration

const styles = StyleSheet.create({

    inputText2: {
        width: "95%",
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

    search: {
        gap: 10,
        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
        marginHorizontal: 20

    },
    icon: {
        backgroundColor: "#fa310ab5",
        borderRadius: 12,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
})