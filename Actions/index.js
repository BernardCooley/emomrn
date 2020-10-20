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