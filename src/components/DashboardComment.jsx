import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useComments } from '../context/commentsContext';
import Comment from './Comment';
import Loading from './Loading';
import ModalComment from './ModalComment';
import { EvilIcons } from '@expo/vector-icons';

const DashboardComment = ({ route }) => {

    const { idComment, idMovie, type } = route.params;

    const { comments, getComments } = useComments();

    useEffect(() => {

        async function getC() {
            await getComments(idMovie, idComment);
        }
        getC();

        console.log("123");

    }, [idComment]);

    const [visibleComment, setVisibleComment] = useState(false);

    const handleComment = () => {
        setVisibleComment(true);
    }


    return (

        <>
            {visibleComment && <ModalComment parentId={idComment} movieId={idMovie} type={type} visible={visibleComment} setVisible={setVisibleComment} />}

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

            <Text style={{ backgroundColor: "#1a1a1d", paddingVertical: 40, textAlign: "center", color: 'white', fontWeight: 'bold', fontSize: 20 }}>COMENTARIOS</Text>

            <ScrollView style={{ backgroundColor: "#1a1a1d" }}>
                <View style={{ gap: 15, marginBottom: 50, justifyContent: "center", alignItems: "center" }}>

                    {
                        comments ? comments.map((comment) => (

                            <Comment key={comment._id} data={comment} movieId={idMovie} parent={false} />
                        ))
                            : <Loading />
                    }

                    {comments?.length === 0 &&
                        <Text style={{ color: 'white' }}>sin comentarios...</Text>
                    }
                </View>
            </ScrollView>
        </>
    )
}

export default DashboardComment

const styles = StyleSheet.create({})