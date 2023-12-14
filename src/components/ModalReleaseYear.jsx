import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ModalPoup from './ModalPoup'

const ModalReleaseYear = ({ visible, setVisible, value, setValue }) => {

    const [filter, setFilter] = useState("");

    useEffect(() => {
        setFilter(value);
    }, [value]);

    const handleYear = () => {
        setVisible(false);
        setValue(filter);
    }
    const handleReset = () => {
        setFilter("");
        setVisible(false);
        setValue("");
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

                    <Text style={{ fontSize: 20, fontWeight: "bold", textTransform: "uppercase" }}>año de lanzamiento</Text>
                    <View style={{ width: "100%", borderBottomColor: "black", borderBottomWidth: 1, marginTop: 10 }}></View>

                    <View style={{ marginTop: 40, marginBottom: 10 }}>

                        <View style={styles.search} >

                            <TextInput
                                style={styles.inputText2}
                                placeholder="Ej. 2023"
                                placeholderTextColor="#003f5c"
                                onChangeText={text => setFilter(text)}
                                keyboardType="numeric"
                                value={filter}
                            />

                            <TouchableOpacity onPress={handleYear}>
                                <AntDesign
                                    name="search1"
                                    size={24}
                                    color="#aaa"
                                    style={styles.icon}
                                />
                            </TouchableOpacity>


                        </View>

                        <TouchableOpacity onPress={handleReset}>
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                                <Text>Resetear</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
            </ModalPoup >

        </>
    )
}

export default ModalReleaseYear

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
    },
})