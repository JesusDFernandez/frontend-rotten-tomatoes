import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const Comment = ({ data, movieId, type, parent = true }) => {

    const navigation = useNavigation();

    const handleComment = (id) => {

        navigation.navigate('DashboardComment', {
            idComment: id,
            idMovie: movieId,
            type
        });

    }

    function formatDate(dateIso) {
        const date = new Date(dateIso);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }


    return (
        <>

            <View style={{ width: "100%", gap: 20, marginTop: 20 }}>

                <View style={{ backgroundColor: "white", padding: 15, borderRadius: 15, marginHorizontal: 20, gap: 10, flexDirection: "column" }}>
                    <View style={{ gap: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                        <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: 10 }}>{data.userId.username}</Text>

                        <View style={{ gap: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>


                            {data.userId.isCritical ?
                                <>
                                    <Text style={{
                                        backgroundColor: "#fa320a82", borderRadius: 15, padding: 5, fontSize: 14, fontWeight: "bold", marginLeft: 10
                                    }}>Critico</Text>

                                    {parent ?
                                        data.pointStar >= 3 ?
                                            <Image
                                                style={{ width: 40, height: 40, objectFit: 'fill', }}
                                                source={require("../../assets/tomato-fresh.png")}
                                            />
                                            :
                                            <Image
                                                style={{ width: 40, height: 40, objectFit: 'fill', }}
                                                source={require("../../assets/tomato-rotten.png")}
                                            />
                                        : ""
                                    }
                                </>
                                :
                                parent ?
                                    data.pointStar >= 3 ?
                                        <Image
                                            style={{ width: 40, height: 40, objectFit: 'fill', }}
                                            source={require("../../assets/audience-fresh.png")}
                                        />
                                        :
                                        <Image
                                            style={{ width: 40, height: 40, objectFit: 'fill', }}
                                            source={require("../../assets/audience-rotten.png")}
                                        />
                                    : ""
                            }

                        </View>
                    </View>
                    <View style={{ gap: 10, }}>

                        <Text>{data.text}</Text>
                        <View style={{ flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "space-between" }}>

                            <Text style={{ fontSize: 12 }}>{formatDate(data.createdAt)}
                                {
                                    parent && <Text> | Calificación: {data.pointStar}/5 </Text>
                                }

                            </Text>

                            <TouchableOpacity onPress={() => handleComment(data._id)}>
                                <EvilIcons name="comment" size={30} color="black" />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

            </View>

        </>
    )
}

export default Comment

const styles = StyleSheet.create({})