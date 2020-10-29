import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, IconButton, Modal, Portal, Provider, Text, TextInput, Button, Snackbar, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { commentsModalVisible } from '../Actions/index';
import modalStyles from '../styles/ModalStyles';
import formStyles from '../styles/FormStyles';


const CommentsModal = () => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const isCommentsModalVisible = useSelector(state => state.commentsModalVisible);
    const [newComment, setNewComment] = useState('');
    const [showCommentBox, setShowCommentBox] = useState(false);
    const currentTrackComments = useSelector(state => state.trackComments);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const postNewComment = () => {
        if (newComment.length > 0) {
            console.log(newComment);
            setShowCommentBox(false);
            setNewComment('');
            setSnackBarMessage('Comment submitted');
        } else {
            setSnackBarMessage('Type a comment to submit');
        }
    }

    const cancelComment = () => {
        setShowCommentBox(false);
        setNewComment('');
    }

    return (
        <Provider>
            <Portal>
                <Modal visible={isCommentsModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainerStyles}>
                    <View style={{ ...styles.queueContainer, ...styles.sectionContainer }}>
                        <Title>Comments</Title>
                        {currentTrackComments ? currentTrackComments.map((comment, index) => (
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
                    <View style={styles.newCommentContainer}>
                        {!showCommentBox &&
                            <Button color={colors.primary} mode='text' onPress={() => setShowCommentBox(true)}>Add comment</Button>
                        }
                        {showCommentBox &&
                            <>
                                <TextInput
                                    theme={{colors: {primary: colors.primary}}}
                                    right={() =>
                                        <IconButton animated icon="dots-vertical" size={10} onPress={e => openMenu(e, track.track)} />
                                    }
                                    color={colors.primary}
                                    style={styles.input}
                                    label="Comment"
                                    value={newComment}
                                    onChangeText={comment => setNewComment(comment)}
                                    multiline
                                />
                                <View style={styles.buttonContainer}>
                                    <Button color={colors.primary} mode='contained' onPress={() => postNewComment()}>Submit</Button>
                                    <Button color={colors.primary} mode='contained' onPress={cancelComment}>Cancel</Button>
                                </View>
                            </>
                        }
                    </View>
                    <IconButton style={styles.closeIcon} animated icon="close" size={20} onPress={() => dispatch(commentsModalVisible(false))} />
                    <Snackbar
                        visible={snackBarMessage.length > 0}
                        onDismiss={() => setSnackBarMessage('')}
                        duration={2000}>
                        {snackBarMessage}
                    </Snackbar>
                </Modal>
            </Portal>
        </Provider>
    )
}

const styles = StyleSheet.create({
    ...formStyles,
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
        },
        newCommentContainer: {
            width: '100%',
            position: 'absolute',
            bottom: 10
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        }
    }
});

export default CommentsModal;