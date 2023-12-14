import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'

import Loading from './Loading';
import CardMovie from './CardMovie';
import ModalReleaseYear from './ModalReleaseYear';
import ModalDuration from './ModalDuration';

import { useMovies } from '../context/moviesContext';
import { useSeries } from '../context/seriesContext';

import { getQueryFilterRequest } from '../api/movies';

export default function Dashboard() {

    const navigation = useNavigation();

    const [filteredMovies, setFilteredMovies] = useState(null);

    const { loading, getMovieFilter, getMovieGenre } = useMovies();
    const { getSerieGenre } = useSeries();


    const [selectedGenero, setSelectedGenero] = useState("");
    const [dataGenero, setDataGenero] = useState([]);

    const [selectedTv, setSelectedTv] = useState("movie");
    const tv = [
        { key: 'movie', value: 'Peliculas' },
        { key: 'tv', value: 'Series' }
    ]

    const page = useRef(1);

    useEffect(() => {

        async function getGM() {
            const generos = await getMovieGenre();
            const objGenros = [];
            objGenros.push({ key: "", value: "Todo" })
            generos.genres.forEach((gen) => {
                objGenros.push({ key: gen.id, value: gen.name })
            })
            setDataGenero(objGenros);
        }

        async function getGS() {
            const generos = await getSerieGenre();
            const objGenros = [];
            objGenros.push({ key: "", value: "Todo" })
            generos.genres.forEach((gen) => {
                objGenros.push({ key: gen.id, value: gen.name })
            })
            setDataGenero(objGenros);
        }

        if (selectedTv === "movie") {
            getGM();
        }
        if (selectedTv === "tv") {
            getGS();
        }

    }, [selectedTv]);


    const handleScroll = async (event) => {

        const scrollOffsetY = event.nativeEvent.contentOffset.y;

        if (scrollOffsetY + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height) {

            page.current++;

            isFilterMovies.current = true;

            if (filterText !== "") {
                handleFilter();
            } else {
                filterMovieApi();
            }

        }

    }

    const [filterYear, setFilterYear] = useState(null);
    const [filterVisibleYear, setFilterVisibleYear] = useState(false);


    const [filterDuration, setFilterDuration] = useState(null);
    const [filterVisibleDuration, setFilterVisibleDuration] = useState(false);


    const filterMovieApi = async () => {

        const res = await getMovieFilter({
            type: selectedTv || "movie",
            page: page.current,
            year: filterYear || "",
            genres: selectedGenero || "",
            from: filterDuration?.from || "",
            to: filterDuration?.to || ""
        });

        if (isFilterMovies.current) {
            setFilteredMovies([...filteredMovies, ...res.results]);

        } else {
            setFilteredMovies(res.results);
        }
    }


    const isFilterMovies = useRef(true);

    useEffect(() => {

        isFilterMovies.current = false;
        page.current = 1;

        filterMovieApi();

    }, [filterDuration, filterYear])



    useEffect(() => {

        tv.forEach((select) => {
            if (select.value === selectedTv) {
                setSelectedTv(select.key);
            }
        })

        filterMovieApi();

    }, [selectedTv]);

    useEffect(() => {

        dataGenero.forEach((select) => {
            if (select.value === selectedGenero) {
                setSelectedGenero(select.key);
            }
        })

        filterMovieApi();

    }, [selectedGenero]);


    const handlePreviewFilter = (val) => {

        setSelectedGenero("Todo");

        setSelectedTv(val);
    }


    const handleReset = () => {
        setSelectedTv("movie");
        page.current = 1;
        setFilterYear("");
        setSelectedGenero("");
        setFilterDuration({ from: "", to: "" });
    }


    const [filterText, setFilterText] = useState("");

    const [totalPages, setTotalPages] = useState(1);

    const handleFilter = async () => {

        if (filterText === "") {
            return
        }

        if (totalPages < page.current) {
            return
        }

        const res = await getQueryFilterRequest({ "query": filterText, "page": page.current });

        setTotalPages(res.data.total_pages);

        if (isFilterMovies.current) {
            setFilteredMovies([...filteredMovies, ...res.data.results]);
            return
        }
        setFilteredMovies(res.data.results);
    }

    useEffect(() => {

        if (filterText === "") {
            filterMovieApi();
        }

    }, [filterText]);



    return (
        <>

            <TouchableOpacity
                onPress={() => navigation.navigate('DashboardChat')}
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

                <Ionicons name="chatbubble-ellipses-outline" size={40} color="white" />

            </TouchableOpacity>

            <View style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#1a1a1d",
            }}></View>

            <ModalReleaseYear visible={filterVisibleYear} setVisible={setFilterVisibleYear} value={filterYear} setValue={setFilterYear} />

            <ModalDuration visible={filterVisibleDuration} setVisible={setFilterVisibleDuration} value={filterDuration} setValue={setFilterDuration} />

            <View style={{ borderBottomColor: "white", borderBottomWidth: 1, marginBottom: 20 }}>

                <View style={{ padding: 20, flexDirection: "row", justifyContent: "center" }}>
                    <Image
                        style={{ width: 250, height: 60, objectFit: 'contain' }}
                        source={require('../../assets/logo.png')}
                    />
                </View>

                <View style={styles.search} >

                    <TextInput
                        style={styles.inputText2}
                        placeholder="Buscar..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setFilterText(text)}
                    />

                    <TouchableOpacity onPress={handleFilter}>
                        <AntDesign
                            name="search1"
                            size={24}
                            color="#aaa"
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                </View>

                <ScrollView horizontal={true}>
                    <View style={{ padding: 20, flexDirection: "row", gap: 10, }}>

                        {filterText === "" &&
                            <>
                                <TouchableOpacity onPress={() => setFilterVisibleYear(true)}>
                                    <Text style={styles.filter}>Año de lanzamiento</Text>
                                </TouchableOpacity>

                                <SelectList
                                    setSelected={(val) => setSelectedGenero(val)}
                                    data={dataGenero}
                                    save="value"
                                    placeholder="Genero"
                                    searchPlaceholder="Buscar..."
                                    notFoundText='Sin resultados'
                                    boxStyles={{ width: 150, backgroundColor: "white" }}
                                    dropdownStyles={{ backgroundColor: "white" }}
                                />

                                <TouchableOpacity onPress={() => setFilterVisibleDuration(true)}>
                                    <Text style={styles.filter}>Duración</Text>
                                </TouchableOpacity>

                                <SelectList
                                    setSelected={(val) => handlePreviewFilter(val)}
                                    data={tv}
                                    save="value"
                                    placeholder="Serie/Pelicula"
                                    searchPlaceholder="Buscar..."
                                    notFoundText='Sin resultados'
                                    search={false}
                                    boxStyles={{ width: 150, backgroundColor: "white" }}
                                    dropdownStyles={{ backgroundColor: "white" }}
                                />

                                <TouchableOpacity onPress={handleReset}>
                                    <Text style={styles.filter}>Resetear</Text>
                                </TouchableOpacity>
                            </>
                        }

                    </View>
                </ScrollView>

            </View>

            <ScrollView onScroll={handleScroll}>

                <View style={styles.container}>
                    {
                        filteredMovies ? filteredMovies.map((movie, index) => (
                            <View key={index} style={styles.column}>
                                <CardMovie movie={movie} type={selectedTv} />
                            </View>
                        )) : <Loading visible={loading} />

                    }

                    {totalPages !== page.current &&

                        <ActivityIndicator size="large" color="#00ff00" />
                    }

                </View >
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        gap: 12,
    },
    column: {
        width: '30%',
        marginBottom: 10,
    },
    icon: {
        padding: 10,
    },

    inputText2: {
        width: "80%",
        height: 50,
        borderRadius: 12,
        padding: 10,
        color: "#677294",
        fontSize: 16,
        fontWeight: "300",
        letterSpacing: -0.3,
    },

    search: {
        gap: 5,
        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        position: "relative",
        marginVertical: 5,
        marginHorizontal: 20
    },
    title: {
        color: "white",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "500",
        letterSpacing: -0.3,
    },
    filter: {
        borderRadius: 10,
        padding: 12,
        borderColor: "#aaa",
        borderWidth: 1,
        textAlign: "center",
        width: 150,
        backgroundColor: "white"
    }
});