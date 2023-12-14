import { Image, Text, TouchableOpacity, View } from 'react-native'
import * as Progress from 'react-native-progress';
import { AirbnbRating } from 'react-native-ratings';
import ModalPoup from './ModalPoup'

const ModalStat = ({ stat, type, visible, setVisible }) => {


    return (
        <>
            <ModalPoup visible={visible}>
                <View style={{ alignItems: 'center' }}>

                    <View style={{ width: '100%', marginBottom: 10, height: 40, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{ width: 40, textAlign: "center", fontSize: 30 }}>x</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 20, fontWeight: "bold", textTransform: "uppercase" }}>
                        {type ? "TOMATÓMETRO" : "AUDIENCIA"}
                    </Text>
                    <View style={{ width: "100%", borderBottomColor: "black", borderBottomWidth: 1, marginTop: 10 }}></View>

                    <View style={{ marginVertical: 40, gap: 20 }}>

                        {
                            type ?
                                <>
                                    <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>

                                        {

                                            Math.round(stat?.porcentajeCritico) > 60 ?

                                                <Image
                                                    style={{ width: 40, height: 40, objectFit: 'fill', }}
                                                    source={require("../../assets/tomato-fresh.png")}

                                                />
                                                :
                                                Math.round(stat?.porcentajeCritico) == 0 ?
                                                    <Image
                                                        style={{ width: 40, height: 40, objectFit: 'fill', }}
                                                        source={require("../../assets/tomato-empty.png")}
                                                    />
                                                    :
                                                    <Image
                                                        style={{ width: 40, height: 40, objectFit: 'fill', }}
                                                        source={require("../../assets/tomato-rotten.png")}
                                                    />

                                        }
                                        <Text style={{ fontWeight: "bold", fontSize: 32 }}>{Math.round(stat.porcentajeCritico)}%</Text>
                                    </View>

                                    <Text style={{ fontSize: 14, marginTop: -20 }}>{stat.cantPositivaCritico + stat.cantNegativaCritico} {stat.cantPositivaCritico + stat.cantNegativaCritico === 1 ? "reseña" : "reseñas"} </Text>

                                    <View >
                                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Calificación promedio: </Text>
                                        <AirbnbRating
                                            count={5}
                                            showRating={false}
                                            defaultRating={stat.totalPointCritico / (stat.cantPositivaCritico + stat.cantNegativaCritico)}
                                            isDisabled
                                            size={35}
                                        />
                                    </View>
                                    <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>FRESH: {stat.cantPositivaCritico}</Text>
                                        <Progress.Bar
                                            progress={isNaN(stat.cantPositivaCritico / (stat.cantPositivaCritico + stat.cantNegativaCritico)) ? 0 : stat.cantPositivaCritico / (stat.cantPositivaCritico + stat.cantNegativaCritico)}
                                            width={150}
                                            color='#505257'
                                        />
                                    </View>

                                    <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>ROTTEN: {stat.cantNegativaCritico}</Text>
                                        <Progress.Bar
                                            progress={isNaN(stat.cantNegativaCritico / (stat.cantPositivaCritico + stat.cantNegativaCritico)) ? 0 : stat.cantNegativaCritico / (stat.cantPositivaCritico + stat.cantNegativaCritico)}
                                            width={150}
                                            color='#505257'
                                        />

                                    </View>
                                </>
                                : <>

                                    <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>


                                        {

                                            Math.round(stat?.porcentajeAudiencia) > 60 ?

                                                <Image
                                                    style={{ width: 40, height: 40, objectFit: 'fill', }}
                                                    source={require("../../assets/audience-fresh.png")}

                                                />
                                                :
                                                Math.round(stat?.porcentajeAudiencia) == 0 ?
                                                    <Image
                                                        style={{ width: 40, height: 40, objectFit: 'fill', }}
                                                        source={require("../../assets/audience-empty.png")}
                                                    />
                                                    :
                                                    <Image
                                                        style={{ width: 40, height: 40, objectFit: 'fill', }}
                                                        source={require("../../assets/audience-rotten.png")}
                                                    />

                                        }


                                        <Text style={{ fontWeight: "bold", fontSize: 32 }}>{Math.round(stat.porcentajeAudiencia)}%</Text>
                                    </View>

                                    <Text style={{ fontSize: 14, marginTop: -20 }}>{stat.cantPositivaAudiencia + stat.cantNegativaAudiencia} {stat.cantPositivaAudiencia + stat.cantNegativaAudiencia === 1 ? "reseña" : "reseñas"} </Text>

                                    <View >
                                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Calificación promedio: </Text>
                                        <AirbnbRating
                                            count={5}
                                            showRating={false}
                                            defaultRating={stat.totalPointAudiencia / (stat.cantPositivaAudiencia + stat.cantNegativaAudiencia)}
                                            isDisabled
                                            size={35}
                                        />

                                    </View>
                                    <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>FRESH: {stat.cantPositivaAudiencia}</Text>
                                        <Progress.Bar
                                            progress={isNaN(stat.cantPositivaAudiencia / (stat.cantPositivaAudiencia + stat.cantNegativaAudiencia)) ? 0 : stat.cantPositivaAudiencia / (stat.cantPositivaAudiencia + stat.cantNegativaAudiencia)}
                                            width={150}
                                            color='#505257'
                                        />
                                    </View>

                                    <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>ROTTEN: {stat.cantNegativaAudiencia}</Text>
                                        <Progress.Bar
                                            progress={isNaN(stat.cantNegativaAudiencia / (stat.cantPositivaAudiencia + stat.cantNegativaAudiencia)) ? 0 : stat.cantNegativaAudiencia / (stat.cantPositivaAudiencia + stat.cantNegativaAudiencia)}
                                            width={150}
                                            color='#505257'
                                        />

                                    </View>
                                </>
                        }
                    </View>


                </View>
            </ModalPoup >

        </>
    )
}

export default ModalStat