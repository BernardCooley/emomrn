const musicReducers = {
    tracks: (state = [], action) => {
        switch (action.type) {
            case 'TRACKS':
                return state = action.payload;
            default:
                return state;
        }
    }
}

export default musicReducers;