import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import ModalPoup from './ModalPoup'
import { useMovies } from '../context/moviesContext';
import { useSeries } from '../context/seriesContext';


const ModalYoutube = ({ id, type, visible, setVisible }) => {

    const [idVideo, setIdVideo] = useState(null);

    const { getMovieVideo } = useMovies();

    const { getSerieVideo } = useSeries();

    useEffect(() => {

        const resMovie = async () => {
            const res = await getMovieVideo(id);
            setIdVideo(res.results[0]?.key);
        }
        const resSerie = async () => {
            const res = await getSerieVideo(id);
            setIdVideo(res.results[0]?.key);
        }
        if (type === "movie") {
            resMovie();
        }
        if (type === "tv") {
            resSerie();
        }


    }, [id]);


    return (
        <>

            <ModalPoup visible={visible}>
                <View style={{ alignItems: 'center' }}>

                    <View style={{ width: '100%', height: 40, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{ width: 40, textAlign: "center", fontSize: 30 }}>x</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 20, fontWeight: "bold", textTransform: "uppercase" }}>trailer oficial</Text>
                    <View style={{ width: "100%", borderBottomColor: "black", borderBottomWidth: 1, marginTop: 10 }}></View>

                    <View style={{ marginVertical: 40, }}>
                        {idVideo ?

                            <YoutubePlayer
                                height={200}
                                width={280}
                                play={true}
                                videoId={idVideo}
                            /> : <Text>No encontrado...</Text>
                        }
                    </View>
                </View>
            </ModalPoup >


        </>
    )
}

export default ModalYoutube

const styles = StyleSheet.create({})