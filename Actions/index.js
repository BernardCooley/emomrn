export const currentScreen = screenName => {
    return {
        type: 'CURRENT_SCREEN',
        payload: screenName
    };
};