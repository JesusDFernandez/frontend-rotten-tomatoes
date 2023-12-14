import { useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

import ModalYoutube from './ModalYoutube';
import ModalComment from './ModalComment';
import Comment from './Comment';
import ModalStat from './ModalStat';
import Loading from './Loading';

import { useMovies } from '../context/moviesContext';
import { useSeries } from '../context/seriesContext';
import { useComments } from '../context/commentsContext';
import { useAuth } from '../context/authContext';

const URL_IMAGE = "https://image.tmdb.org/t/p/original";

const DetailsMovie = ({ route }) => {

    const { itemId, type } = route.params;

    const [visible, setVisible] = useState(false);
    const [visibleComment, setVisibleComment] = useState(false);

    const goToTrailer = () => {
        setVisible(!visible);
    }

    const [movie, setMovie] = useState(null);

    const { getMovie } = useMovies();
    const { getSerie } = useSeries();

    useEffect(() => {

        const resMovie = async () => {
            const res = await getMovie(itemId);
            setMovie(res)
        }

        const resSerie = async () => {
            const res = await getSerie(itemId);
            setMovie(res)
        }

        if (type === "movie") {
            resMovie();
        }

        if (type === "tv") {
            resSerie();
        }

        return () => {
            setMovie(null);
        }

    }, [itemId])

    const handleComment = () => {
        setVisibleComment(true);
    }

    const { comments, stat, getComments } = useComments();

    const isFocused = useIsFocused();

    useEffect(() => {

        async function getC() {

            await getComments(itemId, itemId);

        }

        if (isFocused) {
            getC();
        }

    }, [isFocused]);



    const { user } = useAuth();

    const canComment = () => {

        const res = comments.some(comment => {
            return comment.userId._id === user.id;
        });

        return !res;
    }

    const [visibleStat, setVisibleStat] = useState(false);

    const [typeStat, setTypeStat] = useState(false);
    const handleStat = (type) => {
        setVisibleStat(true);
        setTypeStat(type);
    }


    return (
        <>
            {movie && comments && stat ?
                <>

                    {visible && <ModalYoutube id={movie.id} type={type} visible={visible} setVisible={setVisible} />}

                    {visibleComment && <ModalComment parent={true} parentId={movie.id} movieId={movie.id} type={type} visible={visibleComment} setVisible={setVisibleComment} />}

                    {visibleStat && <ModalStat type={typeStat} stat={stat} visible={visibleStat} setVisible={setVisibleStat} />}

                    {canComment() &&
                        <TouchableOpacity
                            onPress={handleComment}
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: 60,
                                height: 60,
                                backgroundColor: "red",
                                borderRadius: 50,
                                margin: 20,
                                zIndex: 9999,
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center"
                            }}>

                            <EvilIcons name="comment" size={40} color="white" />

                        </TouchableOpacity>
                    }

                    <ScrollView>


                        <View style={{
                            position: "absolute",
                            top: 0, left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#1a1a1d",
                        }}></View>

                        <View style={{ gap: 15, marginBottom: 85, justifyContent: "center", alignItems: "center" }}>

                            <TouchableOpacity onPress={goToTrailer}>

                                <View style={{ minWidth: "100%" }}>
                                    <View
                                        style={{
                                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                            justifyContent: 'center', alignItems: 'center', zIndex: 2,
                                        }}
                                    >
                                        <FontAwesome5
                                            name="play-circle"
                                            size={50}
                                            color="white"
                                        />
                                    </View>

                                    <Image
                                        style={{
                                            height: 350,
                                            objectFit: 'fill', borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                        }}
                                        source={{
                                            uri: (`${URL_IMAGE}/${movie.poster_path}`)
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>


                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>{movie.title || movie.name}</Text>

                            <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 10, textAlign: "center" }}>{movie.overview} </Text>

                            <View style={{ flexDirection: "row" }}>

                                <TouchableOpacity onPress={() => handleStat(true)}>

                                    <View style={{ marginLeft: 10, alignItems: "center" }}>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>

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

                                            <Text style={{ color: "#fa320a", fontWeight: 'bold', marginLeft: 10, fontSize: 40, }}>
                                                {Math.round(stat.porcentajeCritico)}%
                                            </Text>
                                        </View>
                                        <Text style={{ color: "white", fontSize: 14 }}>TOMATÓMETRO</Text>
                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleStat(false)}>

                                    <View style={{ marginLeft: 10, alignItems: "center" }}>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
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

                                            <Text style={{ color: "#fa320a", fontWeight: 'bold', marginLeft: 10, fontSize: 40, }}>
                                                {Math.round(stat.porcentajeAudiencia)}%
                                            </Text>
                                        </View>
                                        <Text style={{ color: 'white', fontSize: 14 }}>PUNTUACIÓN DE AUDIENCIA</Text>
                                    </View>

                                </TouchableOpacity>

                            </View>

                            <View style={{ flexDirection: "row" }}>

                                <Text style={{ color: 'white', fontWeight: "bold" }} >Género/Categoría: </Text>
                                <Text style={{ color: 'white', width: 200 }}>
                                    {
                                        movie.genres.map((genero, index) => (
                                            <Text key={index}>
                                                {genero.name}
                                                {index < movie.genres.length - 1 && ', '}
                                            </Text>
                                        ))

                                    }
                                </Text>

                            </View>

                            <View style={{ marginTop: 50, borderLeftWidth: 4, borderLeftColor: "red" }}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: "bold", marginLeft: 10, textTransform: "uppercase" }}>RESEÑAS PARA {movie.title || movie.name}</Text>
                            </View>

                            {
                                comments && comments.map((comment) => (

                                    <Comment key={comment._id} data={comment} movieId={itemId} type={type} />
                                ))
                            }

                            {comments?.length === 0 &&
                                <Text style={{ color: 'white' }}>sin comentarios...</Text>
                            }

                        </View>
                    </ScrollView>
                </> : <Loading />
            }
        </>

    )
}

export default DetailsMovie

const styles = StyleSheet.create({})