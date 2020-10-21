export const currentScreen = screenName => {
    return {
        type: 'CURRENT_SCREEN',
        payload: screenName
    };
};

export const user = user => {
    return {
        type: 'USER',
        payload: user
    };
};

export const tracks = tracks => {
    return {
        type: 'TRACKS',
        payload: tracks
    };
};

export const artistProfileId = id => {
    return {
        type: 'ARTIST_PROFILE_ID',
        payload: id
    };
};