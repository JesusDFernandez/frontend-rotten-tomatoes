import { useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SwitchSelector from 'react-native-switch-selector';

import ModalGroup from './ModalGroup';

import { useAuth } from '../context/authContext';

import { createChatRequest, getChatsRequest } from '../api/chat';
import { getMessageLastRequest } from '../api/message';
import { getGroupsRequest } from '../api/group';

const DashboardChat = () => {

    const [chat, setChat] = useState([]);
    const [group, setGroup] = useState([]);

    const { user, getUserAll } = useAuth();

    const isFocused = useIsFocused();

    const [dataUser, setDataUser] = useState(null);

    const navigation = useNavigation();

    async function get() {

        const res = await getUserAll();

        const objUsers = [];

        res.forEach(user => {
            objUsers.push({
                key: user._id,
                value: user.username
            })
        });

        setDataUser(objUsers);


        const chats = await getChatsRequest();
        const groups = await getGroupsRequest();

        setChat(chats.data);

        setGroup(groups.data);

    }

    useEffect(() => {


        if (isFocused) {
            get();
        }





    }, [isFocused]);


    const handleChat = (value) => {

        dataUser.forEach(async (select) => {
            if (select.value === value) {

                const newChat = await createChatRequest({
                    "participant_id_one": user.id,
                    "participant_id_two": select.key
                })

                navigation.navigate('Chat', {
                    userName: select.value,
                    roomName: newChat.data._id
                })

            }

        })
    }

    const [visibleGroup, setVisibleGroup] = useState(false);

    const [checkSelect, setCheckSelect] = useState(false);

    return (
        <>

            <View style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#1a1a1d",
            }}></View>

            <View style={{ paddingTop: 60, paddingHorizontal: 20, gap: 20, }}>

                {
                    checkSelect &&
                    <TouchableOpacity onPress={() => setVisibleGroup(true)}>
                        <View
                            style={{
                                backgroundColor: "white",
                                borderRadius: 12,
                                height: 45,
                                alignItems: "center",
                                justifyContent: "flex-start",
                                paddingHorizontal: 20,
                                marginTop: 20,
                                flexDirection: "row",
                                gap: 10,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: 'rgba(103, 114, 148, 0.16)',
                            }}
                        >

                            <View style={{
                                backgroundColor: "red",
                                padding: 5,
                                borderRadius: 50,
                            }}>
                                <MaterialIcons name="group" size={24} color="white" />
                            </View>
                            <Text >Nuevo grupo</Text>

                        </View>
                    </TouchableOpacity>
                }

                {visibleGroup &&
                    <ModalGroup visible={visibleGroup} setVisible={setVisibleGroup} setValue={get} />

                }

                {!checkSelect &&


                    <View style={{ marginTop: 20 }}>

                        <View style={{
                            position: "absolute", zIndex: 2, top: 5, left: 20,
                            backgroundColor: "red", borderRadius: 50, padding: 5,
                            width: 35, height: 35, justifyContent: 'center', alignItems: "center"
                        }}>
                            <FontAwesome5 name="user-plus" size={20} color="white" />
                        </View>

                        <SelectList
                            setSelected={(val) => handleChat(val)}
                            data={dataUser}
                            save="value"
                            placeholder=' Nuevo Chat'
                            searchPlaceholder="Buscar..."
                            notFoundText='Sin resultados'
                            boxStyles={{ backgroundColor: "white", paddingLeft: 60 }}
                            dropdownStyles={{ backgroundColor: "white" }}
                        />
                    </View>

                }

                <View style={{ borderBottomColor: "white", borderBottomWidth: 1 }}></View>

                <SwitchSelector
                    initial={0}
                    onPress={value => setCheckSelect(value)}
                    buttonColor={"red"}
                    hasPadding
                    options={[
                        { label: "Chats", value: false, },
                        { label: "Grupos", value: true, }
                    ]}
                    testID="gender-switch-selector"
                    accessibilityLabel="gender-switch-selector"
                />

                <ScrollView>
                    <View style={{ gap: 20, marginTop: 20, marginBottom: 80 }}>
                        {chat && !checkSelect && chat.map((data, index) => (

                            <TouchableOpacity
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    gap: 10,
                                    backgroundColor: "white",
                                    padding: 10,
                                    borderRadius: 20,
                                }}
                                onPress={() => navigation.navigate('Chat', {
                                    userName: user.id === data.participant_one._id ? data.participant_two.username : data.participant_one.username,
                                    roomName: data._id
                                })}
                            >

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    <Image
                                        style={{ width: 50, height: 50, objectFit: 'fill', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                        source={require("../../assets/user.webp")}
                                    />

                                    <View>
                                        <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>{user.id === data.participant_one._id ? data.participant_two.username : data.participant_one.username}</Text>

                                        <LastMessage id={data._id} />

                                    </View>
                                </View>


                                <View style={{ margin: 5 }}></View>

                            </TouchableOpacity>
                        ))
                        }

                        {group && checkSelect && group.map((data, index) => (

                            <TouchableOpacity
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    gap: 10,
                                    backgroundColor: "white",
                                    padding: 10,
                                    borderRadius: 20,
                                }}
                                onPress={() => navigation.navigate('Chat', {
                                    userName: data.nameGroup,
                                    roomName: data._id
                                })}
                            >

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >

                                    <Image
                                        style={{ width: 50, height: 50, objectFit: 'fill', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                        source={require("../../assets/group.png")}
                                    />

                                    <View>
                                        <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                                            {data.nameGroup}</Text>

                                        <LastMessage id={data._id} />

                                    </View>
                                </View>


                                <View style={{ margin: 5 }}></View>

                            </TouchableOpacity>
                        ))
                        }

                    </View>
                </ScrollView>
            </View>

        </>
    )
}

export default DashboardChat

const styles = StyleSheet.create({


})



const LastMessage = ({ id }) => {

    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        async function get() {
            const lastMessage = await getMessageLastRequest(id);
            setLastMessage(lastMessage.data);
        }
        get()
    }, [id])


    const getTimeAgo = (fecha) => {

        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

        function isValidToday(date) {
            const today = new Date();
            const dateToCheck = new Date(date);

            return (
                dateToCheck.getDate() === today.getDate() &&
                dateToCheck.getMonth() === today.getMonth() &&
                dateToCheck.getFullYear() === today.getFullYear()
            );
        }

        function formatDate12h(date) {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            let strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }

        const isValid = isValidToday(fecha);

        if (isValid) {
            return formatDate12h(new Date(fecha));
        } else {
            return new Date(fecha).toLocaleDateString("es-Es", options);
        }

    }

    return (
        <>
            {lastMessage?._id &&
                <>
                    <View style={{ flexDirection: "row" }}>

                        <Text numberOfLines={1}>
                            {lastMessage.text}
                        </Text>

                        <Text style={{ position: "absolute", left: 150, bottom: 20 }}>
                            {getTimeAgo(lastMessage.createdAt)}
                        </Text>

                    </View>
                </>
            }
        </>
    )
}
