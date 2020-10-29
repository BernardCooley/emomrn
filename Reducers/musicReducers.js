const musicReducers = {
    tracks: (state = [], action) => {
        switch (action.type) {
            case 'TRACKS':
                return state = action.payload;
            default:
                return state;
        }
    },
    artists: (state = [], action) => {
        switch (action.type) {
            case 'ARTISTS':
                return state = action.payload;
            default:
                return state;
        }
    },
    queueModalVisible: (state = false, action) => {
        switch (action.type) {
            case 'QUEUE_MODAL_VISIBLE':
                return state = action.payload;
            default:
                return state;
        }
    },
    commentsModalVisible: (state = false, action) => {
        switch (action.type) {
            case 'COMMENTS_MODAL_VISIBLE':
                return state = action.payload;
            default:
                return state;
        }
    },
    trackComments: (state = [], action) => {
        switch (action.type) {
            case 'TRACK_COMMENTS':
                return state = action.payload;
            default:
                return state;
        }
    }
}

export default musicReducers;