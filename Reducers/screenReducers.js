const screenReducers = {
    currentScreen: (state = '', action) => {
        switch (action.type) {
            case 'CURRENT_SCREEN':
                return state = action.payload;
            default:
                return state;
        }
    }
}

export default screenReducers;