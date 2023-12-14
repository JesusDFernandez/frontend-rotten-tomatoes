import { createContext, useContext, useRef, useState } from "react";
import { createCommentRequest, getCommentsRequest } from "../api/comments";

const CommentContext = createContext();

export const useComments = () => {
    const context = useContext(CommentContext);
    if (!context) throw new Error("useComments must be used within a CommentProvider");
    return context;
};

export function CommentProvider({ children }) {
    const [comments, setComments] = useState([]);

    const [stat, setStat] = useState(null);

    const [defaultId, setDefaultId] = useState(null);

    const getComments = async (movieId, parentId) => {

        setComments(null);

        setDefaultId({ movieId, parentId });

        const res = await getCommentsRequest(movieId || defaultId.movieId, parentId || defaultId.parentId);

        setComments(res.data.comments);
        setStat(res.data.stat);
    };

    const createComment = async (comment) => {
        try {
            const res = await createCommentRequest(comment);
            await getComments();

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <CommentContext.Provider
            value={{
                comments,
                stat,
                getComments,
                createComment
            }}
        >
            {children}
        </CommentContext.Provider>
    );
}
