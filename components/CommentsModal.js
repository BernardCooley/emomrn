import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, IconButton, Modal, Portal, Provider, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { commentsModalVisible } from '../Actions/index';
import modalStyles from '../styles/ModalStyles';


const CommentsModal = ({ comments }) => {
    const dispatch = useDispatch();
    const isCommentsModalVisible = useSelector(state => state.commentsModalVisible);

    return (
        <Provider>
            <Portal>
                <Modal visible={isCommentsModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainerStyles}>
                    <View style={{ ...styles.queueContainer, ...styles.sectionContainer }}>
                        <Title>Comments</Title>
                        {comments ? comments.map((comment, index) => (
                            <View style={styles.commentContainer} key={index}>
                                <Text style={styles.commentUser}>{comment.artistName}</Text>
                                <Text style={styles.commentText}>{comment.comment}</Text>
                                {comment.replies ? comment.replies.map((reply, index) => (
                                    <View style={styles.replyContainer} key={index}>
                                        <Text style={styles.commentUser}>{reply.artistName}</Text>
                                        <Text style={styles.commentText}>{reply.comment}</Text>
                                    </View>
                                )) : null

                                }
                            </View>
                        )) : <Text>No comments</Text>
                        }
                    </View>
                    <IconButton style={styles.closeIcon} animated icon="close" size={20} onPress={() => dispatch(commentsModalVisible(false))} />
                </Modal>
            </Portal>
        </Provider>
    )
}

const styles = StyleSheet.create({
    ...modalStyles, ...{
        commentContainer: {
            paddingVertical: 5,
            marginBottom: 10
        },
        commentUser: {
            fontSize: 20
        },
        commentText: {
            fontSize: 16
        },
        replyContainer: {
            marginLeft: 20,
            marginTop: 5
        }
    }
});

export default CommentsModal;