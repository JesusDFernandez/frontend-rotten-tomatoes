import { StyleSheet, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'

import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Loading from './Loading';

import { useAuth } from '../context/authContext';

import { getMessageRequest } from '../api/message';
import socket from '../api/socket';


const Chat = ({ route }) => {

    const { roomName } = route.params;

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    useEffect(() => {

        socket.on("receive_message", (data) => {
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, data.messages)
            );
        });

        async function getMessage() {
            const message = await getMessageRequest(roomName);

            setMessages(message.data.messages);
            setLoading(true);

        }
        getMessage()

    }, []);

    const onSend = useCallback((messages = []) => {

        socket.emit("send_message", { "messages": messages[0], "room": roomName });

    }, []);

    const joinRoom = () => {
        if (roomName !== "") {
            socket.emit("join_room", roomName);
        }
    };

    useEffect(() => {
        joinRoom()
    }, [roomName])

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={40}
                        color="#2e64e5"
                    />
                </View>
            </Send>
        );
    };


    return (
        <>
            <View style={{ height: 50 }}></View>

            {loading ?
                <GiftedChat
                    showAvatarForEveryMessage={false}
                    showUserAvatar={false}
                    messagesContainerStyle={{ backgroundColor: '#fff' }}
                    textInputStyle={{ backgroundColor: '#fff', borderRadius: 20 }}
                    locale='es'
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: user.id,
                        name: user.username
                    }}
                    alwaysShowSend
                    renderSend={renderSend}
                    placeholder="Escribe un mensaje..."
                />
                : <Loading />
            }
        </>
    )
}

export default Chat

const styles = StyleSheet.create({})