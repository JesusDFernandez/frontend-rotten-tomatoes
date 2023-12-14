import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import ModalPoup from './ModalPoup'
import { getUsersTodosRequest } from '../api/users';
import { createGroupRequest } from '../api/group';

const ModalGroup = ({ visible, setVisible, setValue }) => {

    const [nameGroup, setNameGroup] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [dataUsersGroup, setDataUsersGroup] = useState(null);

    const handleCreateGroup = async () => {

        const idsParticipants = [];

        selectedUsers.forEach((selectUser) => {
            dataUsersGroup.forEach((select) => {
                if (select.value === selectUser) {
                    idsParticipants.push(select.key);
                }
            })
        })

        setVisible(false);

        setValue();
        const res = await createGroupRequest({
            nameGroup,
            "participants": idsParticipants
        })

    }


    useEffect(() => {

        async function getGroup() {

            const usersGroup = await getUsersTodosRequest();

            const objUsersGroup = [];

            usersGroup.data.forEach(user => {
                objUsersGroup.push({
                    key: user._id,
                    value: user.username
                })
            });

            setDataUsersGroup(objUsersGroup);

        }
        getGroup()


    }, []);

    return (
        <>

            <ModalPoup visible={visible}>
                <View style={{ alignItems: 'center' }}>

                    <View style={{ width: '100%', marginBottom: 10, height: 40, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{ width: 40, textAlign: "center", fontSize: 30 }}>x</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 20, fontWeight: "bold", textTransform: "uppercase" }}>nuevo grupo</Text>
                    <View style={{ width: "100%", borderBottomColor: "black", borderBottomWidth: 1, marginTop: 10 }}></View>

                    <View style={{ marginTop: 40, gap: 30 }}>

                        <View style={styles.search} >

                            <TextInput
                                style={styles.inputText2}
                                placeholder="Nombre del grupo"
                                placeholderTextColor="#003f5c"
                                onChangeText={text => setNameGroup(text)}
                                value={nameGroup}
                            />

                        </View>

                        <MultipleSelectList
                            setSelected={(val) => setSelectedUsers(val)}
                            data={dataUsersGroup}
                            save="value"
                            label="Parcipantes"
                            maxHeight={200}
                            placeholder="Selecciona los participantes"
                            searchPlaceholder="Buscar..."
                            notFoundText='Sin resultados'
                            boxStyles={{ backgroundColor: "white", borderRadius: 12, borderWidth: 1, borderColor: 'rgba(103, 114, 148, 0.16)' }}
                            dropdownStyles={{ backgroundColor: "white" }}
                        />

                        <TouchableOpacity onPress={handleCreateGroup}>
                            <View style={{
                                backgroundColor: "#fa310ab5",
                                borderRadius: 12,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 20,
                                flexDirection: "row",
                                gap: 10
                            }}>

                                <Text style={{ color: "white" }}>CREAR GRUPO</Text>
                                <AntDesign name="plus" size={24} color="white" />

                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
            </ModalPoup >

        </>
    )
}

export default ModalGroup

const styles = StyleSheet.create({

    inputText2: {
        width: "100%",
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
    },
    icon: {

    },
})