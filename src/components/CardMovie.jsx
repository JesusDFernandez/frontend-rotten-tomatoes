import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const URL_IMAGE = "https://image.tmdb.org/t/p/original";

const CardMovie = ({ movie, type }) => {

    const navigation = useNavigation();

    const goToDetailsMovie = () => {
        navigation.navigate("DetailsMovie", {
            itemId: movie.id,
            type
        });
    }

    return (
        <>

            <View style={{ flex: 1, alignItems: "flex-start", gap: 10, paddingBottom: 10, }}>

                <TouchableOpacity onPress={goToDetailsMovie}>
                    <>
                        <Image
                            style={{
                                minWidth: "100%", height: 150,
                                objectFit: 'fill', borderTopLeftRadius: 10, borderTopRightRadius: 10,
                            }}
                            source={{
                                uri: (`${URL_IMAGE}/${movie.poster_path}`)
                            }}
                        />
                    </>
                </TouchableOpacity>


                <View style={{ width: "100%" }}>

                    <TouchableOpacity onPress={goToDetailsMovie}>
                        <View style={{ marginLeft: 10 }}>

                            <Text style={{ color: "white", fontSize: 14, }}>
                                {movie.title || movie.name}
                            </Text>

                        </View>
                    </TouchableOpacity >
                </View>

            </View>
        </>
    )
}

export default CardMovie

const styles = StyleSheet.create({})