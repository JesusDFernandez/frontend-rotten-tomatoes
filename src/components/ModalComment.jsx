import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import ModalPoup from './ModalPoup'
import { useComments } from '../context/commentsContext';


const ModalComment = ({ movieId, parentId, type, visible, setVisible, parent = false }) => {

    const [comment, setComment] = useState("");

    const [star, setStar] = useState(0);

    const { createComment } = useComments();

    const handleComment = async () => {
        setVisible(false);
        await createComment({
            movieId,
            parentId,
            pointStar: star,
            text: comment,
        })
    }




    return (
        <>

            <ModalPoup visible={visible}>

                <ScrollView >

                    <View style={{ alignItems: 'center' }}>

                        <View style={{ width: '100%', height: 40, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text style={{ width: 40, textAlign: "center", fontSize: 30 }}>x</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 20, fontWeight: "bold", textTransform: "uppercase" }}>COMENTARIO</Text>

                        <View style={{ width: "100%", borderBottomColor: "black", borderBottomWidth: 1, marginTop: 10 }}></View>

                        <View style={{ marginVertical: 40 }}>

                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical="top"
                                style={styles.inputText}
                                placeholder="Comenta..."
                                placeholderTextColor="#003f5c"
                                onChangeText={text => setComment(text)}
                            />

                            {parent &&
                                <Rating
                                    type='star'
                                    ratingCount={5}
                                    imageSize={40}
                                    showRating
                                    startingValue={0}
                                    onFinishRating={(star) => setStar(star)}
                                />
                            }

                            <TouchableOpacity
                                onPress={handleComment}
                                style={styles.commentBtn}>
                                <EvilIcons name="comment" size={40} color="white" />

                                <Text style={styles.commentText}>Comentar</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
            </ModalPoup >
        </>
    )
}

export default ModalComment

const styles = StyleSheet.create({
    inputText: {
        height: 200,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(103, 114, 148, 0.16)',
        padding: 10,
        color: "#677294",
        fontSize: 16,
        width: 240,
        fontWeight: "300",
        letterSpacing: -0.3,
    },
    commentBtn: {
        backgroundColor: "#fa310ab5",
        borderRadius: 12,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        flexDirection: "row"
    },
    commentText: {
        color: "white",
        fontSize: 18,
    },
})