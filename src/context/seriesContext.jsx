import { createContext, useContext, useState } from "react";
import { getSerieFilterRequest, getSerieVideoRequest, getSerieRequest, getSeriesRequest, getSerieGenreRequest } from "../api/series";

const SerieContext = createContext();

export const useSeries = () => {
    const context = useContext(SerieContext);
    if (!context) throw new Error("useseries must be used within a movieProvider");
    return context;
};

export function SeriesProvider({ children }) {

    const [series, setSeries] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    const getSeries = async (page = 1) => {
        const res = await getSeriesRequest(page);

        if (series.results) {
            setSeries({ results: [...series.results, ...res.data.results] });

        } else {
            setSeries(res.data);

        }

        setLoading(false);
    };

    const getSerieVideo = async (id) => {
        const res = await getSerieVideoRequest(id);
        return res.data;
    };

    const getSerie = async (id) => {
        try {
            const res = await getSerieRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getSerieFilter = async (filter) => {
        try {

            const res = await getSerieFilterRequest(filter);
            return res.data;

        } catch (error) {
            console.error(error);
        }
    }

    const getSerieGenre = async () => {
        try {

            const res = await getSerieGenreRequest();
            return res.data;

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SerieContext.Provider
            value={{
                series,
                refresh,
                loading,
                getSerie,
                getSerieFilter,
                getSerieVideo,
                getSerieGenre
            }}
        >
            {children}
        </SerieContext.Provider>
    );
}
