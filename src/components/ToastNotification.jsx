import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ToastNotification = ({ message }) => {

    return (
        <>

            <View
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    right: 10,
                    shadowColor: '#003049',
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    shadowOffset: { width: 0, height: 1 },
                    elevation: 2,
                    borderLeftColor: "red",
                    borderLeftWidth: 10,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    padding: 20,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    zIndex: 2

                }}
            >
                <MaterialCommunityIcons name="close-circle" size={30} color="red" />
                <View>

                    <Text style={{
                        color: 'black',
                        fontWeight: 'bold',
                        marginLeft: 10,
                        fontSize: 16,
                    }}>Error</Text>
                    <Text style={{
                        color: '#7b7b7b',
                        fontWeight: '500',
                        marginLeft: 10,
                        fontSize: 14,
                    }}>{message}</Text>

                </View>
            </View>

        </>
    )
}

export default ToastNotification;